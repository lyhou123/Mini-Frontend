<script setup lang="ts">

import { useCartStore } from '../../stores/useCartStore';
import type { Product } from '../../types/Product';
import ButtonCount from '../common/ButtonCount.vue';

const cartStore = useCartStore()

const props = defineProps<{
	cartItem: Product
	itemCount: number
}>()

</script>

<template>
	<div
		v-if="itemCount > 0"
		class="flex w-full flex-row items-center justify-between gap-12 px-6 lg:px-10"
	>
		<div class="flex h-full w-full flex-row gap-6">
			<img
				class="aspect-square w-20 rounded-lg object-cover shadow-md lg:w-24"
				:src="props.cartItem.image"
				alt=""
			/>
			<div class="flex flex-col justify-center">
				<p class="text-lg font-bold text-k-black lg:text-xl line-clamp-1">
					{{ props.cartItem.title }}
				</p>
				<p class="lg:text-md text-sm font-bold text-k-black opacity-80">
					$ {{ props.cartItem.price }}
				</p>
			</div>
		</div>
		<ButtonCount
			:item-count="props.itemCount"
			@increase-cart="cartStore.addToCart(cartItem)"
			@decrease-cart="cartStore.removeFromCart(cartItem)"
		/>
	</div>
</template>
