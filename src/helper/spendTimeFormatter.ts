export const spendTimeFormatter: (milliseconds: number) => string = (
  milliseconds
) => {
  const hour = 60 * 60 * 1000;
  const minute = 60 * 1000;
  const second = 1000;

  const hours = Math.floor(milliseconds / hour);
  const minutes = Math.floor((milliseconds % hour) / minute);
  const seconds = Math.floor(((milliseconds % hour) % minute) / second);

  const hoursText = hours ? hours + "小時" : "";
  const minutesText = minutes ? Math.floor(minutes) + "分鐘" : "";
  const secondsText = hours || minutes ? "" : Math.floor(seconds) + "秒";

  return hoursText + minutesText + secondsText;
};
