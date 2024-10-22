import {createPinia, type Pinia} from 'pinia';
import PiniaPersistedState from 'pinia-plugin-persistedstate';
import type {App} from "vue";

const pinia: Pinia = createPinia();

pinia.use(PiniaPersistedState);

export const registryPinia = (app: App<Element>): void => {
	app.use(pinia);
};

export {pinia};