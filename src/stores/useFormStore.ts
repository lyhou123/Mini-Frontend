import { defineStore } from 'pinia'
import { useCartStore } from './useCartStore'

export const useFormStore = defineStore('form', {
	state: () => ({
		bannerState: 'hide',
		name: '',
		email: '',
		phone: '',
		address: '',
		zip: '',
		city: '',
		country: '',
		payment: 'electronic',
		comment: '',
		showErrors: false,
	}),
	actions: {
		bannerOn() {
			this.bannerState = 'show'
		},
		bannerOff() {
			this.bannerState = 'hide'
		},
		setCash(e: Event) {
			e.preventDefault()
			this.payment = 'cash'
		},
		setElectronic(e: Event) {
			e.preventDefault()
			this.payment = 'electronic'
		},
		submit() {
			// ✅ Call cartStore inside an action, not outside `defineStore`
			const cartStore = useCartStore()

			if (cartStore.cartLength === 0) {
				alert('Shopping cart is empty!')
				return
			}

			const allSet =
				this.isValidName === 'true' &&
				this.isValidEmail === 'true' &&
				this.isValidPhone !== 'false' &&
				this.isValidAddress === 'true' &&
				this.isValidZip === 'true' &&
				this.isValidCity === 'true' &&
				this.isValidCountry === 'true'

			if (allSet) {
				// send data to API
				this.showErrors = false
				this.bannerOn()
				return
			}

			this.showErrors = true
		},
	},
	getters: {
		showBanner: (state) => state.bannerState === 'show',
		choseCash: (state) => state.payment === 'cash',
		isValidName: (state) => {
			if (state.name === '') return 'empty'
			return /^[a-z ,.'-]+$/i.test(state.name) ? 'true' : 'false'
		},
		isValidEmail: (state) => {
			if (state.email === '') return 'empty'
			return /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-]+)(\.[a-zA-Z]{2,5}){1,2}$/.test(state.email)
				? 'true'
				: 'false'
		},
		isValidPhone: (state) => {
			if (state.phone === '') return 'empty'
			return /^[0-9()-]+$/.test(state.phone) ? 'true' : 'false'
		},
		isValidAddress: (state) => {
			if (state.address === '') return 'empty'
			return /[\w',-\\/.\s]/.test(state.address) ? 'true' : 'false'
		},
		isValidZip: (state) => {
			if (state.zip === '') return 'empty'
			return /^[0-9]{5}(?:-[0-9]{4})?$/.test(state.zip) ? 'true' : 'false'
		},
		isValidCity: (state) => {
			if (state.city === '') return 'empty'
			return /[a-zA-Z]+/.test(state.city) ? 'true' : 'false'
		},
		isValidCountry: (state) => {
			if (state.country === '') return 'empty'
			return /[a-zA-Z]+/.test(state.country) ? 'true' : 'false'
		},
	},
})
