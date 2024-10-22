import type {ReturnTypeRouter} from "@/plugin/types";
import type {RouteRecordRaw} from "vue-router";
import {viewModules} from "@/plugin/modules";
import {cloneDeep} from "lodash";

const getRoutes = (routes: RouteRecordRaw [], layout: ReturnTypeRouter<unknown> | { name: string }) => {
	let routerMap: RouteRecordRaw [] = [];

	const requiredKey: string [] = [
		'path',
		'name',
		'redirect',
		'meta',
	];

	for (const route of routes) {
		const data: {
			[key: string]: any
		} = Object.entries(route).reduce<{
			[key: string]: any
		}>(
			(
				obj: { [key: string]: any }, [key, value]: [string, [string, any] []]) => {
				if (requiredKey.includes(key) && !!value) obj [key] = value;
				return obj;
			}, {} as { [key: string]: any }
		);

		const component: undefined | string = route.component as unknown as undefined | string;

		if (!!component) {
			const comModule: ReturnTypeRouter<any> = getModule(component);

			data.component =
				component === '#'
					? layout
					: component === '##' ? {
						name: 'ParentLayout'
					} : comModule;
		}

		if (!!route.children) {
			data.children = getRoutes(route.children, layout);
		}

		routerMap.push(data as RouteRecordRaw);
	}

	return routerMap;
};

const existModule = (component: string | undefined): boolean => {
	return !!component && !!(viewModules [`/src/${component}.vue`] || viewModules [`/src/${component}.tsx`]);
};

const getModule = (component: string): ReturnTypeRouter<unknown> => {
	const comModule: ReturnTypeRouter<unknown> =
		viewModules [`/src/${component}.vue`] ||
		viewModules [`/src/${component}.tsx`];

	if (!comModule && !component.includes('#')) {
		console.error(
			`View model missing: /src/${component}.vue file or /src/${component}.tsx file not found, please create`
		);
	}

	return comModule;
};

const generateRoutes = (routes: RouteRecordRaw [], layout: string | undefined): RouteRecordRaw[] => {
	const routers: RouteRecordRaw [] = cloneDeep(routes);

	if (!existModule(layout)) {
		throw new Error(
			`Layout layout missing: /src/${layout}.vue file or /src/${layout}.tsx file not found, please create`
		);
	}

	const layoutView: ReturnTypeRouter<unknown> | { name: string } =
		!!layout ? getModule(layout) : {name: 'Layout'};

	return getRoutes(routers, layoutView);
}

export {
	getModule,
	generateRoutes,
};