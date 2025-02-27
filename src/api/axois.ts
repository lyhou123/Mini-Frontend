
import axios from 'axios';
import Router from '../routers/router';
import { useAuthStore } from '../stores/Auth/authStore';


const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, 
});

// Add a request interceptor to include the token
api.interceptors.request.use((config) => {

  const authStore = useAuthStore();
  
  const token = authStore.token;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// // Add a response interceptor to handle 401 errors
// api.interceptors.response.use((response) => response, (error) => {

//   if (error.response.status === 401) {

//     const authStore = useAuthStore();

//     authStore.logout(); // Clear token and user data
    
//     Router.push('/login'); // Redirect to login page
//   }
//   return Promise.reject(error);
// });


api.interceptors.response.use((response) => response, async (error) => {

    const originalRequest = error.config;

    const authStore = useAuthStore();

    // Check if the error is due to a 401 Unauthorized response
    if (error.response.status === 401 && !originalRequest._retry) {

      originalRequest._retry = true; 

      try {

        const newToken = await authStore.refreshToken(); // Refresh the token

        originalRequest.headers.Authorization = `Bearer ${newToken}`;

        return api(originalRequest); 

      } catch (refreshError) {
        authStore.logout(); 
        Router.push('/login'); 
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;