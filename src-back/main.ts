import "@/assets/main.scss";

import {createApp, type App} from "vue";
import AppElement from "@/App.vue";
import {registryPinia} from "@/plugin/pinia";
import router from "@/router";
import ElementPlus from "element-plus";
import zhCn from 'element-plus/es/locale/lang/zh-cn';

const app: App<Element> = createApp(AppElement);

registryPinia(app);
app.use(router);
app.use(ElementPlus, {
	locale: zhCn,
});

app.mount('#app');