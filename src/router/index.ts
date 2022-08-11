import {createRouter, createWebHistory, RouteRecordRaw} from 'vue-router'
import nProgress from '../plugins/nProgress'

const routes: Array<RouteRecordRaw> = []

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    nProgress.start()
    next()
})

router.afterEach(() => {
    nProgress.done()
})

export default router