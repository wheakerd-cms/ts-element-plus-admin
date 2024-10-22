import {Delete, Edit, FolderChecked, FolderDelete, Plus} from "@element-plus/icons-vue";

export const dialogText: Record<string, string> = {
	add: '新增',
	edit: '编辑',
	detail: '详情',
};

export const permissionsButton: Record<string, Record<string, any>> = {
	add: {
		text: '新增',
		type: 'primary',
		icon: Plus,
	},
	delete: {
		text: '删除',
		type: 'danger',
		icon: Delete,
	},
	selectAll: {
		text: '全选',
		type: 'warning',
		icon: FolderChecked,
	},
	deselectAll: {
		text: '取消选中',
		type: 'info',
		icon: FolderDelete,
	},
};