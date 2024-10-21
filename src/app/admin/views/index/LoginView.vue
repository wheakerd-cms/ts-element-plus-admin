<script setup lang="ts">
import {type Reactive, reactive} from "vue";
import {defineRoutes} from "@/app/admin/stores/routesStore";
import type {RouteRecordRaw} from "vue-router";
import router from "@/router";
import {useRouterStoreWithout} from "@/app/admin/stores/routerStore";
import {LoginApi} from "@/app/admin/api/index";
import type {loginApiTypes} from "@/app/admin/api/index/type";
import LoginBoxBg from "@/assets/admin/svgs/login-box-bg.svg?component";

const routerStore = useRouterStoreWithout();

const form: Reactive<loginApiTypes> = reactive({
	username: 'admin',
	password: '123456',
});

const onSubmit = async () => {
	const res = await LoginApi(form);

	if (!!res) {
		routerStore.setAddRouters(defineRoutes as RouteRecordRaw []);
		await routerStore.generateRoutes();

		routerStore.getRouters.forEach((route: RouteRecordRaw) => {
			console.log(route)
			router.addRoute(route);
		});
		routerStore.setIsAddRouters(true);

		await router.push('/dashboard/analysis');
	}
};
</script>
<template>
	<div class="position-fixed top-0 start-0 text-white p-4 z-1">
		<img src="../../../../assets/logo.svg" alt="logo" style="width: 32px;"/>
		<span class="ms-2">后台管理系统</span>
	</div>
	<div class="min-vw-100 min-vh-100 row g-0">
		<div class="col-6 d-flex align-items-center justify-content-center" style="background-color: #353E54">
			<LoginBoxBg style="width: 350px; height: 350px;"></LoginBoxBg>
		</div>
		<div class="col-6 d-flex align-items-center justify-content-center">
			<div class="w-100 rounded-3 p-4 d-flex flex-column justify-content-center"
				 style="max-width: 480px;">
				<div class="text-dark h4 text-center fw-bold">登录</div>
				<form @submit.prevent="onSubmit" class="w-100 text-secondary">
					<div class="mb-3 w-100">
						<label for="formControlUsername" class="form-label">账号</label>
						<input v-model="form.username"
							   type="text" class="form-control" id="formControlUsername" placeholder="请输入账号"/>
					</div>
					<div class="mb-3">
						<label for="formControlPassword" class="form-label">密码</label>
						<input v-model="form.password"
							   type="password" class="form-control" id="formControlPassword" placeholder="请输入密码"/>
					</div>
					<div class="pt-4">
						<button type="submit" class="btn btn-primary w-100">登录</button>
					</div>
				</form>
			</div>
		</div>
	</div>
</template>