import {nextTick, type Ref, ref, unref, watch} from "vue";
import {ElTable} from "element-plus";

export const useTable = (config: {
	fetchDataApi: () => Promise<{
		list?: any;
		total?: number;
	}>;
	delDataApi?: () => Promise<boolean>;
	UpdateDataApi?: (id: number, column: Object) => Promise<boolean>;
}) => {
	const tableRef = ref<InstanceType<typeof ElTable>>();
	const tableData: Ref<any> = ref([]);

	const loading = ref(false);

	const currentPage: Ref<number> = ref(1);
	const pageSize: Ref<number> = ref(10);
	const total: Ref<number> = ref(0);
	const pageSizes: Ref<number []> = ref([10, 30, 50, 100]);
	const ids: Ref<number []> = ref([]);

	const tableRegister = (ref: InstanceType<typeof ElTable>) => {
		tableRef.value = ref;
	};


	const getTableRef = async () => {
		await nextTick();
		const table = unref(tableRef);
		if (!table) {
			console.error('The table is not registered!');
		}
		return table;
	};

	const tableMethod = {
		loadTableData: async () => {
			loading.value = true;
			try {
				const res = await config?.fetchDataApi();
				console.log('fetchDataApi res', res);
				if (res) {
					tableData.value = res.list;
					total.value = res.total || 0;
				}
			} catch (err) {
				console.log('fetchDataApi error');
			} finally {
				loading.value = false;
			}
		},
		refreshTableData: async (): Promise<void> => {
			await tableMethod.loadTableData();
		},
		deleteTableDataApi: async () => {
			const {delDataApi} = config;
			if (!delDataApi) {
				console.warn('delDataApi is undefined');
				return;
			}
			try {
				const res: boolean | undefined = await delDataApi();
				console.log('delDataApi res', res);
			} catch (err) {
				console.log('delDataApi error');
			}
		},
		selectTableDataAll: async () => {
			const tableRef = await getTableRef();
			tableRef?.toggleAllSelection();
			await tableMethod.collectIdsHandler();
		},
		deselectTableDataAll: async () => {
			const tableRef = await getTableRef();
			tableRef?.clearSelection();
			await tableMethod.collectIdsHandler();
		},
		collectIdsHandler: async (): Promise<void> => {
			const tableRef = await getTableRef();
			ids.value = tableRef?.getSelectionRows().map((item: Record<string, any>) => item.id);
		},
		UpdateTableColumn: async (id: number, column: any): Promise<boolean> => {
			const {UpdateDataApi} = config;
			if (!UpdateDataApi) {
				console.warn('UpdateDataApi is undefined');
				return false;
			}
			try {
				const res: boolean = await UpdateDataApi(id, column);
				console.log('UpdateDataApi res', res);
				return res;
			} catch (err) {
				console.log('UpdateDataApi error');
				return false;
			}
		},
	};

	watch(
		() => pageSize.value,
		() => tableMethod.refreshTableData(),
	);

	return {
		tableRegister,
		getTableRef,
		tableMethod,
		tableState: {
			tableData,
			ids,
			loading,
			currentPage,
			pageSize,
			total,
			pageSizes,
		},
	};
};