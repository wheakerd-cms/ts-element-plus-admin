<script setup lang="ts">
import {RouterView} from 'vue-router';
import {onBeforeUnmount, onMounted, provide, type Ref, ref} from "vue";

const windowWidth: Ref<number> = ref(window.innerWidth);
const windowHeight: Ref<number> = ref(window.innerHeight);

const updateWindowSize = () => {
	windowWidth.value = window.innerWidth;
	windowHeight.value = window.innerHeight;
};

onMounted(() => {
	window.addEventListener('resize', updateWindowSize);
});

onBeforeUnmount(() => {
	window.removeEventListener('resize', updateWindowSize);
});

provide('windowWidth', windowWidth);
provide('windowHeight', windowHeight);
</script>

<template>
	<RouterView/>
</template>