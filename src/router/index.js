import { createRouter,createWebHistory } from "vue-router";
import HomeView from '@/views/HomeView.vue'
import JobsView from '@/views/JobsView.vue'
import NotFound from '@/views/NotFound.vue'
import JobDetailsView from '@/views/JobDetailsView.vue'
import AddJobView from '@/views/AddJobView.vue'
import EditJobView from '@/views/EditJobView.vue'

const router = createRouter({
  history: createWebHistory( import.meta.env.BASE_URL),
  routes:[
    {
      path: '/', name: 'home' , component: HomeView
    },
    {
      path: '/jobs', name: 'jobs' , component: JobsView
    },
    {
      path: '/jobs/:id', name: 'jobDetails' , component: JobDetailsView
    },
    {
      path: '/jobs/add', name: 'AddJobView' , component: AddJobView
    },
    {
      path: '/jobs/edit/:id', name: 'EditJobView' , component: EditJobView
    },
    {
      path: '/:catchAll(.*)', name: 'NotFound' , component: NotFound
    },
  ]

});
export default router;