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
        "sm-lightest": "0 1px 3px 0 rgb(0 0 0 / 0.05)",
        "sm-lighter": "0 1px 3px 0 rgb(0 0 0 / 0.2)",
        "sm-light": "0 1px 3px 0 rgb(0 0 0 / 0.35)",
        sm: "0 1px 3px 0 rgb(0 0 0 / 0.5)",
        "sm-dark": "0 1px 3px 0 rgb(0 0 0 / 0.65)",
        "sm-darker": "0 1px 3px 0 rgb(0 0 0 / 0.8)",
        "sm-darkest": "0 1px 3px 0 rgb(0 0 0 / 0.95)",

        "md-lightest":
          "0 4px 6px -1px rgb(0 0 0 / 0.05), 0 2px 4px -2px rgb(0 0 0 / 0.05)",
        "md-lighter":
          "0 4px 6px -1px rgb(0 0 0 / 0.2), 0 2px 4px -2px rgb(0 0 0 / 0.2)",
        "md-light":
          "0 4px 6px -1px rgb(0 0 0 / 0.35), 0 2px 4px -2px rgb(0 0 0 / 0.35)",
        md: "0 4px 6px -1px rgb(0 0 0 / 0.5), 0 2px 4px -2px rgb(0 0 0 / 0.5)",
        "md-dark":
          "0 4px 6px -1px rgb(0 0 0 / 0.65), 0 2px 4px -2px rgb(0 0 0 / 0.65)",
        "md-darker":
          "0 4px 6px -1px rgb(0 0 0 / 0.8), 0 2px 4px -2px rgb(0 0 0 / 0.8)",
        "md-darkest":
          "0 4px 6px -1px rgb(0 0 0 / 0.95), 0 2px 4px -2px rgb(0 0 0 / 0.95)",

        "lg-lightest":
          "0 10px 15px -3px rgb(0 0 0 / 0.05), 0 4px 6px -4px rgb(0 0 0 / 0.05)",
        "lg-lighter":
          "0 10px 15px -3px rgb(0 0 0 / 0.2), 0 4px 6px -4px rgb(0 0 0 / 0.2)",
        "lg-light":
          "0 10px 15px -3px rgb(0 0 0 / 0.35), 0 4px 6px -4px rgb(0 0 0 / 0.35)",
        lg: "0 10px 15px -3px rgb(0 0 0 / 0.5), 0 4px 6px -4px rgb(0 0 0 / 0.5)",
        "lg-dark":
          "0 10px 15px -3px rgb(0 0 0 / 0.65), 0 4px 6px -4px rgb(0 0 0 / 0.65)",
        "lg-darker":
          "0 10px 15px -3px rgb(0 0 0 / 0.8), 0 4px 6px -4px rgb(0 0 0 / 0.8)",
        "lg-darkest":
          "0 10px 15px -3px rgb(0 0 0 / 0.95), 0 4px 6px -4px rgb(0 0 0 / 0.95)",

        "xl-lightest":
          "0 20px 25px -5px rgb(0 0 0 / 0.05), 0 8px 10px -6px rgb(0 0 0 / 0.05)",
        "xl-lighter":
          "0 20px 25px -5px rgb(0 0 0 / 0.2), 0 8px 10px -6px rgb(0 0 0 / 0.2)",
        "xl-light":
          "0 20px 25px -5px rgb(0 0 0 / 0.35), 0 8px 10px -6px rgb(0 0 0 / 0.35)",
        xl: "0 20px 25px -5px rgb(0 0 0 / 0.5), 0 8px 10px -6px rgb(0 0 0 / 0.5)",
        "xl-dark":
          "0 20px 25px -5px rgb(0 0 0 / 0.65), 0 8px 10px -6px rgb(0 0 0 / 0.65)",
        "xl-darker":
          "0 20px 25px -5px rgb(0 0 0 / 0.8), 0 8px 10px -6px rgb(0 0 0 / 0.8)",
        "xl-darkest":
          "0 20px 25px -5px rgb(0 0 0 / 0.95), 0 8px 10px -6px rgb(0 0 0 / 0.95)",

        "inner-sm-lightest": "inset 0 2px 4px 0 rgb(0 0 0 / 0.05)",
        "inner-sm-lighter": "inset 0 2px 4px 0 rgb(0 0 0 / 0.2)",
        "inner-sm-light": "inset 0 2px 4px 0 rgb(0 0 0 / 0.35)",
        "inner-sm": "inset 0 2px 4px 0 rgb(0 0 0 / 0.5)",
        "inner-sm-dark": "inset 0 2px 4px 0 rgb(0 0 0 / 0.65)",
        "inner-sm-darker": "inset 0 2px 4px 0 rgb(0 0 0 / 0.8)",
        "inner-sm-darkest": "inset 0 2px 4px 0 rgb(0 0 0 / 0.95)",

        "inner-md-lightest": "inset 0 3px 3px 2px rgb(0 0 0 / 0.05)",
        "inner-md-lighter": "inset 0 3px 3px 2px rgb(0 0 0 / 0.2)",
        "inner-md-light": "inset 0 3px 3px 2px rgb(0 0 0 / 0.35)",
        "inner-md": "inset 0 3px 3px 2px rgb(0 0 0 / 0.5)",
        "inner-md-dark": "inset 0 3px 3px 2px rgb(0 0 0 / 0.65)",
        "inner-md-darker": "inset 0 3px 3px 2px rgb(0 0 0 / 0.8)",
        "inner-md-darkest": "inset 0 3px 3px 2px rgb(0 0 0 / 0.95)",

        "inner-lg-lightest": "inset 0 4px 4px 4px rgb(0 0 0 / 0.05)",
        "inner-lg-lighter": "inset 0 4px 4px 4px rgb(0 0 0 / 0.2)",
        "inner-lg-light": "inset 0 4px 4px 4px rgb(0 0 0 / 0.35)",
        "inner-lg": "inset 0 4px 4px 4px rgb(0 0 0 / 0.5)",
        "inner-lg-dark": "inset 0 4px 4px 4px rgb(0 0 0 / 0.65)",
        "inner-lg-darker": "inset 0 4px 4px 4px rgb(0 0 0 / 0.8)",
        "inner-lg-darkest": "inset 0 4px 4px 4px rgb(0 0 0 / 0.95)",
      },
    },
  },
  plugins: [],
};
