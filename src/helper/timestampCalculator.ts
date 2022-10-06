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
  date.setHours(0);
  date.setMinutes(0);
  date.setSeconds(0);
  date.setMilliseconds(0);
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
  d.setDate(d.getDate() - 1);
  return d.getTime();
}

function getTomorrowTimestamp(): TimeStamp {
  const d = setDateToMidnight(new Date());
  d.setDate(d.getDate() + 1);
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
  if (arg[0] === "now") return getNowTimestamp();
  else if (arg[0] === "today") return getTodayTimestamp();
  else if (arg[0] === "yesterday") return getYesterdayTimestamp();
  else if (arg[0] === "tomorrow") return getTomorrowTimestamp();
  else return getSpecificTimestamp(arg[0]);
};
