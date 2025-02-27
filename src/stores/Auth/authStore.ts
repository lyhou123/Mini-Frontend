

import { defineStore } from 'pinia';
import type { Credentials, UserData, User } from '../../types/User'; // Adjust the path as needed
import Router from '../../routers/router';
import axios from '../../api/axois';
import VueCookies from 'vue-cookies'; 
import { jwtDecode } from 'jwt-decode';

export const useAuthStore = defineStore('auth', {

  state: () => ({
    token: (VueCookies as any).get('token') || null, // Get token from cookies
    refreshToken: (VueCookies as any).get('refreshToken') || null, // Get refresh token from cookies
    user: null as User | null,
  }),

  getters: {
    isAuthenticated: (state) => !!state.token,
    currentUser: (state) => state.user,
  },

  actions: {

    setToken(token: string) {
      this.token = token;
      (VueCookies as any).set('token', token, '7d', '/', '', true, 'Strict'); // Set token in cookies with 7-day expiration
       axios.defaults.headers.common['Authorization'] = `Bearer ${token}`; // Set auth header
    },

    setRefreshToken(refreshToken: string) {
      this.refreshToken = refreshToken;
      (VueCookies as any).set('refreshToken', refreshToken, '7d', '/', '', true, 'Strict');
    },

    clearToken() {
      this.token = null;
      (VueCookies as any).remove('token'); // Remove token from cookies
      delete axios.defaults.headers.common['Authorization']; // Remove auth header
    },

    setUser(user: User) {
      this.user = user;
    },

    async login(credentials: Credentials) {

      try {

        const response = await axios.post('/auth/login', credentials);
        const token = response?.data?.data?.accessToken;

        if (token) {

          const decodedToken: any = jwtDecode(token); 

          const userRoles: string[] = decodedToken?.role || []; 

          this.setToken(token);
    
          if (userRoles.includes('ROLE_ADMIN')) {

            Router.push('/dashboard');
            
          } else {
            Router.push('/'); 
          }
        }

      } catch (error: any) {
        throw error.response?.data?.message || 'Login failed';
      }
    },

    async register(userData: UserData) {
      try {
        const response = await axios.post('/auth/register', userData);
        if (response.status === 201) {
          Router.push('/login'); // Redirect to login page after registration
        }
      } catch (error: any) {
        throw error.response?.data?.message || 'Registration failed';
      }
    },

    async refreshToken() {
      try {

        const response = await axios.post('/auth/refresh-token', {
          refreshToken: this.refreshToken, // Send refresh token to the backend
        });

        const { token, refreshToken } = response?.data?.data;

        this.setToken(token);
        this.setRefreshToken(refreshToken); // Update refresh token

        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`; // Update auth header

        return token; // Return the new token

      } catch (error:any) {
        this.clearToken(); 
        Router.push('/login'); // Redirect to login page
        throw error.response?.data?.message || 'Token refresh failed';
      }
    },

    logout() {
      this.clearToken();
      Router.push('/'); // Redirect to login page
    },
  },
});
