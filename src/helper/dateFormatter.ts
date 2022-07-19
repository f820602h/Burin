enum DateFormatterOptionsEnum {
  "numeric",
  "2-digit",
}

export type DateFormatterOptions = {
  timeZone?: string;
  year?: keyof typeof DateFormatterOptionsEnum;
  month?: keyof typeof DateFormatterOptionsEnum;
  day?: keyof typeof DateFormatterOptionsEnum;
  hour12?: boolean;
  hour?: keyof typeof DateFormatterOptionsEnum;
  minute?: keyof typeof DateFormatterOptionsEnum;
  second?: keyof typeof DateFormatterOptionsEnum;
};

export const dateFormatter: (
  timeStamp: number,
  mixinOptions?: DateFormatterOptions
) => string = (timeStamp, mixinOptions = {}) => {
  const defaultOptions = {
    timeZone: "Asia/Taipei",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour12: true,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  } as DateFormatterOptions;

  return new Date(timeStamp).toLocaleString("zh-hant", {
    ...defaultOptions,
    ...mixinOptions,
  });
};
