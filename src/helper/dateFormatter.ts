type DateFormatterOptionsValue = "numeric" | "2-digit" | undefined;

type DateFormatterOptions = {
  timeZone: string;
  year: DateFormatterOptionsValue;
  month: DateFormatterOptionsValue;
  day: DateFormatterOptionsValue;
  hour12: boolean;
  hour: DateFormatterOptionsValue;
  minute: DateFormatterOptionsValue;
  second: DateFormatterOptionsValue;
};

export function dateFormatter(
  timeStamp: number,
  mixinOptions: Partial<DateFormatterOptions> = {}
): string {
  const defaultOptions: DateFormatterOptions = {
    timeZone: "Asia/Taipei",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour12: true,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  };

  return new Date(timeStamp).toLocaleString("zh-hant", {
    ...defaultOptions,
    ...mixinOptions,
  });
}
