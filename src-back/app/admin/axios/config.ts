import {getAppName} from "@/modules/appReader";
import type {AxiosContentType} from "@/types/axios";

/**
 * request success status code
 * @var number SUCCESS_CODE
 */
export const SUCCESS_CODE: number = 200;

/**
 * request contentType
 */
export const CONTENT_TYPE: AxiosContentType = 'application/json';

export const BASE_URL: string = `http://127.0.0.1:9601/${getAppName()}/`;