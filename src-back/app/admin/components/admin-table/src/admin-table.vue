<script lang="tsx" setup>
import {ElTable, ElTableColumn} from "element-plus";
import {h, onMounted, ref} from "vue";
import type {TableColumnCtx} from "element-plus/es/components/table/src/table-column/defaults";

defineOptions({
	name: 'AdminTable',
});

const data = defineModel('data', {
	type: Array,
});

const props = withDefaults(defineProps<{
	rowKey?: string;
	hasSelection?: boolean;
	operate?: boolean;
	loading?: boolean;
	schemes: {
		attributes: TableColumnCtx
		label: string;
		slots: {
			default: () => JSX.Element;
		};
	}[];
}>(), {
	rowKey: 'id',
	hasSelection: true,
	operate: true,
	loading: false,
});

const TableColumn = () => <>
	{
		props.schemes.map(item => {
			return h(ElTableColumn, {
				...item?.attributes
			}, item?.slots);
		})
	}
</>;

const tableRef = ref<InstanceType<typeof ElTable>>(null);

const emits = defineEmits<{
	register: [ref: InstanceType<typeof ElTable>];
	editEvent: [scope: Record<string, any>];
	detailEvent: [scope: Record<string, any>];
	deleteEvent: [del: number []];
	select: [];
}>();

const editClickEvent = (scope: Record<string, any>) => {
	emits('editEvent', scope);
};
const detailClickEvent = (scope: Record<string, any>) => {
	emits('detailEvent', scope);
};
const deleteClickEvent = (scope: Record<string, any>) => {
	emits('deleteEvent', [scope.row [props.rowKey]]);
};

onMounted(() => {
	emits('register', tableRef.value);
});
</script>
<template>
	<el-table ref="tableRef"
			  :data="data"
			  v-loading="props.loading"
			  style="width: 100%"
			  :row-key="props.rowKey"
			  table-layout="auto"
			  border
			  stripe
			  default-expand-all
			  show-overflow-tooltip
			  scrollbar-always-on
			  @select="emits('select')"
			  @select-all="emits('select')"
	>
		<el-table-column v-if="props.hasSelection" fixed="left" type="selection"/>
		<table-column></table-column>
		<el-table-column v-if="props.operate"
						 fixed="right"
						 label="操作"
						 :show-overflow-tooltip="false"
		>
			<template #default="scope">
				<div class="d-flex">
					<el-button type="primary" @click="editClickEvent(scope)">编辑</el-button>
					<el-button type="success" @click="detailClickEvent(scope)">详情</el-button>
					<el-button type="danger" @click="deleteClickEvent(scope)">删除</el-button>
				</div>
			</template>
		</el-table-column>
	</el-table>
</template>