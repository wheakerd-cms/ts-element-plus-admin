import type {ReturnTypeRouter} from "@/plugin/types";

const routerModules: Record<string, unknown> =
    import.meta.glob(`/src/app/**/router/*.ts`, {
        import: 'default',
        eager: true,
    });

const viewModules: Record<string, ReturnTypeRouter<unknown>> =
    import.meta.glob([
        `/src/app/**/views/**/*.{vue,tsx}`,
        `/src/views/**/*.{vue,tsx}`,
    ]);

export {
    routerModules,
    viewModules,
};