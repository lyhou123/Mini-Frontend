
  <script setup lang="ts">

  import { ref, reactive } from 'vue';
  import { Form, Field, ErrorMessage, defineRule, configure } from 'vee-validate';
  import { required, email, min } from '@vee-validate/rules';
  import { localize } from '@vee-validate/i18n';
  import { EyeIcon, EyeOffIcon,  XCircleIcon } from 'lucide-vue-next';
  import { useAuthStore } from '../../stores/Auth/authStore';
import { RouterLink } from 'vue-router';

  
  // Define validation rules
  defineRule('required', required);
  defineRule('email', email);
  defineRule('min', min);
  
  // Configure Vee-Validate
  configure({
    generateMessage: localize({
      en: {
        messages: {
          required: 'This field is required',
          email: 'Please enter a valid email address',
          min: 'This field must be at least {length} characters'
        }
      }
    })
  });
  
  // Form data
  const formData = reactive({
    email: '',
    password: '',
    rememberMe: false
  });
  
  // UI state
  const showPassword = ref(false);
  const isSubmitting = ref(false);
  const loginError = ref('');
  
  // Toggle password visibility
  const togglePassword = () => {
    showPassword.value = !showPassword.value;
  };
  
  // Form submission handler
  const onSubmit = async (values:any) => {

    isSubmitting.value = true;

    try {

      const handleLogin = useAuthStore();

      await handleLogin.login(values);

      isSubmitting.value = false;


    } catch (err:any) {
      isSubmitting.value = false;
      loginError.value = err.message || 'Login failed';
    }
  };



  </script>

  <template>
    
    <div class="flex items-center  py-12 px-4 sm:px-6 lg:px-8">
      <div class="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
        <div class="text-center">
          <h2 class="mt-6 text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
          <p class="mt-2 text-sm text-gray-600">
            Or
           <RouterLink to="/register" >
       
            <a href="#" class="font-medium text-green-600 hover:text-green-500">
              Sign
            </a>
           </RouterLink>
          </p>
        </div>
        
        <Form @submit="onSubmit" class="mt-8 space-y-6" v-slot="{ errors }">
          <div class="rounded-md shadow-sm space-y-4">
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
            
            <div>
              <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
              <div class="relative">
                <Field
                  id="password"
                  name="password"
                  :type="showPassword ? 'text' : 'password'"
                  autocomplete="current-password"
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
            </div>
          </div>
  
          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                v-model="formData.rememberMe"
              />
              <label for="remember-me" class="ml-2 block text-sm text-gray-900">
                Remember me
              </label>
            </div>
  
          </div>
  
          <div>
            <button
              type="submit"
              class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              :disabled="isSubmitting"
            >
              <span class="absolute left-0 inset-y-0 flex items-center pl-3">
                <LockClosedIcon class="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" />
              </span>
              <span v-if="isSubmitting">Signing in...</span>
              <span v-else>Sign in</span>
            </button>
          </div>
          
          <div v-if="loginError" class="bg-red-50 p-4 rounded-md">
            <div class="flex">
              <div class="flex-shrink-0">
                <XCircleIcon class="h-5 w-5 text-red-400" />
              </div>
              <div class="ml-3">
                <h3 class="text-sm font-medium text-red-800">{{ loginError }}</h3>
              </div>
            </div>
          </div>
        </Form>
      </div>
    </div>
  </template>
  