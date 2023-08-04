enum DayFullName {
  Monday,
  Tuesday,
  Wednesday,
  Thursday,
  Friday,
  Saturday,
  Sunday,
}

enum DayShortName {
  Mon,
  Tue,
  Wed,
  Thu,
  Fri,
  Sat,
  Sun,
}

export const dayNameGetter: (
  day: number,
  option?: { mode: "full" | "short" }
) => string = (month, option = { mode: "full" }) => {
  if (option?.mode === "full") return DayFullName[month];
  else if (option?.mode === "short") return DayShortName[month];
  else return "";
};
