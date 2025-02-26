<script setup lang="ts">

type namedLocation = {
	name?: string
	path?: string
	params?: {
		id: number | string
	}
}

type Props = {
	content?: string
	color?: 'light' | 'dark'
	add?: string
	to?: namedLocation | string
	size?: 'small' | 'big'
}

const props = withDefaults(defineProps<Props>(), {
	content: 'to product',
	to: '',
	size: 'big',
})
</script>

<template>
	<component :is="to ? 'router-link': 'div'" class="w-fit" :to="props.to">
		<button
			class="bg-green-600 text-black rounded-sm border-2 uppercase tracking-wide text-k-black shadow-md transition duration-100 cursor-pointer hover:translate-y-0.5 active:translate-y-1"
			:class="[
				props.size == 'small'
					? ['w-40', 'py-3', 'text-sm', 'font-black']
					: ['w-52', 'py-3'],
				props.add,
			]"
		>
			{{ props.content }}
		</button>
	</component>
</template>
