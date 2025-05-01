module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}", // Adjust paths to match your project structure
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        dark_primary: "#001429",
        dark_secondary: "#363C49",
        light_primary: "#F2F7F2",
        light_secondary: "#B8B8B8",
        dark_gray_custom: "#8E97A4",
        light_gray_custom: "#525A66",
        dark_highlight: "#F2F230",
        light_highlight: "#3185FC",
      },
      fontFamily: {
        Rubik: ["Rubik", "sans-serif"],
      },
    },
  },
  plugins: [],
};
