// noinspection JSUnusedGlobalSymbols,DuplicatedCode

import {type RouteRecordRaw,} from "vue-router";
import {defineStore} from "pinia";
import {cloneDeep} from "lodash";
import {generateRoutes as viewReaderGenerateRoutes} from "@/modules/viewReader";
import {pinia} from "@/plugin/pinia";
import {getLayoutView} from "@/modules/appReader";
import {computed, type ComputedRef, type Ref, ref} from "vue";

interface StateInterface {
	addRoutes: RouteRecordRaw [];
	routes: RouteRecordRaw [];
	isAddRoutes: boolean;
}

export const useRouterStore = defineStore('admin.router', () => {

	const addRoutes: Ref<RouteRecordRaw []> = ref([]);
	const getAddRouters: ComputedRef<RouteRecordRaw []> = computed(() => addRoutes.value);
	const setAddRouters = (routes: RouteRecordRaw []): void => {
		addRoutes.value = routes;
	};

	const routes: Ref<RouteRecordRaw []> = ref([]);
	const getRouters: ComputedRef<RouteRecordRaw []> = computed(() => routes.value);
	const setRouters = (routers: RouteRecordRaw []): void => {
		routes.value = routers;
	};
	const generateRoutes = async () => {
		return new Promise<void>(async (resolve): Promise<void> => {

			const addRouters = getAddRouters.value.concat(
				[
					{
						path: '/:path(.*)*',
						redirect: '/404',
						name: 'NotFound',
					},
				] as unknown as RouteRecordRaw []
			);

			setRouters(
				viewReaderGenerateRoutes(addRouters, getLayoutView())
			);
			resolve();
		});
	};

	const isAddRoutes: Ref<boolean> = ref(false);
	const getIsAddRouters: ComputedRef<boolean> = computed(() => isAddRoutes.value);
	const setIsAddRouters = (value: boolean): void => {
		isAddRoutes.value = value;
	};


	return {
		addRoutes,
		getAddRouters,
		setAddRouters,

		getRouters,
		generateRoutes,

		getIsAddRouters,
		setIsAddRouters,
	};
}, {
	persist: {
		key: 'admin.router',
		pick: [
			'addRoutes',
		],
	},
});

// export const useRouterStore = defineStore('admin.router', {
// 	state: (): StateInterface => ({
// 		addRoutes: [] as RouteRecordRaw [],
// 		routes: [] as RouteRecordRaw [],
// 		isAddRoutes: false,
// 	}),
// 	getters: {
// 		getRouters(): RouteRecordRaw [] {
// 			return this.routes;
// 		},
// 		getAddRouters(): RouteRecordRaw [] {
// 			return this.addRoutes;
// 		},
// 		getIsAddRouters(): boolean {
// 			return this.isAddRoutes;
// 		},
// 	},
// 	actions: {
// 		generateRoutes() {
// 			return new Promise<void>(async (resolve): Promise<void> => {
//
// 				const addRouters = this.getAddRouters.concat([
// 					{
// 						path: '/:path(.*)*',
// 						redirect: '/404',
// 						name: 'NotFound',
// 					},
// 				] as unknown as RouteRecordRaw []);
//
// 				this.routes = viewReaderGenerateRoutes(
// 					addRouters,
// 					getLayoutView(),
// 				);
// 				resolve();
// 			});
// 		},
// 		initRoutes(routes?: RouteRecordRaw []): Promise<unknown> {
// 			if (!!routes) {
// 				this.setAddRouters(routes);
// 			}
// 			return new Promise<void>(async (resolve): Promise<void> => {
// 				const routers: RouteRecordRaw [] = viewReaderGenerateRoutes(
// 					this.getAddRouters,
// 					getLayoutView(),
// 				);
// 				this.routes = cloneDeep(this.getAddRouters).concat(routers) as RouteRecordRaw [];
// 				resolve();
// 			});
// 		},
// 		setAddRouters(routes: RouteRecordRaw []): void {
// 			this.addRoutes = routes;
// 		},
// 		setIsAddRouters(value: boolean): void {
// 			this.isAddRoutes = value;
// 		},
// 	},
// 	persist: {
// 		key: `admin.router`,
// 		pick: [
// 			'addRoutes',
// 		],
// 	},
// });

export const useRouterStoreWithout = () => {
	return useRouterStore(pinia);
};