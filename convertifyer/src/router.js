import { createRouter, createWebHashHistory } from 'vue-router'
import Home from './views/Home.vue'
import URLtoPDF from './views/URLtoPDF.vue'
import IMGtoPDF from './views/IMGtoPDF.vue'
import HTMLtoPDF from './views/HTMLtoPDF.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/URLtoPDF',
    name: 'URLtoPDF',
    component: URLtoPDF
  },
  {
    path: '/IMGtoPDF',
    name: 'IMGtoPDF',
    component: IMGtoPDF
  },
  {
    path: '/HTMLtoPDF',
    name: 'HTMLtoPDF',
    component: HTMLtoPDF
  }
]
const router = createRouter({
  history: createWebHashHistory(),
  routes,
});


export default router