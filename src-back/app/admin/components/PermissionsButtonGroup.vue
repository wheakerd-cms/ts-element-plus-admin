<script lang="ts" setup>
import {permissionsButton} from "../plugin/config";

defineOptions({
	name: 'PermissionsButtonGroup',
});

const props = defineProps<{
}>();

const emits = defineEmits<{
	click: [event: string],
}>();

</script>
<template>
	<div class="mb-3">
		<template v-for="(item, key) in permissionsButton">
			<el-button :type="item.type"
					   :icon="item.icon"
					   @click="emits('click', key)"
			>
				{{ item.text }}
			</el-button>
		</template>
	</div>
</template>