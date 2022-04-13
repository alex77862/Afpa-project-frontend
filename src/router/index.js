import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Product from '../views/Product.vue'
import Admin from '../views/Admin.vue'
import Login from '../views/Login.vue'
import Contact from '../views/Contact.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/product',
    name: 'Product',
    component: Product
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/contact',
    name: 'Contact',
    component: Contact
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
