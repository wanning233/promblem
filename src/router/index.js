import { createRouter, createWebHashHistory } from 'vue-router';

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/home',
      name: 'home',
      component: () => import('../views/test.vue')
    },
    {
      path: '/first',
      name: 'first',
      component: () => import('../views/first/index.vue')
    },
    {
      path: '/second',
      name: 'second',
      component: () => import('../views/second/index.vue')
    }
  ]
});

export default router;