import type {RouteRecordRaw} from "vue-router";

export type ReturnTypeRouter<T> = () => Promise<T | (ReturnTypeRouter<T>)>;

export interface InterfaceConfigApp {
	defaultApp: string;
	app: {
		[key: string]: {
			base: string,
			layout?: string,
			pathMatch: {
				path: string,
				name: string,
				redirect: string,
			},
		},
	};
	pages: { [key: string | number]: any };
}

export interface AppConfigStateInterface {
	mode: 'host' | 'router';
	href: string;
	app: null | string;
	defaultRoute: RouteRecordRaw [];
}