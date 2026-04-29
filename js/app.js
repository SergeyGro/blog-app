"use strict";

import { renderRoute, handleLinks } from "./router.js";

document.addEventListener('DOMContentLoaded', () => {
    renderRoute(window.location.pathname);
    window.addEventListener('popstate', () => {
    renderRoute(window.location.pathname);
    });
});