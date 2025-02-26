import { createRouter, createWebHistory } from "vue-router"
import HompageView from "../views/HompageView.vue"
import PrivacyPageView from "../views/PrivacyPageView.vue"
import AboutPageView from "../views/AboutPageView.vue"

const routes = [
    {
      path: '/',
      name: 'home',
      component: HompageView
    },
    {
      path: '/privacy',
      name: 'privacy',
      component: PrivacyPageView
    },
    {
      path: '/about',
      name: 'about',
      component: AboutPageView
    }
  ]
  

const Router = createRouter ({
    history: createWebHistory(),
    routes,
})


export default Router;