


const timeStringToMilliseconds = (timeString) => {
  const [hours, minutes] = timeString.split(":").map(Number);
  return (hours * 60 + minutes) * 60 * 1000;
}


module.exports = { timeStringToMilliseconds };