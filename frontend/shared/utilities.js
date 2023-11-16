function addMinutesAndSeconds(timeString, minutesToAdd, secondsToAdd) {
  const dateTime = new Date(timeString);
  dateTime.setMinutes(dateTime.getMinutes() + minutesToAdd);
  dateTime.setSeconds(dateTime.getSeconds() + secondsToAdd);

  const updatedTimeString = dateTime.toISOString();

  return updatedTimeString;
}

function convertUTCToIST(utcTimeString) {
  const utcDate = new Date(utcTimeString);
  const istOptions = { timeZone: "Asia/Kolkata" };
  const istTimeString = utcDate.toLocaleString("en-US", istOptions);
  return istTimeString;
}
module.exports = { addMinutesAndSeconds, convertUTCToIST };
