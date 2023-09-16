import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/create',
      name: 'createNewListing',
      component: () => import('../views/ListingView.vue')
    },
    {
      path: '/houses/:id',
      name: 'houseDetails',
      component: () => import('../views/HouseDetailsView.vue')
    },
    {
      path: '/edit/:id',
      name: 'houseEdit',
      component: () => import('../views/ListingView.vue')
    }
  ]
})

export default router
