import categoryConfig from "../../utils/utilConsts";
import { Flame } from "lucide-react";
import { format, formatISO } from "date-fns";
import {
  useGetLogsQuery,
  useToggleLogMutation,
  useDeleteHabitMutation,
} from "../../api/apiSlice";
import { checkLimit, currentCount, calculateStreak } from "../../utils/dateHelper";
import { current } from "@reduxjs/toolkit";
import { useEffect, useState } from "react";

const today = formatISO(new Date(), {
  representation: "date",
});

function HabitCard({ habit, weekDays }) {
  const CurrentCategory = categoryConfig[habit.category];
  const { data: getLogs = [], isLoading } = useGetLogsQuery();
  const [triggerToggleLog, { data: addLogData }] = useToggleLogMutation();
  const [triggerDelete, { data: deleteData }] = useDeleteHabitMutation();

  const count = currentCount(getLogs, habit.id);

  let goalText = "";
  if (count < habit.goal) {
    goalText = `Осталось ${habit.goal - count}!`;
  } else if (count === habit.goal) {
    goalText = "Цель достигнута!";
  } else {
    goalText = `На ${count - habit.goal} сверх плана!`;
  }

  const limitExceeded = checkLimit(getLogs, habit.id, habit.goal);

  const toggleCheck = (dateToAdd) => {
    triggerToggleLog({ habitId: habit.id, date: dateToAdd });
  };

  return (
    <div
      className={`border-t-4 flex flex-col gap-2 p-2 border-r-4 duration-200 shadow-xl rounded ${CurrentCategory.styles}`}
    >
      <div className="flex items-center justify-between">
        <div className="flex gap-1">
          <CurrentCategory.icon className={`${CurrentCategory.iconColor}`} />
          <h2 className="font-semibold">
            {habit.title}{" "}
            <span className="text-sm text-slate-600">
              ({CurrentCategory.label})
            </span>
          </h2>
        </div>
        <div className="flex gap-1">
          <Flame className="text-amber-800 fill-amber-400" />
          {/* Пока нет счётчика, логику ещё не делал, с этими интервалами там запара будет сто процентов */}
          <p className="font-bold">{calculateStreak(getLogs, habit)}</p>
        </div>
      </div>
      {/* <p className="text-left">{habit.desc}</p> */}
      <div className="grid grid-cols-7 w-full">
        {weekDays.map((day) => {
          const isToday = today === day.date;
          const checked = getLogs.some(
            (log) => log.date === day.date && log.habitId === habit.id
          );

          const isBlocked = day.date > today;
          return (
            <div key={day.label} className={`flex flex-col gap-1 items-center`}>
              <p className="">{day.label}</p>
              <button
                disabled={day.date > today}
                onClick={() => toggleCheck(day.date)}
                className={`w-7 h-7 border transition-tranform duration-200 rounded-full  ${
                  isToday && "border-2"
                }
                ${checked && CurrentCategory.dayFill} 
                ${
                  isBlocked
                    ? "opacity-50 bg-slate-500 cursor-not-allowed border-slate-600"
                    : `cursor-pointer hover:scale-110 ${CurrentCategory.styles}`
                }
                `}
              ></button>
            </div>
          );
        })}
      </div>
      <div className="flex justify-between items-center">
        <p className="text-xl">{goalText}</p>
        <button
          className="py-1 rounded-lg bg-red-800 border-2 w-5/12 border-red-500 text-white"
          onClick={() => {
            triggerDelete(habit);
          }}
        >
          Удалить
        </button>
      </div>
    </div>
  );
}

export default HabitCard;
