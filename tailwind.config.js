import fluid, { screens, fontSize } from "fluid-tailwind";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens,
    fontSize,
    extend: {
      screens: {
        xs: "20rem",
      },
    },
  },
  plugins: [fluid],
};
