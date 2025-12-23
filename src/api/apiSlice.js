import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "apiSlice",
  baseQuery: fakeBaseQuery(),
  tagTypes: ["Habits", "Logs"],
  endpoints: (build) => ({
    getHabits: build.query({
      queryFn: async () => {
        const rawData = localStorage.getItem("habits");
        if (!rawData) return { data: [] };
        try {
          const parsedData = JSON.parse(rawData);
          return { data: parsedData };
        } catch (e) {
          return { error: e };
        }
      },
      providesTags: ["Habits"],
    }),
    addHabit: build.mutation({
      queryFn: async (habit) => {
        try {
          console.log('Начало')
          const rawData = localStorage.getItem("habits");
          const parsedData = JSON.parse(rawData || "[]");
          parsedData.push(habit);
          localStorage.setItem("habits", JSON.stringify(parsedData));
          return { data: habit }; 
        } catch (e) {
          return { error: e.message }; 
        }
      },
      invalidatesTags: ["Habits"],
    }),
    deleteHabit: build.mutation({
      queryFn: async (habit) => {
        const rawHabitData = localStorage.getItem("habits");
        const rawLogData = localStorage.getItem("logs");
        let parsedHabitData;
        let parsedLogData;
        !rawHabitData
          ? (parsedHabitData = [])
          : (parsedHabitData = JSON.parse(rawHabitData));
        parsedHabitData = parsedHabitData.filter(
          (item) => item.id !== habit.id
        );
        !rawLogData
          ? (parsedLogData = [])
          : (parsedLogData = JSON.parse(rawLogData));
        parsedLogData = parsedLogData.filter(
          (item) => item.habitId !== habit.id
        );
        localStorage.setItem("habits", JSON.stringify(parsedHabitData));
        localStorage.setItem("logs", JSON.stringify(parsedLogData));
        return { data: parsedHabitData };
      },
      invalidatesTags: ["Habits", "Logs"],
    }),
    getLogs: build.query({
      queryFn: async () => {
        const rawData = localStorage.getItem("logs");
        if (!rawData) return { data: [] };
        try {
          const parsedData = JSON.parse(rawData);
          return { data: parsedData };
        } catch (e) {
          return { error: e };
        }
      },
      providesTags: ["Logs"],
    }),
    toggleLog: build.mutation({
      queryFn: async (log) => {
        const rawData = localStorage.getItem("logs");
        let parsedData;
        !rawData ? (parsedData = []) : (parsedData = JSON.parse(rawData));
        const exists = parsedData.some(
          (item) => item.habitId === log.habitId && item.date === log.date
        );
        if (exists) {
          parsedData = parsedData.filter(
            (item) => !(item.habitId === log.habitId && item.date === log.date)
          );
          localStorage.setItem("logs", JSON.stringify(parsedData));
          return { data: parsedData };
        } else {
          const newLog = { ...log, id: Date.now() };
          parsedData.push(newLog);
          localStorage.setItem("logs", JSON.stringify(parsedData));
          return { data: newLog };
        }
      },
      invalidatesTags: ["Logs"],
    }),
  }),
});

export const {
  useGetHabitsQuery,
  useAddHabitMutation,
  useGetLogsQuery,
  useToggleLogMutation,
  useDeleteHabitMutation
} = apiSlice;
