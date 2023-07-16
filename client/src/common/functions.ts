export const capitalizeFirst = (str: string) =>
  str
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

const formatDate = (date: Date) => {
  const day = date.getDate().toString().padStart(2, "0");
  const month = getMonthAsString(date.getMonth() + 1);
  const year = date.getFullYear().toString().slice(-2);

  return `${day} ${month} ${year}`;
};

export const formatRelativeTime = (date: Date) => {
  const now = new Date();
  const diff = now.getTime() - date.getTime();

  if (diff < 24 * 60 * 60 * 1000) {
    const hours = Math.floor(diff / (60 * 60 * 1000));
    if (hours === 0) {
      const minutes = Math.floor(diff / (60 * 1000));
      return `${minutes} minute${minutes === 1 ? "" : "s"} ago`;
    }
    return `${hours} hour${hours === 1 ? "" : "s"} ago`;
  }

  return formatDate(date);
};

const getMonthAsString = (month: number): string => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return months[month - 1];
};
