/* eslint-env node */
const spacingLevel = {
  0: "0px",
  1: "4px",
  2: "8px",
  3: "12px",
  4: "16px",
  5: "20px",
  6: "24px",
  7: "28px",
  8: "32px",
  9: "36px",
  10: "40px",
  11: "44px",
  12: "48px",
  13: "52px",
  14: "56px",
  15: "60px",
};

const screenWidthLevel = {
  "screen-25": "25vw",
  "screen-50": "50vw",
  "screen-75": "75vw",
};

const screenHeightLevel = {
  "screen-25": "25vh",
  "screen-50": "50vh",
  "screen-75": "75vh",
};

module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    screens: {
      xs: "320px",
      sm: "480px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    spacing: spacingLevel,
    extend: {
      width: {
        ...spacingLevel,
        ...screenWidthLevel,
      },
      minWidth: {
        ...spacingLevel,
        ...screenWidthLevel,
      },
      maxWidth: {
        ...spacingLevel,
        ...screenWidthLevel,
      },
      height: {
        ...spacingLevel,
        ...screenHeightLevel,
      },
      minHeight: {
        ...spacingLevel,
        ...screenHeightLevel,
      },
      maxHeight: {
        ...spacingLevel,
        ...screenHeightLevel,
      },
      zIndex: {
        1: "1",
        "global-1": "1010",
        "global-2": "1020",
        "global-3": "1030",
        "global-4": "1040",
        "global-5": "1050",
      },
      colors: {
        primary: {
          DEFAULT: "#3f2883",
          100: "#c3b7e8",
          200: "#a491dd",
          300: "#866cd1",
          400: "#6746c6",
          500: "#5133a8",
          600: "#3f2883",
          700: "#2c1c5b",
          800: "#1b1138",
          900: "#090512",
        },
        lightest: "rgb(0 0 0 / 0.05)",
        lighter: "rgb(0 0 0 / 0.2)",
        light: "rgb(0 0 0 / 0.35)",
        dark: "rgb(0 0 0 / 0.65)",
        darker: "rgb(0 0 0 / 0.8)",
        darkest: "rgb(0 0 0 / 0.95)",
      },
      borderWidth: {
        12: "12px",
        16: "16px",
        20: "20px",
        24: "24px",
      },
      boxShadow: {
        sm: "0 1px 3px 0 rgb(0 0 0 / 0.5)",
        md: "0 4px 6px -1px rgb(0 0 0 / 0.5), 0 2px 4px -2px rgb(0 0 0 / 0.5)",
        lg: "0 10px 15px -3px rgb(0 0 0 / 0.5), 0 4px 6px -4px rgb(0 0 0 / 0.5)",
        xl: "0 20px 25px -5px rgb(0 0 0 / 0.5), 0 8px 10px -6px rgb(0 0 0 / 0.5)",

        "t-sm": "0 -1px 3px 0 rgb(0 0 0 / 0.5)",
        "t-md":
          "0 -4px 6px -1px rgb(0 0 0 / 0.5), 0 -2px 4px -2px rgb(0 0 0 / 0.5)",
        "t-lg":
          "0 -10px 15px -3px rgb(0 0 0 / 0.5), 0 -4px 6px -4px rgb(0 0 0 / 0.5)",
        "t-xl":
          "0 -20px 25px -5px rgb(0 0 0 / 0.5), 0 -8px 10px -6px rgb(0 0 0 / 0.5)",

        "inner-sm": "inset 0 1px 3px 0 rgb(0 0 0 / 0.5)",
        "inner-md":
          "inset 0 4px 6px -1px rgb(0 0 0 / 0.5), inset 0 2px 4px -2px rgb(0 0 0 / 0.5)",
        "inner-lg":
          "inset 0 10px 15px -3px rgb(0 0 0 / 0.5), inset 0 4px 6px -4px rgb(0 0 0 / 0.5)",
      },
    },
  },
  plugins: [],
};
