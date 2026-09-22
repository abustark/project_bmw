import { createRouter, createWebHistory } from 'vue-router'

const Home = () => import('../views/HomeView.vue')
const Shop = () => import('../views/ShopView.vue')
const Product = () => import('../views/ProductView.vue')
const Cart = () => import('../views/CartView.vue')
const Checkout = () => import('../views/CheckoutView.vue')
const Wishlist = () => import('../views/WishlistView.vue')
const About = () => import('../views/AboutView.vue')
const Dashboard = () => import('../views/DashboardView.vue')

const routes = [
  { path: '/', name: 'home', component: Home },
  { path: '/shop', name: 'shop', component: Shop },
  { path: '/product/:id', name: 'product', component: Product, props: true },
  { path: '/cart', name: 'cart', component: Cart },
  { path: '/checkout', name: 'checkout', component: Checkout },
  { path: '/wishlist', name: 'wishlist', component: Wishlist },
  { path: '/about', name: 'about', component: About },
  { path: '/dashboard', name: 'dashboard', component: Dashboard },
  { path: '/:pathMatch(.*)*', redirect: '/' },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(){ return { top: 0 } }
})

export default router
