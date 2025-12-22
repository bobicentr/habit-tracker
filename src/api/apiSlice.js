import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "apiSlice",
  baseQuery: fakeBaseQuery(),
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
        const rawData = localStorage.getItem("habits");
        let parsedData;
        !rawData ? (parsedData = []) : (parsedData = JSON.parse(rawData));
        const newHabit = {...habit, id: Date.now()}
        parsedData.push(newHabit);
        localStorage.setItem("habits", JSON.stringify(parsedData));
        return { data: newHabit };
      },
      invalidatesTags: ["Habits"],
    }),
  }),
});

export const { useGetHabitsQuery, useAddHabitMutation } = apiSlice;;
