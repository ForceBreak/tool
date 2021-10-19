import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import store from '../store/index.js'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/search',
    name: 'Search',
    component: () => import(/* webpackChunkName: "about" */ '../views/search/Search.vue')
  },
  {
    path: '/discovery',
    name: 'Discovery',
    component: () => import(/* webpackChunkName: "about" */ '../views/Discovery.vue')
  },
  {
    path: '/buckets',
    name: 'Buckets',
    component: () => import(/* webpackChunkName: "about" */ '../views/Buckets.vue')
  },
  {
    path: '/buckets/channels/yt/:id',
    name: 'Buckets-Channels',
    component: () => import('../views/buckets/Channels.vue')
  },
  {
    path: '/buckets/videos/yt/:id',
    name: 'Buckets-Videos',
    component: () => import('../views/buckets/Videos.vue')
  },
  {
    path: '/track',
    name: 'Track',
    component: () => import(/* webpackChunkName: "about" */ '../views/Track.vue')
  },
  {
    path: '/trends',
    name: 'Trends',
    component: () => import(/* webpackChunkName: "about" */ '../views/Trends.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.afterEach((to) => {
  store.dispatch('track', to);
})

export default router
