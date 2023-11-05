import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        title: 'Home'
      }
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
      meta: {
        title: 'About'
      }
    },
    {
      path: '/create',
      name: 'createNewListing',
      component: () => import('../views/ListingView.vue'),
      meta: {
        title: 'Create House'
      }
    },
    {
      path: '/houses/:id',
      name: 'houseDetails',
      component: () => import('../views/HouseDetailsView.vue'),
      meta: {
        title: 'House Details'
      }
    },
    {
      path: '/edit/:id',
      name: 'houseEdit',
      component: () => import('../views/ListingView.vue'),
      meta: {
        title: 'Edit House'
      }
    }
  ]
})

export default router
