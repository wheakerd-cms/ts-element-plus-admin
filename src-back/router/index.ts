import {type Router} from "vue-router";
import {hasRouterModule, getRouterModule} from "@/modules/routerReader";
import {getAppName, getDefaultRoute} from "@/modules/appReader";

const app: string | undefined = getAppName();

const router: Router = !!app && hasRouterModule(app) ? getRouterModule(app) : getDefaultRoute();

export default router;