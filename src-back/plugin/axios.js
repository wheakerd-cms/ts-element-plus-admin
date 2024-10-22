"use strict";
// noinspection JSUnusedGlobalSymbols
Object.defineProperty(exports, "__esModule", { value: true });
exports.axiosRequest = exports.axiosConfig = exports.axiosInstance = void 0;
var axios_1 = require("axios");
var abortControllerMap = new Map();
var axiosInstance = axios_1.default.create({
    baseURL: import.meta.env.BASE_URL || '/',
    timeout: 1000,
    headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
    },
});
exports.axiosInstance = axiosInstance;
var axiosConfig = {
    setBaseURL: function (baseURL) {
        axiosInstance.defaults.baseURL = baseURL;
    },
    setTimeout: function (timeout) {
        axiosInstance.defaults.timeout = timeout;
    },
    setHeader: function (key, value) {
        axiosInstance.defaults.headers.common[key] = value;
    },
    setHeaders: function (headers) {
        Object.entries(headers).forEach(function (_a) {
            var key = _a[0], value = _a[1];
            axiosConfig.setHeader(key, value);
        });
    },
};
exports.axiosConfig = axiosConfig;
axiosInstance.interceptors.request.use(function (res) {
    var controller = new AbortController();
    var url = res.url || '';
    res.signal = controller.signal;
    abortControllerMap.set(url, controller);
    return res;
});
axiosInstance.interceptors.response.use(function (res) {
    var url = res.config.url || '';
    abortControllerMap.delete(url);
    return res;
}, function (error) {
    console.error('response interceptor:', error);
    return Promise.reject(error);
});
var axiosRequest = {
    request: function (config) {
        return new Promise(function (resolve, reject) {
            var _a;
            if ((_a = config.interceptors) === null || _a === void 0 ? void 0 : _a.requestInterceptors) {
                config = config.interceptors.requestInterceptors(config);
            }
            axiosInstance.request(config)
                .then(function (res) {
                resolve(res);
            })
                .catch(function (err) {
                reject(err);
            });
        });
    },
    cancelRequest: function (url) {
        var urlList = Array.isArray(url) ? url : [url];
        urlList.forEach(function (_url) {
            var controller = abortControllerMap.get(_url);
            controller === null || controller === void 0 ? void 0 : controller.abort();
            abortControllerMap.delete(_url);
        });
    },
    cancelAllRequest: function () {
        abortControllerMap.forEach(function (controller) { return controller.abort(); });
        abortControllerMap.clear();
    }
};
exports.axiosRequest = axiosRequest;
