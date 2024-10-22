<script lang="ts" setup>
import {Delete, FolderChecked, FolderDelete, Plus, Refresh} from "@element-plus/icons-vue";

defineOptions({
	name: 'TableButton',
});

const props = withDefaults(defineProps<{
	disabledDelete?: boolean;
}>(), {
	disabledDelete: false,
});

const emits = defineEmits<{
	addClick: [];
	deleteClick: [];
	selectClick: [];
	deselectClick: [];
	refreshClick: [];
}>();

const addClick = () => {
	emits('addClick');
};
const deleteClick = () => {
	emits('deleteClick');
};
const selectClick = () => {
	emits('selectClick');
};
const deselectClick = () => {
	emits('deselectClick');
};
const refreshClick = () => {
	emits('refreshClick');
};
</script>
<template>
	<div>
		<el-button type="primary" :icon="Plus"
				   @click="addClick"
		>新增
		</el-button>
		<el-button type="danger" :icon="Delete"
				   :disabled="props.disabledDelete"
				   @click="deleteClick">删除
		</el-button>
		<el-button type="warning" :icon="FolderChecked" @click="selectClick">全选</el-button>
		<el-button type="info" :icon="FolderDelete" @click="deselectClick">取消选中</el-button>
		<el-button type="primary" :icon="Refresh" @click="refreshClick">刷新</el-button>
	</div>
</template>