import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import Router from './routers/router';
import { createPinia } from 'pinia';
import VueCookies  from 'vue-cookies';

const pinia = createPinia();
const app = createApp(App);

app.use(Router);

app.use(pinia);

app.use(VueCookies);

app.mount('#app');

