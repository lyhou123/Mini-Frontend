<script setup lang="ts">
import { ref } from 'vue';
import type { Product } from '../../types/Product';
import ButtonSolid from '../common/ButtonSolid.vue';



const props = defineProps<{
	productCategory: string
}>()

const products = ref<Product[]>([]);


</script>

<template>
	<!-- <section class="mt-20 flex w-4/5 max-w-6xl flex-col items-center lg:mt-32">
		<h2 class="mb-16 font-Manrope text-3xl font-bold uppercase text-black">
			You may also like
		</h2>
		<div
			class="flex flex-col items-center gap-12 lg:grid lg:grid-cols-3 lg:grid-rows-1 lg:gap-6"
		>
			<div
				class="flex flex-col items-center justify-between gap-8 lg:gap-10"
				v-for="(item, index) in products"
				:key="index"
			>
				<RouterLink
					:to="'/product/' + item.id"
					class="overflow-hidden rounded"
				>
					<img class="object-center" :src="item.src" alt="" loading="lazy" />
				</RouterLink>
				<h3 class="text-center font-Manrope text-2xl font-semibold text-black">
					{{ item.header }} <br class="hidden lg:inline" />
					<span class="capitalize"> {{ item.subheader }}</span>
				</h3>
				<ButtonSolid
					:to="{ name: item.category, params: { id: item.id } }"
					color="light"
					content="see product"
					size="small"
				/>
			</div>
		</div>
	</section> -->

	<section class="grid grid-cols-1 w-full lg:grid-cols-3 lg:gap-6">
    <section class="mt-20 flex w-4/5 max-w-6xl flex-col items-center lg:mt-32">
		<h2 class="mb-16 font-Manrope text-3xl font-bold uppercase text-black">
			You may also like
		</h2>
		<div
			class="flex flex-col items-center gap-12 lg:grid lg:grid-cols-3 lg:grid-rows-1 lg:gap-6"
		>
			<div
				class="flex flex-col items-center justify-between gap-8 lg:gap-10"
			>
				<RouterLink
					:to="'/product/' + 1"
					class="overflow-hidden rounded"
				>
					<img class="object-center" src="/public/images/cow-full.webp" alt="" loading="lazy" />
				</RouterLink>
				<h3 class="text-center font-Manrope text-2xl font-semibold text-black">
				   Hello <br class="hidden lg:inline" />
			
				</h3>
				<ButtonSolid
					:to="{ name: 'product', params: { uuid: 1 } }"
					color="light"
					content="see product"
					size="small"
				/>
			</div>
		</div>
	</section>
	<section class="mt-20 flex w-4/5 max-w-6xl flex-col items-center lg:mt-32">
		<h2 class="mb-16 font-Manrope text-3xl font-bold uppercase text-black">
			You may also like
		</h2>
		<div
			class="flex flex-col items-center gap-12 lg:grid lg:grid-cols-3 lg:grid-rows-1 lg:gap-6"
		>
			<div
				class="flex flex-col items-center justify-between gap-8 lg:gap-10"
			>
				<RouterLink
					:to="'/product/' + 1"
					class="overflow-hidden rounded"
				>
					<img class="object-center" src="/public/images/cow-full.webp" alt="" loading="lazy" />
				</RouterLink>
				<h3 class="text-center font-Manrope text-2xl font-semibold text-black">
				   Hello <br class="hidden lg:inline" />
			
				</h3>
				<ButtonSolid
					:to="{ name: 'product', params: { uuid: 1 } }"
					color="light"
					content="see product"
					size="small"
				/>
			</div>
		</div>
	</section>
	<section class="mt-20 flex w-4/5 max-w-6xl flex-col items-center lg:mt-32">
		<h2 class="mb-16 font-Manrope text-3xl font-bold uppercase text-black">
			You may also like
		</h2>
		<div
			class="flex flex-col items-center gap-12 lg:grid lg:grid-cols-3 lg:grid-rows-1 lg:gap-6"
		>
			<div
				class="flex flex-col items-center justify-between gap-8 lg:gap-10"
			>
				<RouterLink
					:to="'/product/' + 1"
					class="overflow-hidden rounded"
				>
					<img class="object-center" src="/public/images/cow-full.webp" alt="" loading="lazy" />
				</RouterLink>
				<h3 class="text-center font-Manrope text-2xl font-semibold text-black">
				   Hello <br class="hidden lg:inline" />
			
				</h3>
				<ButtonSolid
					:to="{ name: 'product', params: { uuid: 1 } }"
					color="light"
					content="see product"
					size="small"
				/>
			</div>
		</div>
	</section>
	</section>
</template>
