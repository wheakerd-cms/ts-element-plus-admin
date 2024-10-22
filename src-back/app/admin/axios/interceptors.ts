import {
	type AxiosError,
	type AxiosResponse,
	type InternalAxiosRequestConfig,
} from "axios";
import {usePermissionStore} from "@/app/admin/stores/permissionStore";
import {ElMessage} from "element-plus";
import {SUCCESS_CODE} from "@/app/admin/axios/config";
import router from "@/app/admin/router";

const permissionStore = usePermissionStore();

// request interceptor
const requestInterceptors = (config: InternalAxiosRequestConfig<any>) => {
	config.timeout = 6e3;
	if (!!permissionStore.getToken) {
		config.headers [permissionStore.getTokenKey] = permissionStore.getToken;
	}

	return config;
};

// response interceptor
const responseInterceptors: [
	(response: AxiosResponse) => any,
	(error: AxiosError) => void,
] = [
	(response: AxiosResponse) => {
		// do something on response data
		const {
			headers,
			data,
		} = response;

		if (!!headers && headers.hasOwnProperty(permissionStore.getTokenKey)) {
			const token: string = headers [permissionStore.getTokenKey] as string;
			permissionStore.setToken(token);
		}

		return data;
	},
	(error: AxiosError): void => {
		const status: undefined | number = error?.status;
		const message: undefined | string = (error?.response?.data as { message?: string })?.message;
		ElMessage({
			message: !!message ? message : error.message,
			grouping: true,
			type: 'error',
		});

		if (status === 401) {
			permissionStore.$reset();
			router.push({path: '/login'});
		}
	},
];

export {
	requestInterceptors,
	responseInterceptors,
}