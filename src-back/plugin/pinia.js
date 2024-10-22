"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pinia = exports.registryPinia = void 0;
var pinia_1 = require("pinia");
var pinia_plugin_persistedstate_1 = require("pinia-plugin-persistedstate");
var pinia = (0, pinia_1.createPinia)();
exports.pinia = pinia;
pinia.use(pinia_plugin_persistedstate_1.default);
var registryPinia = function (app) {
    app.use(pinia);
};
exports.registryPinia = registryPinia;
