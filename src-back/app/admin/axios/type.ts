import type {
	Method,
	RawAxiosRequestHeaders,
	ResponseType,
} from "axios";

export declare interface AxiosConfig {
	params?: any
	data?: any
	url?: string
	method?: Method
	headers?: RawAxiosRequestHeaders
	responseType?: ResponseType
}

export declare interface IResponse<T = any> {
	message: string;
	data: T | undefined;
}