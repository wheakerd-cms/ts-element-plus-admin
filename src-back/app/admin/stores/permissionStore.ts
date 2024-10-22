import {defineStore} from "pinia";
import {computed, type ComputedRef, type Ref, ref} from "vue";

export const usePermissionStore = defineStore('admin.userinfo', () => {

	const tokenKey: string = 'token';
	const getTokenKey: ComputedRef<string> = computed(() => tokenKey);

	const token: Ref<string | null> = ref(null);
	const getToken: ComputedRef<string | null> = computed(() => token.value);
	const setToken = (value: string | null): void => {
		token.value = value;
	};

	const isLogin: ComputedRef<boolean> = computed(() => !!getToken.value);

	const $reset = () => {
		setToken(null);
	};

	return {
		tokenKey,
		token,

		getTokenKey,
		getToken,

		setToken,

		isLogin,
		$reset,
	};
}, {
	persist: {
		key: 'admin.permission',
		pick: [
			'tokenKey',
			'token',
		],
	},
});