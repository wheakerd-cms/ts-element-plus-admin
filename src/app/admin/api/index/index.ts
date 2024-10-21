import request from "@/app/admin/axios";

export const LoginApi = (data: any) => {
	return request.post({url: 'index/login', data: data});
};