


export const timeStringToMilliseconds = (timeString: string): number => {
  const [hours, minutes] = timeString.split(":").map(Number);
  return (hours * 60 + minutes) * 60 * 1000;
}