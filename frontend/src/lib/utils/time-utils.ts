// Format current time to 12-hour format without colon (e.g., "330" for 3:30)
export const getFormattedTime = (): string => {
  const now = new Date();
  let hours = now.getHours();
  const minutes = now.getMinutes();

  // Convert to 12-hour format
  hours = hours % 12;
  hours = hours === 0 ? 12 : hours;

  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  return `${hours}${formattedMinutes}`;
};

// Calculate current time value for progress bar (7am-11pm = 0-16 hours)
export const calculateProgressTime = (): number => {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const totalHours = hours + minutes / 60;

  if (totalHours < 7) return 0;
  if (totalHours >= 23) return 16;
  return totalHours - 7;
};
