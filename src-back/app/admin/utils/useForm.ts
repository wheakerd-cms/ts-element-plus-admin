import type {ElForm} from "element-plus";
import {nextTick, type Ref, ref, unref} from "vue";

const useForm = () => {
	const formRef = ref<InstanceType<typeof ElForm>>();
	const formData: Ref<Record<string, any>> = ref({});

	const formRegister = (ref?: InstanceType<typeof ElForm>) => {
		formRef.value = ref;
	};

	const getFormRef = async () => {
		await nextTick();
		const form = unref(formRef);
		if (!form) {
			console.error('The form is not registered!');
		}
		return form;
	};

	const getFormData = async () => {
		const form = await getFormRef();
		console.log(form);
	};

	const formSubmit = async () => {
		const form = await getFormRef();
		return form?.validate().catch(
			err => console.error(err)
		);
	};

	return {
		formRegister,
		formMethods: {
			getFormRef,
			getFormData,
			formSubmit,
		},
		formState: {
			formData,
		},
	};
};

export {
	useForm,
};