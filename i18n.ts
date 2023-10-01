// i18n.ts

import { createI18n } from "vue-i18n";

const messages = {
  es: {
    "player-actions": {
      double: "Doblar",
      draw: "Robar",
      pass: "Pasar",
      "start-game": "Start",
    },
  },
};

const i18n = createI18n({
  legacy: false,
  locale: "es", // Idioma predeterminado
  fallbackLocale: "es",
  messages,
});

export default i18n;
