<script lang="tsx" setup>
import {h, onMounted, ref, type VNode} from 'vue';
import {
	ElForm,
	ElFormItem,
	ElCol,
	ElInput,
	ElCheckboxGroup,
	ElSwitch,
	ElRadioGroup,
	ElTreeSelect,
} from 'element-plus';

defineOptions({
	name: 'AdminForm',
});

const model = defineModel<Record<string, any>>();
const props = withDefaults(defineProps<{
	rules?: {};
	schemes: {
		col?: number;
		attributes: Record<string, any>;
		label: string;
		slots: {
			default: () => JSX.Element;
		};
	}[];
}>(), {
	rules: {},
});

const emits = defineEmits<{
	register: [ref: InstanceType<typeof ElForm>];
}>();

const formRef = ref<InstanceType<typeof ElForm>>();

const getComponent = (component?: string) => {
	switch (component) {
		case 'ElCheckboxGroup':
			return ElCheckboxGroup;
		case 'ElSwitch':
			return ElSwitch;
		case 'ElRadioGroup':
			return ElRadioGroup;
		case 'ElTreeSelect':
			return ElTreeSelect;
		default:
			return ElInput;
	}
};

const FormItem = () => <>
	{
		props.schemes.map(item => {
			const component = item?.component ?? 'ElInput';

			const eventListeners = Object.entries(item?.events || {}).reduce(
				(acc, [eventName, eventHandler]) => {
					if (typeof eventHandler === 'function') {
						const eventKey = `on${eventName.charAt(0).toUpperCase() + eventName.slice(1)}`;
						acc [eventKey] = eventHandler;
					} else {
						console.warn(`Invalid event handler for event: ${eventName}`);
					}
					return acc;
				},
				{} as Record<string, () => any>
			);

			const slotListeners = Object.entries(item?.slots || {}).reduce(
				(acc, [slotName, slotContent]) => {
					if (typeof slotContent === 'function') {
						acc [slotName] = () => h(slotContent as (props: any) => VNode);
					} else {
						console.warn(`Invalid slot handler for slot: ${slotName}`);
					}
					return acc;
				},
				{} as Record<string, () => any>
			);

			if (!(item?.prop in model.value)) {
				if (item?.value) {
					model.value [item.prop] = item.value;
				} else if (component === 'ElCheckboxGroup') {
					model.value [item.prop] = [];
				} else {
					model.value [item.prop] = null;
				}
			}

			const formItemSlots = item?.formItem?.slots || {};

			if (!('default' in formItemSlots)) {
				formItemSlots.default = () => h(getComponent(component), {
					modelValue: model.value [item.prop],
					'onUpdate:modelValue': (value) => {
						model.value [item.prop] = value;
					},
					...item?.attributes,
					...eventListeners,
				}, slotListeners);
			}

			return <>
				<ElCol span={item?.col ?? 24}>
					{
						h(ElFormItem, {
							prop: item?.prop,
							label: item?.label,
							...item?.formItem?.attributes,
						}, formItemSlots)
					}
				</ElCol>
			</>;
		})
	}
</>;

onMounted(() => {
	emits('register', formRef.value);
});
</script>
<template>
	<el-form ref="formRef"
			 :model="model"
			 :rules="props.rules"
			 label-position='right'
			 label-width="auto"
			 class="w-100"
	>
		<el-row>
			<form-item/>
		</el-row>
	</el-form>
</template>