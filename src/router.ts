import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes = [
  { name: 'index', path: '/', component: () => import('./views/index/index') },
  { name: 'converter', path: '/converter', component: () => import('./views/converter/index') },
  { path: '/:pathMatch(.*)*', redirect: '/' }
] as RouteRecordRaw[]

export const Router = createRouter({
  history: createWebHistory(),
  routes
})
