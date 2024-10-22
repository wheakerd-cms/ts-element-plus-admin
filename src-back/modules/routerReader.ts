import type {Router} from "vue-router";
import {routerModules} from "@/plugin/modules";

const getRouterPath = (app: string): string => {
	return `/src/app/${app}/router/index.ts`;
};

const hasRouterModule = (app: string): boolean => {
	return routerModules.hasOwnProperty(
		getRouterPath(app)
	);
};

const getRouterModule = (app: string): Router => {
	if (!hasRouterModule(app)) {
		throw new Error(`Router not found for path: ${getRouterPath(app)}`);
	}

	return routerModules [getRouterPath(app)] as Router;
};

export {
	hasRouterModule,
	getRouterModule,
};