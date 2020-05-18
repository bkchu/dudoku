import Typography from "typography"
const typography = new Typography({
  baseFontSize: "16px",
  baseLineHeight: 1.666,
  headerFontFamily: [
    "Avenir Next",
    "Helvetica Neue",
    "Segoe UI",
    "Helvetica",
    "Arial",
    "sans-serif",
  ],
  bodyFontFamily: ["Quicksand", "sans-serif"],
  googleFonts: [
    {
      name: "Quicksand",
      styles: ["400", "400i", "700", "700i"],
    },
  ],
})

export default typography
