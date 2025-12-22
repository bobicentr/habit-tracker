import {
  endOfWeek,
  startOfWeek,
  eachDayOfInterval,
  formatISO,
  format,
} from "date-fns";
import { ru } from "date-fns/locale";

const sevenDays = () => {
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

export default sevenDays;
