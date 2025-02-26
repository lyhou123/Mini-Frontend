<script setup lang="ts">

import { useCartStore } from '../../stores/useCartStore';
import type { Product } from '../../types/Product';
import ButtonGoBack from '../common/ButtonGoBack.vue';
import ButtonSolid from '../common/ButtonSolid.vue';

const props = defineProps<{
	item: Product
}>()

const cardStore = useCartStore();

</script>

<template>
	<ButtonGoBack />
	<section
		class="flex  max-w-6xl flex-col lg:grid lg:grid-cols-2 lg:grid-rows-1"
	>
		<div
			class="flex flex-col items-center pb-6 lg:col-span-1 lg:col-start-2 lg:row-span-full lg:ml-24 lg:items-start lg:justify-center"
		>
			<p
				v-if="props.item.title"
				class="lg:text-md text-sm uppercase tracking-broad text-black"
			>
				new product
			</p>
			<h1
				class="mt-4 text-center text-4xl font-semibold uppercase text-black lg:text-start lg:text-6xl"
			>
				{{ props.item.title }} <br class="hidden lg:inline" />
			
			</h1>
			<p class="mt-6 text-center text-black opacity-60 lg:pr-20 lg:text-start line-clamp-3">
				{{ props.item.description }}
			</p>
			<p class="my-8 text-xl font-bold text-black">$ {{ props.item.price }}</p>
			<ButtonSolid
				@click="cardStore.addToCart(props.item)"
				color="light"
				add="font-bold"
				content="add to cart"
			/>
		</div>
		<div
			class="order-first  overflow-hidden rounded pb-10 lg:order-none lg:col-span-1 lg:col-start-1 lg:row-span-full lg:pb-0"
		>
			<img
				loading="lazy"
				class="relative aspect-square object-cover"
				:src="props.item.image"
				alt=""
			/>
		</div>
	</section>
</template>
