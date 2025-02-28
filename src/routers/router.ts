import { createRouter, createWebHistory } from "vue-router"
import HomepageView from "../views/HomepageView.vue"
import PrivacyPageView from "../views/PrivacyPageView.vue"
import AboutPageView from "../views/AboutPageView.vue"
import ProductPageView from "../views/ProductPageView.vue"
import ProductDetails from "../views/ProductDetailsView.vue"
import CheckoutPageView from "../views/CheckoutPageView.vue"
import ProductCategory from "../views/ProductCategoryPageView.vue"
import LoginPageView from "../views/LoginPageView.vue"
import RegisterPageView from "../views/RegisterPageView.vue"
import DashboardPageView from "../views/DashboardView.vue"
import DashboardProductCategoryView from "../views/DashboardProductCategoryView.vue"
import { useAuthStore } from "../stores/Auth/authStore"
import NotFound from "../views/NotFoundViewPage.vue"


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
      path: '/product/:uuid',
      name: 'productDetails',
      component: ProductDetails

    },
    {
      path: '/product/category/:category',
      name: 'productCategory',
      component: ProductCategory
    },
    {
      path: '/about',
      name: 'about',
      component: AboutPageView
    },
    {
      path: '/checkout',
      name: 'checkout',
      component:CheckoutPageView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginPageView
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterPageView
    },
    {
      path: "/dashboard",
      name: "dashboard",
      component: DashboardPageView,
      meta: { requiresAuth: true },
    },
    {
      path: "/dashboard/category",
      name: "dashboardCategory",
      component: DashboardProductCategoryView,
      meta: { requiresAuth: true },
    },
    {
      path:'/:pathMatch(.*)*',
      name: 'not-found',
      component: NotFound
    }
  ]

const Router = createRouter ({
    history: createWebHistory(),
    routes
})
  
  Router.beforeEach((to:any) => {

    const store = useAuthStore();

    if (to.meta.requiresAuth && !store.isAuthenticated) {
      return ('/login'); // Redirect to login if not authenticated
    } 
  });


export default Router;