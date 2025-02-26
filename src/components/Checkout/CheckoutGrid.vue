<script setup lang="ts">
// import CheckoutForm from './CheckoutForm.vue';
import CheckoutForm from './CheckoutForm.vue';
import CheckoutSummary from './CheckoutSummary.vue';
import CheckoutSuccessModal from './CheckoutSuccessModal.vue';
import { useFormStore } from '../../stores/useFormStore';

const formStore = useFormStore();


</script>

<template>
	<div
		class="flex h-full  w-11/12 max-w-6xl mx-auto flex-col items-center gap-4 lg:mb-24 lg:grid lg:w-4/5 lg:grid-cols-3 lg:gap-6"
	>
	     <CheckoutSuccessModal v-show="formStore.bannerOn" />
		<CheckoutForm />
		<CheckoutSummary />
	</div>
</template>
