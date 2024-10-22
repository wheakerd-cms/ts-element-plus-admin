import {defineStore} from "pinia";

interface stateInterface {
	theme: string;
}

export const useAppStore = defineStore('admin.app', {
	state: () => ({
		theme: 'light',
		nav: {
			width: 220,
			logo: {
				height: 52,
			},
			menu: {
				height: 0,
			},
		},
	}),
	actions: {},
	persist: true,
});