// noinspection JSUnusedGlobalSymbols

import {axiosInstance, axiosConfig, axiosRequest} from "@/plugin/axios";
import {BASE_URL, CONTENT_TYPE} from "@/app/admin/axios/config";
import {requestInterceptors, responseInterceptors} from "@/app/admin/axios/interceptors";
import type {AxiosConfig, IResponse} from "@/app/admin/axios/type";
import {usePermissionStore} from "@/app/admin/stores/permissionStore";

axiosConfig.setBaseURL(BASE_URL);

axiosInstance.interceptors.request.use(requestInterceptors);
axiosInstance.interceptors.response.use(...responseInterceptors);

const request = (options: AxiosConfig) => {
	const {
		url,
		method,
		params,
		data,
		headers,
		responseType,
	} = options;

	const permissionStore = usePermissionStore();

	return axiosRequest.request({
		url: url,
		method,
		params,
		data: data,
		responseType: responseType,
		headers: {
			'Content-Type': CONTENT_TYPE,
			[permissionStore.getTokenKey ?? 'Token']: permissionStore.getToken ?? '',
			...headers
		}
	});
};

export default {
	get: <T = any>(option: AxiosConfig) => {
		return request({method: 'GET', ...option}) as Promise<T>;
	},
	post: <T = any>(option: AxiosConfig) => {
		return request({method: 'POST', ...option}) as Promise<T>;
	},
	delete: <T = any>(option: AxiosConfig) => {
		return request({method: 'DELETE', ...option}) as Promise<T>;
	},
	put: <T = any>(option: AxiosConfig) => {
		return request({method: 'PUT', ...option}) as Promise<T>;
	},
	cancelRequest: (url: string | string[]) => {
		return axiosRequest.cancelRequest(url);
	},
	cancelAllRequest: () => {
		return axiosRequest.cancelAllRequest();
	}
};