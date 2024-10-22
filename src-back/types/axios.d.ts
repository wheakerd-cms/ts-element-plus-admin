import type {AxiosRequestConfig, AxiosResponse} from "axios";

declare type AxiosContentType =
	| 'text/html'
	| 'text/plain'
	| 'multipart/form-data'
	| 'application/json'
	| 'application/x-www-form-urlencoded'
	| 'application/octet-stream';

interface RequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
	interceptors?: RequestInterceptors<T>;
}