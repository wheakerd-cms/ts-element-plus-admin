import {createRouter, createWebHistory, type Router, type RouteRecordRaw} from "vue-router";
import {usePermissionStore} from "@/app/admin/stores/permissionStore";
import {useRouterStoreWithout} from "@/app/admin/stores/routerStore";

const NO_REDIRECT_WHITE_LIST: string [] = [
	'/login',
];

const baseRouter: { [key: string]: any } [] = [
	{
		path: '/',
		name: 'index',
		redirect: '/dashboard',
	},
	{
		path: '/login',
		name: 'login',
		component: () => import(`@/app/admin/views/index/LoginView.vue`),
	},
	{
		path: '/404',
		name: '404',
		component: () => import(`@/views/404.vue`),
	},
];

const router: Router = createRouter({
	history: createWebHistory('/admin'),
	routes: [],
});

baseRouter.forEach((route: { [key: string]: any }) => {
	router.addRoute(route as RouteRecordRaw);
});

router.beforeEach(async (to, from, next) => {
	const routerStore = useRouterStoreWithout()
	const permissionStore = usePermissionStore();

	if (!permissionStore.isLogin) {
		if (NO_REDIRECT_WHITE_LIST.includes(to.path)) {
			next();
			return;
		}
		next(`/login?redirect=${to.path}`);
		return;
	}

	if (to.path === '/login') {
		next({path: '/'});
		return;
	}

	if (routerStore.getIsAddRouters) {
		next();
		return;
	}

	await routerStore.generateRoutes();
	routerStore.getRouters.forEach((route: RouteRecordRaw) => {
		router.addRoute(route);
	});
	routerStore.setIsAddRouters(true);

	const redirectPath = from.query.redirect || to.path;
	const redirect: string = decodeURIComponent(redirectPath as string);
	const nextData = redirect && to.path !== redirect ? {...to, replace: true} : {path: redirect};

	next(nextData);
});

// noinspection JSUnusedGlobalSymbols
export default router;