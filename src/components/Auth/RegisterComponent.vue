
<script setup lang="ts">
import { ref, reactive } from 'vue';
import { Form, Field, ErrorMessage, defineRule, configure } from 'vee-validate';
import { required, email, min, alpha_num, confirmed } from '@vee-validate/rules';
import { localize } from '@vee-validate/i18n';
import { EyeIcon, EyeOffIcon, XCircleIcon, CheckCircleIcon } from 'lucide-vue-next';
import { useAuthStore } from '../../stores/Auth/authStore';
import { RouterLink } from 'vue-router';



// Define validation rules
defineRule('required', required);
defineRule('email', email);
defineRule('min', min);
defineRule('alpha_num', alpha_num);
defineRule('confirmed', confirmed);

// Configure Vee-Validate
configure({
  generateMessage: localize({
    en: {
      messages: {
        required: 'This field is required',
        email: 'Please enter a valid email address',
        min: 'This field must be at least {length} characters',
        alpha_num: 'This field may only contain alphabetic characters and numbers',
        confirmed: 'Passwords do not match'
      }
    }
  })
});

// Form data
const formData = reactive({
  userName: '',
  email: '',
  password: '',
  confirmPassword: ''
});

// UI state
const showPassword = ref(false);
const isSubmitting = ref(false);
const registrationError = ref('');
const registrationSuccess = ref(false);

// Toggle password visibility
const togglePassword = () => {
  showPassword.value = !showPassword.value;
};

// Form submission handler
const onSubmit = async (values:any) => {
  try {

    isSubmitting.value = true;
    registrationError.value = '';
    registrationSuccess.value = false;

    const hanndleRegister = useAuthStore();

   const res = await hanndleRegister.register(values);
    
   if (res as any) {

    registrationSuccess.value = true;
    
    // Reset form after successful registration
    formData.userName = '';
    formData.email = '';
    formData.password = '';
    formData.confirmPassword = '';
 

   } else {
    registrationError.value = 'Registration failed. This email or username may already be in use.';
   }
    
  } catch (error) {
    // Handle registration error
    registrationError.value = 'Registration failed. This email or username may already be in use.';
    
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<template>

  <div class="py-12 px-4 sm:px-6 lg:px-8 w-1/2">
      <div class="w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
        <div class="text-center">
          <h2 class="mt-6 text-3xl font-extrabold text-gray-900">Create your account</h2>
          <p class="mt-2 text-sm text-gray-600">
            Already have an account?

          <RouterLink to="/login">
              <a href="" class="font-medium text-green-600 hover:text-green-500">
              Sign in
            </a>
          </RouterLink>
          
          </p>
        </div>
        
        <Form @submit="onSubmit" class="mt-8 space-y-6" v-slot="{ errors }">
          <div class="rounded-md shadow-sm space-y-4">
            <!-- Username field -->
            <div>
              <label for="userName" class="block text-sm font-medium text-gray-700">Username</label>
              <Field
                id="userName"
                name="userName"
                type="text"
                autocomplete="userName"
                :class="[
                  'appearance-none relative block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm mt-1',
                  { 'border-red-500': errors.userName }
                ]"
                rules="required|min:3|alpha_num"
                v-model="formData.userName"
              />
              <ErrorMessage name="userName" class="text-red-500 text-xs mt-1" />
            </div>
            
            <!-- Email field -->
            <div>
              <label for="email" class="block text-sm font-medium text-gray-700">Email address</label>
              <Field
                id="email"
                name="email"
                type="email"
                autocomplete="email"
                :class="[
                  'appearance-none relative block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm mt-1',
                  { 'border-red-500': errors.email }
                ]"
                rules="required|email"
                v-model="formData.email"
              />
              <ErrorMessage name="email" class="text-red-500 text-xs mt-1" />
            </div>
            
            <!-- Password field -->
            <div>
              <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
              <div class="relative">
                <Field
                  id="password"
                  name="password"
                  :type="showPassword ? 'text' : 'password'"
                  autocomplete="new-password"
                  :class="[
                    'appearance-none relative block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm mt-1',
                    { 'border-red-500': errors.password }
                  ]"
                  rules="required|min:8"
                  v-model="formData.password"
                />
                <button 
                  type="button" 
                  class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-500"
                  @click="togglePassword"
                >
                  <EyeIcon v-if="showPassword" class="h-5 w-5" />
                  <EyeOffIcon v-else class="h-5 w-5" />
                </button>
              </div>
              <ErrorMessage name="password" class="text-red-500 text-xs mt-1" />
              <p class="text-xs text-gray-500 mt-1">Password must be at least 8 characters</p>
            </div>
            
            <!-- Confirm Password field -->
            <div>
              <label for="confirmPassword" class="block text-sm font-medium text-gray-700">Confirm Password</label>
              <div class="relative">
                <Field
                  id="confirmPassword"
                  name="confirmPassword"
                  :type="showPassword ? 'text' : 'password'"
                  autocomplete="new-password"
                  :class="[
                    'appearance-none relative block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm mt-1',
                    { 'border-red-500': errors.confirmPassword }
                  ]"
                  rules="required|confirmed:@password"
                  v-model="formData.confirmPassword"
                />
                <button 
                  type="button" 
                  class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-500"
                  @click="togglePassword"
                >
                  <EyeIcon v-if="showPassword" class="h-5 w-5" />
                  <EyeOffIcon v-else class="h-5 w-5" />
                </button>
              </div>
              <ErrorMessage name="confirmPassword" class="text-red-500 text-xs mt-1" />
            </div>
          </div>
  
      
           
  
          <div>
            <button
              type="submit"
              class="group cursor-pointer relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              :disabled="isSubmitting"
            >
              <span v-if="isSubmitting">Creating account...</span>
              <span v-else>Create account</span>
            </button>
          </div>
          
          <div v-if="registrationError" class="bg-red-50 p-4 rounded-md">
            <div class="flex">
              <div class="flex-shrink-0">
                <XCircleIcon class="h-5 w-5 text-red-400" />
              </div>
              <div class="ml-3">
                <h3 class="text-sm font-medium text-red-800">{{ registrationError }}</h3>
              </div>
            </div>
          </div>
          
          <div v-if="registrationSuccess" class="bg-green-50 p-4 rounded-md">
            <div class="flex">
              <div class="flex-shrink-0">
                <CheckCircleIcon class="h-5 w-5 text-green-400" />
              </div>
              <div class="ml-3">
                <h3 class="text-sm font-medium text-green-800">Account created successfully!</h3>
                <p class="mt-2 text-sm text-green-700">You can now sign in with your credentials.</p>
              </div>
            </div>
          </div>
        </Form>
      </div>
    </div>

  </template>
  