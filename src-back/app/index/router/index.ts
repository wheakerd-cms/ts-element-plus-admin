import {createRouter, createWebHistory, type Router, type RouteRecordRaw} from "vue-router";

export const baseRouter: { [key: string]: any } [] = [
	{
		path: '/',
		name: 'index',
		component: () => import('@/app/index/views/IndexView.vue'),
	},
];

const router: Router = createRouter({
	history: createWebHistory('/'),
	routes: [],
});

baseRouter.forEach((route: { [key: string]: any }) => {
	router.addRoute(route as RouteRecordRaw);
});

// noinspection JSUnusedGlobalSymbols
export default router;