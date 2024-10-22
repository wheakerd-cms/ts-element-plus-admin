<script setup lang="ts">
import {computed, onMounted, provide, ref, unref} from "vue";
import type {ComputedRef, Ref} from "vue";
import ComponentMenu from "@/app/admin/components/ComponentMenu.vue";
import logoImage from "@/assets/logo.svg?url";
import {useRouterStoreWithout} from "@/app/admin/stores/routerStore";
import {useAppStore} from "@/app/admin/stores/appStore";
import router from "@/app/admin/router";
import ComponentHeader from "@/app/admin/components/ComponentHeader.vue";

const {getAddRouters} = useRouterStoreWithout();
const appStore = useAppStore();

const datasource: Ref = ref(getAddRouters as []);
const logoHeight: ComputedRef<number> = computed(() => appStore.nav.logo.height);

console.log(
	unref(router.currentRoute)
);

const redirectRouter = (name: string) => {
	router.push({name: name});
};

</script>
<template>
	<el-container class="vw-100 vh-100 overflow-hidden">
		<el-aside width="220px"
				  style="background-color: #001529"
				  class="overflow-hidden"
		>
			<div :style="{
						height: logoHeight + 'px',
						backgroundColor: '#001529',
				 	}"
				 class="d-flex align-items-center justify-content-center text-white position-sticky top-0 z-1"
			>
				<img :src="logoImage"
					 style="width: 32px;"
					 alt="logo"
				/>
				<span class="ms-2">后台管理系统</span>
			</div>
			<el-scrollbar>
				<ComponentMenu :style="{
								   	backgroundColor: '#001529',
						   			'--el-menu-text-color': '#FFFFFF',
				 					'--el-menu-hover-text-color': '#FFFFFF',
				  					'--el-menu-bg-color': '#0F2438',
				   					'--el-menu-hover-bg-color': '#073d68',
				    				'--el-menu-active-color': '#FFD04B',
				      				// '--el-menu-item-bg-color': '#0F2438',
						   	   }"
							   :datasource="datasource"
							   @on-item-click="redirectRouter"
							   class-name="h-100 border-0 text-white"
				/>
			</el-scrollbar>
		</el-aside>
		<el-container>
			<el-header class="h-auto px-0">
				<ComponentHeader></ComponentHeader>
			</el-header>
			<el-main id="main" class="m-3 rounded-1 border bg-white w-100 h-100">
				<RouterView v-slot="{Component}">
					<Transition name="fade">
						<Component :is="Component"/>
					</Transition>
				</RouterView>
			</el-main>
			<el-footer></el-footer>
		</el-container>
	</el-container>
</template>