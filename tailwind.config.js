module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  purge: false,
  theme: {
    extend: {
      fontSize: {
        xxl: "6.75rem",
      },
      colors: {
        primary: {
          main: "var(--color-primary-main)",
        },
        neutral: {
          "100": "var(--color-neutral-100)",
          "300": "var(--color-neutral-300)",
          "900": "var(--color-neutral-900)",
        },
      },
      spacing: {
        side: "var(--side)",
      },
    },
  },
  variants: {},
  plugins: [],
}
