export const formatTime = (time: Date): string => {
  const year = time.getFullYear().toString().padStart(4, "0");
  const month = (time.getMonth() + 1).toString().padStart(2, "0");
  const day = time.getDate().toString().padStart(2, "0");
  const hour = time.getHours().toString().padStart(2, "0");
  const minute = time.getMinutes().toString().padStart(2, "0");

  return `${year}/${month}/${day}/${hour}/${minute}`;
};
