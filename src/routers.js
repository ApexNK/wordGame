import Home from 'VIEWS/home.vue';
import Stage from 'VIEWS/Stage.vue'
const routes = [
  {
    path: '/normalModel/:level',
    name: 'normalModel',
    component: Stage
  },
  {
    path: '/strangeModel/:level',
    name: 'strangeModel',
    component: Stage
  },
  {
    path: '/',
    name: 'home',
    component: Home
  }
]

export default routes
