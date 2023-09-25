import { createRouter, createWebHashHistory } from 'vue-router'
import Home from './views/Home.vue'
import URLtoPDF from './views/URLtoPDF.vue'
import FILEtoPDF from './views/FILEtoPDF.vue'
import HTMLtoPDF from './views/HTMLtoPDF.vue'
import MakePDFSearchable from './views/MakePDFSearchable.vue'

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
    path: '/FiletoPDF',
    name: 'FiletoPDF',
    component: FILEtoPDF
  },
  {
    path: '/HTMLtoPDF',
    name: 'HTMLtoPDF',
    component: HTMLtoPDF
  },
  {
    path: '/MakePDFSearchable',
    name: 'MakePDFSearchable',
    component: MakePDFSearchable
  }
]
const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router