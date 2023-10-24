import { format, isToday, isYesterday, isThisWeek } from "date-fns";

export const formatDate = () => {
  const getDate = (date) => {
    if (isToday(date)) {
      return "Today";
    } else if (isYesterday(date)) {
      return "Yesterday";
    } else if (isThisWeek(date)) {
      return format(date, "eeee");
    } else {
      return format(date, "yyyy-MM-dd");
    }
  };

  return { getDate };
};
