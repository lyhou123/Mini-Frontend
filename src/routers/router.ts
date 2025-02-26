import { createRouter, createWebHistory } from "vue-router"
import HomepageView from "../views/HomepageView.vue"
import PrivacyPageView from "../views/PrivacyPageView.vue"
import AboutPageView from "../views/AboutPageView.vue"

const routes = [
    {
      path: '/',
      name: 'home',
      component: HomepageView
    },
    {
      path: '/privacy',
      name: 'privacy',
      component: PrivacyPageView
    },
    {
      path: '/product',
      name: 'product',
      component:{
        template: '<div>Product Page</div>'
      }
      
    },
    {
      path: '/product/:uuid',
      name: 'product',
      component:{
        template: '<div>Product Page</div>'
      }

    },
    {
      path: '/about',
      name: 'about',
      component: AboutPageView
    }
  ]
  

const Router = createRouter ({
    history: createWebHistory(),
    routes
})


export default Router;