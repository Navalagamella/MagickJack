import "./App.scss";
import "@popperjs/core";
import "bootstrap/dist/js/bootstrap.js";
import "bootstrap/dist/js/bootstrap.min.js";
import "bootstrap/dist/js/bootstrap.bundle.js";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import i18n from "../i18n";

import { createApp } from "vue";
import App from "./App.vue";

const app = createApp(App);

//Módulo de idiomas
app.use(i18n);

app.mount("#app");
