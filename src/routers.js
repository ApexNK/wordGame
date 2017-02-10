import Home from 'VIEWS/home.vue';
import Stage from 'VIEWS/Stage.vue';
import FinishPage from 'VIEWS/Finish.vue';

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
    path: '/finish/:level/name/:modelname/curstate/:state',
    name: 'finish',
    component: FinishPage
  },
  {
    path: '/',
    name: 'home',
    component: Home
  }
]

export default routes
