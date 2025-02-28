<!-- setup language -->
<script setup lang="ts">
import { RouterLink } from 'vue-router'

type namedLocation = {
	name?: string
	path?: string
	params?: {
		uuid: number | string
	}
}

interface Props {
	content?: string
	add?: string
	to?: namedLocation | string
}

const props = withDefaults(defineProps<Props>(), {
	content: 'to product',
	to: '/product/:uuid',
})
</script>

<template>
	<RouterLink :to="props.to">
		<button
			class="w-52 cursor-pointer border-2 border-k-black px-10 py-3 font-bold uppercase tracking-wide text-k-black transition duration-100 hover:translate-y-0.5 hover:shadow-md active:translate-y-1"
			:class="props.add"
		>
			{{ props.content }}
		</button>
	</RouterLink>
</template>
