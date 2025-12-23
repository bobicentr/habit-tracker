import {
  endOfWeek,
  startOfWeek,
  eachDayOfInterval,
  formatISO,
  format,
  isSameWeek,
  subDays,
} from "date-fns";
import { ru } from "date-fns/locale";

export const sevenDays = () => {
  const firstDay = startOfWeek(Date.now(), { weekStartsOn: 1 });
  const lastDay = endOfWeek(Date.now(), { weekStartsOn: 1 });
  const weekArray = eachDayOfInterval({
    start: firstDay,
    end: lastDay,
  });
  const mappedWeek = weekArray.map((item) => ({
    date: formatISO(item, {
      representation: "date",
    }),
    label: format(item, "eeeeee", { locale: ru }).toUpperCase(),
  }));
  return mappedWeek;
};

export const checkLimit = (logs, habit_id, goal) => {
  const habitLogs = logs.filter(
    (log) =>
      log.habitId === habit_id &&
      isSameWeek(new Date(), new Date(log.date), { weekStartsOn: 1 })
  );
  if (habitLogs.length >= goal) {
    return true;
  } else {
    return false;
  }
};

export const currentCount = (logs, habit_id) => {
  const habitLogs = logs.filter(
    (log) =>
      log.habitId === habit_id &&
      isSameWeek(new Date(), new Date(log.date), { weekStartsOn: 1 })
  );
  return habitLogs.length;
};

export const calculateStreak = (logs, habit) => {
  let count = 0;
  const filteredLogs = logs.filter((log) => log.habitId === habit.id);
  const loggedDates = new Set(filteredLogs.map((l) => l.date));
  let checkDate = new Date()
  let todayStr = formatISO(checkDate, { representation: "date" });
  if (!loggedDates.has(todayStr)) {
    let yesterdayStr = formatISO(subDays(checkDate, 1), { representation: "date" })
    if (!loggedDates.has(yesterdayStr)) {
      return count
    } else {
      checkDate = subDays(checkDate, 1)
    }
  }
  while (loggedDates.has(formatISO(checkDate, { representation: "date" }))) {
    count++;
    checkDate = subDays(checkDate, 1)
  }
  return count;
};
