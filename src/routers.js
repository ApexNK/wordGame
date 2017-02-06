import Home from 'VIEWS/home.vue';
import Stage from 'VIEWS/Stage.vue'
const routes = [
  {
    path: '/stage/:level',
    name: 'stage',
    component: Stage
  },
  {
    path: '/',
    name: 'home',
    component: Home
  }
]

export default routes
