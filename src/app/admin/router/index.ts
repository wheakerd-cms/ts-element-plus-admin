import {createRouter, createWebHistory, type Router, type RouteRecordRaw} from "vue-router";
import {usePermissionsStoreWithout} from "@/app/admin/stores/permissionStore";
import {useUserInfoStore} from "@/app/admin/stores/userinfoStore";

const NO_REDIRECT_WHITE_LIST: string [] = [
	'/login',
];

export const baseRouter: { [key: string]: any } [] = [
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
	}
];

const router: Router = createRouter({
	history: createWebHistory('/admin'),
	routes: [],
});

baseRouter.forEach((route: { [key: string]: any }) => {
	router.addRoute(route as RouteRecordRaw);
});

router.beforeEach(async (to, from, next) => {
	const permissionsStore = usePermissionsStoreWithout()
	const userinfoStore = useUserInfoStore();

	if (!userinfoStore.isLogin()) {
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

	if (permissionsStore.getIsAddRouters) {
		next();
		return;
	}

	await permissionsStore.initRoutes(permissionsStore.getAddRouters);
	permissionsStore.getRouters.forEach((route: RouteRecordRaw) => {
		router.addRoute(route);
	});
	permissionsStore.setIsAddRouters(true);

	const redirectPath = from.query.redirect || to.path;
	const redirect = decodeURIComponent(redirectPath as string);
	const nextData = redirect && to.path !== redirect ? {...to, replace: true} : {path: redirect};
	next(nextData);
});

export default router;