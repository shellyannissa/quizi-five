const jwt = require("jsonwebtoken");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

const addMinutesAndSeconds = (timeString, minutesToAdd, secondsToAdd) => {
  const dateTime = new Date(timeString);

  dateTime.setMinutes(dateTime.getMinutes() + minutesToAdd);
  dateTime.setSeconds(dateTime.getSeconds() + secondsToAdd);

  return dateTime;
};

const convertUTCToIST = (utcTimeString) => {
  const utcDate = new Date(utcTimeString);
  const istOptions = { timeZone: "Asia/Kolkata" };
  const istTimeString = utcDate.toLocaleString("en-US", istOptions);
  return istTimeString;
};

module.exports = { generateToken, addMinutesAndSeconds, convertUTCToIST };
