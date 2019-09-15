import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';

Vue.use(Router);

const router: Router = new Router({
    mode: 'history',
    base: '/',
    routes: [
        {
            path: '/',
            name: 'Home',
            component: () => import('./views/Home.vue')
        },
        {
            path: '/login',
            name: 'Login',
            component: () => import('./views/Login.vue')
        },
        {
            path: '/popup.html',
            name: 'Chrome extension root',
            redirect: { name: 'Home' }
        },
        {
            path: '*',
            name: 'NotFound',
            component: () => import('./views/NotFound.vue')
        }
    ]
});

router.beforeEach((to, from, next) => {
    console.log('Router to', to);
    console.log('Router from', from);
    next();
});

export default router;