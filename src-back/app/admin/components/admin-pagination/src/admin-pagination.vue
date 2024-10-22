<script lang="ts" setup>
defineOptions({
	name: 'AdminPagination',
});

const props = withDefaults(defineProps<{
	size?: 'large' | 'default' | 'small';
	disabled?: boolean;
	background?: boolean;
	total: number;
}>(), {
	size: 'default',
	disabled: false,
	background: true,
});

const currentPage = defineModel('currentPage', {
	type: Number,
	required: true,
});
const pageSize = defineModel('pageSize', {
	type: Number,
	required: true,
});
const total = defineModel('total', {
	type: Number,
	required: true,
});

const sizeChange = (value: number) => {
	pageSize.value = value;
};
const currentChange = (value: number) => {
	currentPage.value = value;
};
</script>
<template>
	<div class="mt-3 d-flex justify-content-end">
		<el-pagination :current-page="currentPage"
					   :page-size="pageSize"
					   :page-sizes="[10, 30, 50, 100]"
					   :size="props.size"
					   :disabled="props.disabled"
					   :background="props.background"
					   layout="total, sizes, prev, pager, next, jumper"
					   :total="total"
					   hide-on-single-page
					   @size-change="sizeChange"
					   @current-change="currentChange"
		/>
	</div>
</template>