import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AccountView from '../components/partials/account/AccountView.vue'
import UploadView from '../components/partials/upload/UploadView.vue'
import OrientationView from '../components/partials/orientation/OrientationView.vue'
import SummaryView from '../components/partials/summary/SummaryView.vue'
import ChooseTrainingView from '../components/partials/summary/ChooseTrainingView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
    },
    {
        path: '/account',
        name: 'account',
        component: AccountView
    },
    {
        path: '/upload',
        name: 'upload',
        component: UploadView
    },
    {
        path: '/orientation',
        name: 'orientation',
        component: OrientationView
    },
    {
        path: '/summary/:id',
        name: 'summary',
        component: SummaryView
    },
    {
        path: '/choose',
        name: 'choose',
        component: ChooseTrainingView
    }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
