import type {InterfaceConfigApp} from "@/plugin/types";

export const appConfig: InterfaceConfigApp = {
	defaultApp: 'admin',
	app: {
		admin: {
			base: '/admin',
			layout: `app/admin/views/LayoutView`,
			pathMatch: {
				path: '/:pathMatch(.*)*',
				name: 'NotFound',
				redirect: '/404',
			},
		},
	},
	pages: {
		404: '@/views/404.vue',
	},
};