import categoryConfig from "../../utils/utilConsts";
import { Flame } from "lucide-react";
import { format, formatISO } from "date-fns";

const today = formatISO(new Date(), {
  representation: "date",
});

function HabitCard({ habit, weekDays }) {
  const CurrentCategory = categoryConfig[habit.category];
  return (
    <div
      className={`border-t-4 flex flex-col gap-2 p-2 border-r-4 hover:brightness-85 duration-200 shadow-xl rounded ${CurrentCategory.styles}`}
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
          <p className="font-bold">1</p>
        </div>
      </div>
      <div className="grid grid-cols-7 w-full">
        {weekDays.map((day) => {
            const isToday = today === day.date
          return (
            <div key={day.label} className={`flex flex-col gap-1 items-center`}>
              <p className="">{day.label}</p>
              <div className={`w-7 h-7 border border-slate-700 rounded-full ${isToday && 'border-2 bg-slate-400'}`}></div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default HabitCard;
