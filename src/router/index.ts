import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import HomeView from '../views/Home.vue';
import store from '@/store';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/common/Login.vue')
  },
  {
    path: '/deal',
    name: 'deal',
    component: () => import('@/views/Deal.vue')
  },
  {
    path: '/flex',
    name: 'flex',
    component: () => import('@/views/Flex.vue')
  },
  {
    path: '/refuse',
    name: 'refuse',
    component: () => import('@/views/Refuse.vue')
  },
  {
    path: '/sort',
    name: 'sort',
    component: () => import('@/views/Sort.vue')
  },
  {
    path: '/source',
    name: 'source',
    component: () => import('@/views/Source.vue')
  },
  {
    path: '/:catchAll(.*)',
    name: '404',
    component: () => import('@/common/404.vue')
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

router.beforeEach((to, from, next) => {
  // to and from are both route objects. must call `next`.
  const { token } = store.getters;
  console.log(token, 'token');
  if (to.path === '/login') {
    next();
  } else {
    if (!token) {
      next({ path: '/login' });
    } else {
      next();
    }
  }
});

export default router;
