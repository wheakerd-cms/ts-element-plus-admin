// noinspection JSUnusedGlobalSymbols

import axios, {
    type AxiosError,
    type AxiosInstance,
    type AxiosResponse,
    type InternalAxiosRequestConfig,
} from "axios";
import type {RequestConfig} from "@/types/axios";

const abortControllerMap: Map<string, AbortController> = new Map();

const axiosInstance: AxiosInstance = axios.create({
    baseURL: import.meta.env.BASE_URL || '/',
    timeout: 1000,
    headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
    },
});

const axiosConfig = {
    setBaseURL: (baseURL: string): void => {
        axiosInstance.defaults.baseURL = baseURL;
    },
    setTimeout: (timeout: number): void => {
        axiosInstance.defaults.timeout = timeout;
    },
    setHeader: (key: string, value: string): void => {
        axiosInstance.defaults.headers.common [key] = value;
    },
    setHeaders: (headers: Record<string, string>): void => {
        Object.entries(headers).forEach(([key, value]: [string, string]): void => {
            axiosConfig.setHeader(key, value);
        });
    },
};

axiosInstance.interceptors.request.use((res: InternalAxiosRequestConfig) => {
    const controller: AbortController = new AbortController();
    const url: string = res.url || '';
    res.signal = controller.signal;
    abortControllerMap.set(url, controller);
    return res;
});

axiosInstance.interceptors.response.use(
    (res: AxiosResponse) => {
        const url = res.config.url || '';
        abortControllerMap.delete(url);
        return res;
    },
    (error: AxiosError) => {
        console.error('response interceptor:', error);
        return Promise.reject(error);
    }
);

const axiosRequest = {
    request: (config: RequestConfig) => {
        return new Promise((resolve, reject) => {
            if (config.interceptors?.requestInterceptors) {
                config = config.interceptors.requestInterceptors(config as any);
            }

            axiosInstance.request(config)
                .then((res) => {
                    resolve(res);
                })
                .catch((err: any) => {
                    reject(err);
                });
        });
    },
    cancelRequest: (url: string | string []) => {
        const urlList = Array.isArray(url) ? url : [url];
        urlList.forEach(_url => {
            const controller: AbortController | undefined = abortControllerMap.get(_url);
            controller?.abort();
            abortControllerMap.delete(_url);
        });
    },
    cancelAllRequest: () => {
        abortControllerMap.forEach(controller => controller.abort());
        abortControllerMap.clear();
    }
};

export {
    axiosInstance,
    axiosConfig,
    axiosRequest,
};