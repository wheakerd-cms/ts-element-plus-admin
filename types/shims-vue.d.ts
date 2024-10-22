import {ImportGlobFunction} from "./importGlob";

declare module "*.vue" {
	import type {DefineComponent} from "vue";
	const component: DefineComponent<{}, {}, any>;
	export default component;
}

declare global {
	interface ImportMeta {
		readonly env: ImportMetaEnv
		readonly glob: ImportGlobFunction
	}
}