<script lang="ts" setup>
import {Close} from '@element-plus/icons-vue';
import {dialogText} from "@/app/admin/plugin/config";

defineOptions({
	name: 'AdminDialog',
});

const props = defineProps<{
	title?: string;
	event?: string;
	width?: '500 px';
}>();

const modelValue = defineModel();
</script>
<template>
	<el-dialog
		v-model="modelValue"
		:width="props.width"
		align-center
		destroy-on-close
		draggable
		:append-to-body="false"
		:show-close="false"
		:close-on-click-modal="false"
	>
		<template #header>
			<div class="d-flex justify-content-between mx-2 mt-2">
				<span>
					{{
						!!props?.event
						&& dialogText.hasOwnProperty(props?.event)
							? dialogText [props.event]
							: ''
					}}
				</span>
				<div>
					<el-icon>
						<Close/>
					</el-icon>
				</div>
			</div>
			<el-divider class="my-2"/>
		</template>
		<template #default>
			<div ref="defaultSlotRef"
				 class="w-100 d-flex justify-content-center px-3"
			>
				<slot/>
			</div>
		</template>
		<template #footer>
			<el-divider class="my-2"/>
			<slot name="footer"/>
		</template>
	</el-dialog>
</template>