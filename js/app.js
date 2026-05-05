"use strict";

import { renderRoute, handleLinks } from "./router.js";
import { initMenu } from "./components/menu.js";

document.addEventListener('DOMContentLoaded', () => {
    initMenu();
    renderRoute(window.location.pathname);
    window.addEventListener('popstate', () => {
    renderRoute(window.location.pathname);
    });
});