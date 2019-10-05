import Vue from 'vue';
import Router, { Route } from 'vue-router';
import * as Storage from './scripts/storage';

Vue.use(Router);

const router: Router = new Router({
    mode: 'history',
    base: '/',
    routes: [
        {
            path: '/',
            name: 'Home',
            component: () => import('./views/Home.vue'),
            meta: { requireAuth: true }
        },
        {
            path: '/login',
            name: 'Login',
            component: () => import('./views/Login.vue'),
            beforeEnter: denyAuth
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

// router.beforeEach((to, from, next) => {
//     console.log('Router to', to);
//     console.log('Router from', from);
//     next();
// });

router.beforeEach(async (to, from, next) => {
    if (to.matched.some((record) => record.meta.requireAuth)) {
        if (!await Storage.isAuthentificated()) {
            next({
                name: "Login"
            });
        } else {
            next();
        }
    } else {
        next();
    }
});

async function denyAuth(to: Route, from: Route, next: any) {
    if (await Storage.isAuthentificated()) {
        next({
            name: from.name ? from.name : "Home"
        });
    } else {
        next();
    }
}

export default router;