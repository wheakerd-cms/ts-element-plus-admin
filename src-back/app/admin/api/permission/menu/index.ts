import request from "@/app/admin/axios";
import type {TableType} from "@/app/admin/api/permission/menu/type";
import type {IResponse} from "@/app/admin/axios/type";

export const SaveApi = (data: any) => {
	return request.post({url: 'permission/menu/save', data: data});
};
export const GetTableApi = (data: any): Promise<IResponse<TableType>> => {
	return request.post({url: 'permission/menu/table', data: data});
};
export const DelTableApi = (data: any): Promise<IResponse> => {
	return request.post({url: 'permission/menu/delete', data: data});
};
export const UpdateTableColumnApi = (data: any): Promise<IResponse> => {
	return request.post({url: 'permission/menu/update', data: data});
};
export const GetParentSelectApi = (): Promise<{
	message: string;
	data: Record<string, any>[];
}> => {
	return request.get({url: 'permission/menu/select'});
};