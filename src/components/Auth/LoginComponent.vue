<template>
    <div>
      <h2>Login</h2>
      <form @submit.prevent="login">
        <input v-model="credentials.email" type="email" placeholder="Email" required />
        <input v-model="credentials.password" type="password" placeholder="Password" required />
        <button type="submit">Login</button>
      </form>
      <p v-if="error">{{ error }}</p>
    </div>
  </template>
  
  <script lang="ts">
  
  import { defineComponent, ref } from 'vue';
 // Adjust the path as needed

import { useAuthStore } from '../../stores/Auth/authStore';

import type { Credentials } from '../../types/User';
  
  export default defineComponent({
    setup() {
      const authStore = useAuthStore();
      const credentials = ref<Credentials>({
        email: '',
        password: '',
      });
      const error = ref('');
  
      const login = async () => {
        try {
          await authStore.login(credentials.value);
        } catch (err:any) {
          error.value = err.message || 'Login failed';
        }
      };
  
      return {
        credentials,
        error,
        login,
      };
    },
  });
  </script>