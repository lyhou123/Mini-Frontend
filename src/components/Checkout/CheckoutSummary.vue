<script setup lang="ts">
import { useCartStore } from '../../stores/useCartStore';

import ButtonSolid from '../common/ButtonSolid.vue';
import SummaryItem from './CheckoutSummaryItem.vue'
import { useFormStore } from '../../stores/useFormStore';

const cartStore = useCartStore()

const formStore = useFormStore()

</script>

<template>
	<div
		class="col-span-1 flex h-fit max-h-full w-full flex-col rounded bg-white px-6 py-12 lg:self-start lg:px-10"
		data-test="checkout-summary"
	>
		<h1 class="text-2xl font-bold uppercase text-black">Summary</h1>
		<div
			class="my-10 flex h-full w-full flex-col gap-5 overflow-x-hidden overflow-y-scroll"
		>
			<SummaryItem
				v-for="(value, _, index) in cartStore.cart"
				:cart-item="value.product"
				:item-count="value.amount"
				:key="index"
			/>
		</div>
		<div class="flex flex-row justify-between">
			<p class="font-semibold tracking-wide text-black text-opacity-60">
				TOTAL
			</p>
			<p class="text-lg font-bold text-black">${{ cartStore.cartValue }}</p>
		</div>
		<div class="flex flex-row justify-between">
			<p class="font-semibold tracking-wide text-black text-opacity-60">
				SHIPPING
			</p>
			<p
				class="text-lg font-bold text-black"
				:class="
					cartStore.cartValue > cartStore.freeShippingThreshold &&
					'line-through'
				"
			>
				${{ cartStore.shipping }}
			</p>
		</div>
		<div class="flex flex-row justify-between">
			<p class="font-semibold tracking-wide text-black text-opacity-60">
				VAT (INCLUDED)
			</p>
			<p class="text-lg font-bold text-black">$ 0</p>
		</div>
		<div class="mt-4 flex flex-row justify-between">
			<p class="font-black tracking-wide text-black">GRAND TOTAL</p>
			<p class="text-lg font-bold text-black">${{ cartStore.cartValue }}</p>
		</div>
		<ButtonSolid
		    @click="formStore.submit()"
			content="continue & pay"
			color="light"
			class="mt-8 self-center font-bold"
			data-test="checkout-button"
		/>
	</div>
</template>
