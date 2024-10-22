<script lang="ts" setup>
import {ElTable, ElTableColumn} from "element-plus";
import {ref} from "vue";

const model = defineModel<Record<string, any>[]>({
	required: true,
});
const ids = defineModel<number []>('ids', {
	required: true,
	default: [],
});
const props = withDefaults(defineProps<{
	loading?: boolean;
}>(), {
	loading: false,
});
const emits = defineEmits<{
	editEvent: [row: Record<string, any>];
	detailEvent: [row: Record<string, any>];
	deleteEvent: [id: number];
	updateColumn: [id: number, column: any];
}>();

const tableRef = ref<InstanceType<typeof ElTable>>();

const tableSelectEvent = async () => {
	ids.value = tableRef.value?.getSelectionRows().map(
		(item: Record<string, any>) => item.id
	);
};

const editClick = (row: Record<string, any>) => {
	emits('editEvent', row);
};
const detailClick = (row: Record<string, any>) => {
	emits('detailEvent', row);
};
const deleteClick = (id: number) => {
	emits('deleteEvent', id);
};
const updateColumn = (id: number, column: any) => {
	emits('updateColumn', id, column);
};
</script>
<template>
	<el-table ref="tableRef"
			  :data="model"
			  v-loading="props.loading"
			  style="width: 100%"
			  row-key="id"
			  table-layout="auto"
			  border
			  stripe
			  default-expand-all
			  show-overflow-tooltip
			  @select="tableSelectEvent"
			  @select-all="tableSelectEvent"
	>
		<el-table-column fixed="left" type="selection"/>
		<el-table-column prop="name" label="菜单名称"/>
		<el-table-column prop="componentName" label="组件名称"/>
		<el-table-column prop="component" label="组件路径"/>
		<el-table-column prop="path" label="路由地址"/>
		<el-table-column prop="icon" label="图标"/>
		<el-table-column prop="permissions" label="操作权限">
			<template #default="scope">
				<template v-for="item in scope.row.permissions">
					<span v-if="item === 'add'">新增,</span>
					<span v-else-if="item === 'edit'">编辑,</span>
					<span v-else-if="item === 'delete'">删除,</span>
					<span v-else></span>
				</template>
			</template>
		</el-table-column>
		<el-table-column prop="status" label="状态">
			<template #default="scope">
				<el-switch v-model="scope.row.status"
						   @click="updateColumn(scope.row.id, {status: scope.row.status})"
						   style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"
				></el-switch>
			</template>
		</el-table-column>
		<el-table-column prop="dev" label="是否开发环境">
			<template #default="scope">
				<el-switch v-model="scope.row.dev"
						   @click="updateColumn(scope.row.id, {dev:scope.row.dev})"
						   style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"
				></el-switch>
			</template>
		</el-table-column>
		<el-table-column prop="fixed" label="是否固定标签">
			<template #default="scope">
				<el-switch v-model="scope.row.fixed"
						   @click="updateColumn(scope.row.id, {fixed: scope.row.fixed})"
						   style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"
				></el-switch>
			</template>
		</el-table-column>
		<el-table-column prop="sort" label="排序"/>
		<el-table-column fixed="right"
						 label="操作"
						 :show-overflow-tooltip="false"
						 class-name="border-start border-1"
		>
			<template #default="scope">
				<div class="d-flex">
					<el-button type="primary" @click="editClick(scope.row)">编辑</el-button>
					<el-button type="success" @click="detailClick(scope.row)">详情</el-button>
					<el-button type="danger" @click="deleteClick(scope.row.id)">删除</el-button>
				</div>
			</template>
		</el-table-column>
	</el-table>
</template>
<style lang="css">
.el-table__cell .cell {
	white-space: nowrap;
}
</style>