<script lang="tsx" setup>
import {onMounted, reactive, ref, unref} from "vue";
import Write from "./components/Write.vue";
import {DelTableApi, GetTableApi, SaveApi, UpdateTableColumnApi} from "@/app/admin/api/permission/menu";
import AdminPagination from "@/app/admin/components/admin-pagination";
import AdminDialog from "@/app/admin/components/admin-dialog";
import {useTable} from "@/app/admin/utils/useTable";
import {ElMessageBox} from "element-plus";
import Table from "@/app/admin/views/permissions/menu/components/Table.vue";
import TableButton from "@/app/admin/components/table-button/src/table-button.vue";

const {
	tableRegister,
	tableState,
	tableMethod,
} = useTable({
	fetchDataApi: async () => {
		console.log(tableState)
		const {currentPage, pageSize} = tableState;
		const res = await GetTableApi({
			currentPage: unref(currentPage),
			pageSize: unref(pageSize),
		});
		return {
			list: res.data?.list || [],
			total: res.data?.total || 0,
		};
	},
	delDataApi: async () => {
		return new Promise((resolve, reject) => {
			ElMessageBox.confirm(
				'确定删除吗?',
				'警告',
				{
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning',
				}
			).then(async () => {
				const res = await DelTableApi({ids: unref(ids)});
				resolve(!!res);
			});
			reject(false);
		});
	},
	UpdateDataApi: async (id: number, column: Object): Promise<boolean> => {
		try {
			const res = await UpdateTableColumnApi({id, ...column});
			return !!res;
		} catch (error) {
			return false;
		}
	},
});

const {tableData, ids, loading, currentPage, pageSize, total} = tableState;
const {
	loadTableData,
	refreshTableData,
	deleteTableDataApi,
	selectTableDataAll,
	deselectTableDataAll,
	collectIdsHandler,
	UpdateTableColumn,
} = tableMethod;

const dialog = reactive({
	visible: false,
	event: '',
});

const formData = ref<Record<string, any>>();

const formRef = ref<InstanceType<typeof Write>>();


const ButtonClickAdd = () => {
	formData.value = undefined;
	dialog.event = 'add';
	dialog.visible = true;
};

const editEvent = (row: Record<string, any>) => {
	formData.value = row;
	dialog.event = 'edit';
	dialog.visible = true;
};

const confirmButton = async () => {
	const validate = await formRef.value?.submit();
	if (!!validate) {
		const res = await SaveApi(formRef.value?.model);
		if (!!res) {
			dialog.visible = false;
			await refreshTableData();
		}
	}
};

const cancelButton = async () => {
	dialog.visible = false;
	formData.value = {};
};

onMounted(() => {
	loadTableData();
});
</script>
<template>
	<div>
		<TableButton :disabled-delete="Object.keys(ids).length === 0"
					 @add-click="ButtonClickAdd"
					 @delete-click="deleteTableDataApi"
					 @select-click="selectTableDataAll"
					 @deselect-click="deselectTableDataAll"
					 @refresh-click="refreshTableData"
					 class="mb-3"
		/>

		<Table v-model="tableData"
			   v-model:ids="ids"
			   :loading="loading"
			   @update-column="UpdateTableColumn"
			   @register="tableRegister"
			   @select="collectIdsHandler"
			   @edit-event="editEvent"
			   @delete-event="deleteTableDataApi"
		/>

		<admin-pagination v-model:current-page="currentPage"
						  v-model:page-size="pageSize"
						  v-model:total="total"
		/>

		<admin-dialog v-model="dialog.visible"
					  :event="dialog.event"
					  @submit="console.log(tableData)"
		>
			<Write v-if="dialog.event === 'add' || dialog.event === 'edit'"
				   ref="formRef"
				   v-model="formData"
			/>
			<template #footer>
				<el-button v-if="dialog.event !== 'detail'"
						   @click="confirmButton"
						   type="primary"
				>
					保存
				</el-button>
				<el-button @click="cancelButton">关闭</el-button>
			</template>
		</admin-dialog>
	</div>
</template>