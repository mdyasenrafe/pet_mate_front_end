export const formatRelativeTime = (date: string | Date): string => {
  const now = new Date();
  const past = new Date(date);
  const secondsDiff = Math.floor((now.getTime() - past.getTime()) / 1000);

  const minute = 60;
  const hour = minute * 60;
  const day = hour * 24;
  const month = day * 30;
  const year = day * 365;

  if (secondsDiff < minute) {
    return secondsDiff === 1 ? "1 second ago" : `${secondsDiff} seconds ago`;
  } else if (secondsDiff < hour) {
    const minutesDiff = Math.floor(secondsDiff / minute);
    return minutesDiff === 1 ? "1 minute ago" : `${minutesDiff} minutes ago`;
  } else if (secondsDiff < day) {
    const hoursDiff = Math.floor(secondsDiff / hour);
    return hoursDiff === 1 ? "1 hour ago" : `${hoursDiff} hours ago`;
  } else if (secondsDiff < month) {
    const daysDiff = Math.floor(secondsDiff / day);
    return daysDiff === 1 ? "1 day ago" : `${daysDiff} days ago`;
  } else if (secondsDiff < year) {
    const monthsDiff = Math.floor(secondsDiff / month);
    return monthsDiff === 1 ? "1 month ago" : `${monthsDiff} months ago`;
  } else {
    const yearsDiff = Math.floor(secondsDiff / year);
    return yearsDiff === 1 ? "1 year ago" : `${yearsDiff} years ago`;
  }
};
