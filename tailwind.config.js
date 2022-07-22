/* eslint-env node */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    spacing: {
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
    },
    extend: {
      boxShadow: {
        "inner-sm": "inset 0 2px 4px 0 rgb(0 0 0 / 0.05)",
        "inner-md": "inset 0 3px 3px 2px rgb(0 0 0 / 0.05)",
        "inner-lg": "inset 0 4px 4px 4px rgb(0 0 0 / 0.05)",
      },
    },
  },
  plugins: [],
};
