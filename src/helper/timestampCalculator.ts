type TimeStamp = number;

type SpecificTime = {
  fullYear: number;
  month: number;
  date: number;
  hours: number;
  minutes: number;
  seconds: number;
  milliseconds: number;
};

interface TimestampCalculator {
  (now: "now"): TimeStamp;
  (today: "today"): TimeStamp;
  (yesterday: "yesterday"): TimeStamp;
  (tomorrow: "tomorrow"): TimeStamp;
  (specificTime: Partial<SpecificTime>): TimeStamp;
}

function setDateToMidnight(date: Date): Date {
  date.setUTCHours(0);
  date.setUTCMinutes(0);
  date.setUTCSeconds(0);
  date.setUTCMilliseconds(0);
  return date;
}

function getNowTimestamp(): TimeStamp {
  return new Date().getTime();
}

function getTodayTimestamp(): TimeStamp {
  const d = setDateToMidnight(new Date());
  return d.getTime();
}

function getYesterdayTimestamp(): TimeStamp {
  const d = setDateToMidnight(new Date());
  d.setUTCDate(d.getDate() - 1);
  return d.getTime();
}

function getTomorrowTimestamp(): TimeStamp {
  const d = setDateToMidnight(new Date());
  d.setUTCDate(d.getDate() + 1);
  return d.getTime();
}

function getSpecificTimestamp(specificTime: Partial<SpecificTime>): TimeStamp {
  const { fullYear, month, date, hours, minutes, seconds, milliseconds } =
    specificTime;
  const d = setDateToMidnight(new Date());
  if (fullYear) d.setFullYear(fullYear);
  if (month) d.setMonth(month);
  if (date) d.setDate(date);
  if (hours) d.setHours(hours);
  if (minutes) d.setMinutes(minutes);
  if (seconds) d.setSeconds(seconds);
  if (milliseconds) d.setMilliseconds(milliseconds);
  return d.getTime();
}

export const timestampCalculator: TimestampCalculator = (...arg) => {
  switch (arg[0]) {
    case "now":
      return getNowTimestamp();
    case "today":
      return getTodayTimestamp();
    case "yesterday":
      return getYesterdayTimestamp();
    case "tomorrow":
      return getTomorrowTimestamp();
    default:
      return getSpecificTimestamp(arg[0]);
  }
};
