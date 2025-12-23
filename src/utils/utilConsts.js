import { BookMarked, Calendar, CircleDollarSign, Cross } from "lucide-react";

const categoryConfig = {
  health: {
    label: "Здоровье",
    styles: "border-red-600",
    icon: Cross,
    iconColor: "text-red-600 fill-current",
    dayFill: "bg-red-400",
  },
  finances: {
    label: "Финансы",
    styles: "border-green-600",
    icon: CircleDollarSign,
    iconColor: "text-green-900 fill-green-600",
    dayFill: "bg-green-400",
  },
  study: {
    label: "Учёба",
    styles: "border-blue-700",
    icon: BookMarked,
    iconColor: "text-blue-900 fill-blue-600",
    dayFill: "bg-blue-400",
  },
  general: {
    label: "Повседневность",
    styles: "border-amber-600",
    icon: Calendar,
    iconColor: "text-amber-600",
    dayFill: "bg-amber-400",
  },
};

export default categoryConfig