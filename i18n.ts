// i18n.ts

import { createI18n } from "vue-i18n";

const messages = {
  es: {
    "world-selection": {
      "select-button": "Seleccionar",
      "infopanel-dimension": "Dimensión",
      "infopanel-recursos": "Recursos",
      "infopanel-habitabilidad": "Habitabilidad",
    },
    "general-buttons": {
      confirmation: "Confirmar",
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
