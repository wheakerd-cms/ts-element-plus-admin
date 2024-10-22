<script lang="tsx" setup>
import {ElTable, ElTableColumn} from "element-plus";
import {h, ref} from "vue";

defineOptions({
	name: 'PlusTable',
});

const props = withDefaults(defineProps<{
	data: any[];
}>(), {});


const tableRef = ref<InstanceType<typeof ElTable>>();


defineExpose({
	tableRef,
});
</script>
<template>
	<el-table ref="tableRef"
			  :data="props.data"
			  border
			  stripe
			  style="width: 100%"
	>
		<el-table-column type="selection" width="55"/>
		<slot name="default"/>
	</el-table>
</template>
<style lang="css">
.el-table .warning-row {
	--el-table-tr-bg-color: var(--el-color-warning-light-9);
}

.el-table .success-row {
	--el-table-tr-bg-color: var(--el-color-success-light-9);
}
</style>