export default {
  plugins: {
    "postcss-import": {},
    tailwindcss: {},
    "postcss-nesting": {},
    autoprefixer: {},
    "postcss-preset-env": {
      features: { "nesting-rules": true },
    },
  },
};
