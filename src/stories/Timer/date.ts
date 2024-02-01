export const getShortFormattedTimeString = (timeMs: number) => {
  const time = Math.floor(timeMs / 1000);
  const minutes = Math.floor(time / 60);
  const seconds = ("0" + (time % 60)).slice(-2);

  if (time <= 0) return `0:00`;
  return `${minutes}:${seconds}`;
};
