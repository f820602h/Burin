enum MonthFullName {
  January,
  February,
  March,
  April,
  May,
  June,
  July,
  August,
  September,
  October,
  November,
  December,
}

enum MonthShortName {
  Jan,
  Feb,
  Mar,
  Apr,
  May,
  Jun,
  Jul,
  Aug,
  Sep,
  Oct,
  Nov,
  Dec,
}

export const monthNameGetter: (
  month: number,
  option?: { mode: "full" | "short" }
) => string = (month, option = { mode: "full" }) => {
  if (option?.mode === "full") return MonthFullName[month];
  else if (option?.mode === "short") return MonthShortName[month];
  else return "";
};
