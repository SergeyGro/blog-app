"use strict";

import { renderRoute, handleLinks } from "./router.js";

function initPage(){
    renderRoute(window.location.pathname);
    handleLinks();
    window.addEventListener('popstate', () => {
    renderRoute(window.location.pathname);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    initPage();
});