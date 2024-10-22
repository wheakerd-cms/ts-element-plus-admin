import type {AppConfigStateInterface} from "@/plugin/types";
import {createRouter, createWebHistory, type Router, type RouteRecordRaw} from "vue-router";
import {generateRoutes} from "@/modules/viewReader";
import {appConfig} from "@/plugin/app";

const state: AppConfigStateInterface = {
	mode: import.meta.env.VITE_ROUTER_MODE,
	href: window.location.href,
	app: null,
	defaultRoute: [
		{
			path: '/404',
			name: '404',
			component: `${appConfig.pages ['404']}`,
		},
		{
			path: '/:pathMatch(.*)*',
			name: 'NotFound',
			redirect: '/404',
		}
	] as RouteRecordRaw [],
};

const getAppName = (): string => {
	const match: RegExp = /.*:\/{2}([^.:]*).*?\/([^\/]*)\/?/gm;
	const matchReg: RegExpExecArray | null = new RegExp(match).exec(state.href);
	const appName: undefined | string = state.mode === 'host' ? matchReg?. [2] : matchReg ?. [1];

	return !!appName && Object.keys(appConfig.app).includes(appName)
		? appName : appConfig.defaultApp;
};

const getLayoutView = (): undefined | string => {
	return appConfig.app [getAppName()].layout;
};

const getDefaultRoute = (): Router => {
	const routes: RouteRecordRaw [] = generateRoutes(state.defaultRoute, getLayoutView());

	return createRouter({
		history: createWebHistory(),
		routes: routes,
	});
};

export {
	getAppName,
	getLayoutView,
	getDefaultRoute,
};