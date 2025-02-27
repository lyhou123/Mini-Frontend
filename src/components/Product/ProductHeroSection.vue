<script setup lang="ts">

import frontImage from '/images/cow-front-new.webp'
import backImage from '/images/cow-back-new.webp'
</script>

<template>
  	   <div class="group rounded-xl order-1 flex h-[500px] w-full flex-col items-center justify-center md:order-none md:grid md:grid-cols-7">
					<RouterLink
						:to="{ name: 'product', params: { uuid: 1 } }"
						href=""
						class="relative flex h-full w-full flex-col items-center justify-center overflow-hidden md:col-span-4 md:px-10"
					>
						<img
							:src="frontImage"
							alt=""
							class="z-20 my-5 aspect-auto translate-x-3 translate-y-3 scale-110 md:my-0 md:translate-x-0 md:translate-y-0 md:scale-125 md:transition md:duration-700 md:group-hover:translate-x-6 md:group-hover:translate-y-6"
						/>
						<img
							:src="backImage"
							alt=""
							class="absolute z-10 aspect-auto -translate-x-3 -translate-y-3 scale-110 md:translate-x-0 md:translate-y-0 md:scale-100 md:transition md:duration-700 md:group-hover:-translate-x-6 md:group-hover:-translate-y-6"
						/>
						<div
							class="absolute  h-[12rem] w-[12rem] rounded-full border border-black opacity-40 transition duration-700 group-hover:scale-125 md:h-[18rem] md:w-[18rem]"
						></div>
						<div
							class="absolute h-[20rem] w-[20rem] rounded-full border border-black opacity-40 transition duration-700 group-hover:scale-110 md:h-[26rem] md:w-[26rem]"
						></div>
						<div
							class="absolute h-[26rem] w-[26rem] rounded-full border border-black opacity-40 transition duration-700 group-hover:scale-90 md:h-[36rem] md:w-[36rem]"
						></div>
						<div
							class="absolute h-[32rem] w-[32rem] rounded-full border border-black opacity-40 transition duration-700 group-hover:scale-125 md:h-[46rem] md:w-[46rem]"
						></div>
					</RouterLink>
					<div
						class="relative rounded-xl z-10 col-span-3 flex h-full w-full flex-col justify-center md:pl-4 md:pr-20 lg:pl-6 lg:pr-24"
					>
						<h2
							class="text-center text-5xl font-semibold uppercase md:text-start lg:text-6xl"
						>
							ZX9 <br />
							Keyboard
						</h2>
						<p
							class="mb-8 mt-4 text-center tracking-wide md:mb-10 md:text-start"
						>
							Upgrade to premium keys that are phenominally built to deliver a
							truly remarkable typing feel.
						</p>
						<ButtonSolid
							:to="{ name: 'product', params: { uuid: 1 } }"
							content="SEE PRODUCT"
							add="font-semibold hover:rotate-x-3"
							class="mb-10 self-center md:mb-0 md:self-start"
						/>
					</div>
				</div>
  </template>