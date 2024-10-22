<script setup lang="ts">
import {onMounted, ref} from "vue";
import type {Ref} from "vue";

let divRef: Ref<HTMLDivElement | null> = ref(null);
onMounted(() => {
	if (divRef.value) {
		const str =
			"        <p>&gt; <span>错误代码</span>: \"<i>HTTP 404 Not Found</i>\"</p>\n" +
			"        <p>&gt; <span>错误描述</span>: \"<i>服务器无法找到所请求的资源</i>\"</p>\n" +
			"        <p>&gt; <span>错误可能由</span>: [<b>资源关闭，资源移动，资源删除</b>...]\n" +
			"        </p>\n" +
			"        <p>&gt; <span>如果您是此网站的所有者</span>: [请联系您的托管提供商，让他们知道您的web服务器没有完成请求。]</p>\n" +
			"        <p>&gt; <span>祝你今天愉快:-)</span></p>\n" +
			"        <p>&gt; <a href='javascript:window.location.href=\"/\";'>返回首页</a></p>\n" +
			"        <p></p>";
		let i = 0;
		setTimeout(() => {
			const interval = setInterval(function () {
				if (null === divRef.value) return;

				const divRefProxy = divRef.value;
				i++;
				divRefProxy.innerHTML = str.slice(0, i) + "|";
				if (i === str.length) {
					clearInterval(interval);
					divRefProxy.innerHTML = str;
				}
			}, 1e1 * 3);
		}, 618);
	}
});
</script>
<template>
	<div class="min-vw-100 min-vh-100 overflow-hidden background" style="background-color: #161618">
		<div ref="divRef"
			 class="bg-opacity-10 w-75 position-fixed top-50 start-50 translate-middle py-5 px-5 position-relative"
			 style="box-shadow: 0 0 150px -20px rgba(0, 0, 0, 0.8);z-index: 10;">
		</div>
	</div>
</template>

<style lang="css">
/* cyrillic-ext */
@font-face {
	font-family: 'Montserrat';
	font-style: normal;
	font-weight: 700;
	src: url(@/assets/fonts/typewriter/JTUHjIg1_i6t8kCHKm4532VJOt5-QNFgpCuM73w0aXpsog.woff2) format('woff2');
	unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F;
}

/* cyrillic */
@font-face {
	font-family: 'Montserrat';
	font-style: normal;
	font-weight: 700;
	src: url(@/assets/fonts/typewriter/JTUHjIg1_i6t8kCHKm4532VJOt5-QNFgpCuM73w9aXpsog.woff2) format('woff2');
	unicode-range: U+0301, U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
}

/* vietnamese */
@font-face {
	font-family: 'Montserrat';
	font-style: normal;
	font-weight: 700;
	src: url(@/assets/fonts/typewriter/JTUHjIg1_i6t8kCHKm4532VJOt5-QNFgpCuM73w2aXpsog.woff2) format('woff2');
	unicode-range: U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1, U+01AF-01B0, U+0300-0301, U+0303-0304, U+0308-0309, U+0323, U+0329, U+1EA0-1EF9, U+20AB;
}

/* latin-ext */
@font-face {
	font-family: 'Montserrat';
	font-style: normal;
	font-weight: 700;
	src: url(@/assets/fonts/typewriter/JTUHjIg1_i6t8kCHKm4532VJOt5-QNFgpCuM73w3aXpsog.woff2) format('woff2');
	unicode-range: U+0100-02AF, U+0304, U+0308, U+0329, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
}

/* latin */
@font-face {
	font-family: 'Montserrat';
	font-style: normal;
	font-weight: 700;
	src: url(@/assets/fonts/typewriter/JTUHjIg1_i6t8kCHKm4532VJOt5-QNFgpCuM73w5aXo.woff2) format('woff2');
	unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}

/* latin */
@font-face {
	font-family: 'Share Tech Mono';
	font-style: normal;
	font-weight: 400;
	src: url(@/assets/fonts/typewriter/J7aHnp1uDWRBEqV98dVQztYldFcLowEF.woff2) format('woff2');
	unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}

P {
	font-family: "Share Tech Mono", monospace;
	color: #f5f5f5;
	margin: 0 0 20px;
	font-size: 1.2rem;
	line-height: 1.2;
}

span {
	color: #f0c674;
}

i {
	color: #8abeb7;
}

div a {
	text-decoration: none;
}

b {
	color: #81a2be;
}

a.avatar img {
	border-radius: 100%;
	width: 44px;
	border: 2px solid white;
}

@-webkit-keyframes slide {
	from {
		right: -100px;
		-webkit-transform: rotate(360deg);
		transform: rotate(360deg);
		opacity: 0;
	}
	to {
		right: 15px;
		-webkit-transform: rotate(0deg);
		transform: rotate(0deg);
		opacity: 1;
	}
}

@keyframes slide {
	from {
		right: -100px;
		-webkit-transform: rotate(360deg);
		transform: rotate(360deg);
		opacity: 0;
	}
	to {
		right: 15px;
		-webkit-transform: rotate(0deg);
		transform: rotate(0deg);
		opacity: 1;
	}
}

.background::before {
	position: fixed;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	display: block;
	content: '404';
	font-size: calc(0.8 * (100vw + 100vh) / 2);
	z-index: -1;
}
</style>