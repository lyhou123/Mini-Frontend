<script setup lang="ts">
import type { Product } from '../../types/Product';
import ButtonSolid from '../common/ButtonSolid.vue';



const props = defineProps<{

	products: Product[]

}>()



</script>

<template>

	<section class="mt-20 flex mx-auto max-w-6xl flex-col items-center lg:mt-32">
		<h2 class="mb-16 font-Manrope text-3xl font-bold uppercase text-black">
			You may also like
		</h2>
		<div
			class="grid grid-cols-1 md:grid-cols-3  gap-12  lg:gap-6"
		>
			<div
				class="flex flex-col items-center justify-between gap-8 lg:gap-10"
				v-for="item in  props.products.slice(0, 3)"
				:key="item.uuid"
			>
				<RouterLink
					:to="'/product/' + item.id"
					class="overflow-hidden rounded"
				>
					<img class="object-center" :src="item.thumbnail" alt="" loading="lazy" />
				</RouterLink>
				<h3 class="text-center font-Manrope text-2xl font-semibold text-black">
					{{ item.title }} <br class="hidden lg:inline" />
				</h3>
				<ButtonSolid
					
					color="light"
					content="see product"
					size="small"
				/>
			</div>
		</div>
	</section>

	
</template>
