import { createRouter, createWebHistory } from "vue-router"
import HomepageView from "../views/HomepageView.vue"
import PrivacyPageView from "../views/PrivacyPageView.vue"
import AboutPageView from "../views/AboutPageView.vue"
import ProductPageView from "../views/ProductPageView.vue"
import ProductDetails from "../views/ProductDetailsView.vue"

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
      component: ProductPageView
      
    },
    {
      path: '/product/:id',
      name: 'productDetails',
      component: ProductDetails

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