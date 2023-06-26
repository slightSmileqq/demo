import { RouteRecordRaw } from 'vue-router'
export const staticRoutes: RouteRecordRaw[] = [
    {
        path: '/luckyMoneyOne',
        name: 'luckyMoneyOne',
        component: () => import('@/views/luckyMoneyOne/luckyMoneyOne.vue'),
        meta: {
            title: 'luckyMoneyOne',
        },
    },
    {
        path: '/luckyMoneyTwo',
        name: 'luckyMoneyTwo',
        component: () => import('@/views/luckyMoneyTwo/luckyMoneyTwo.vue'),
        meta: {
            title: 'luckyMoneyTwo',
        },
    },
    {
        path: '/',
        name: 'home',
        component: () => import('@/views/home/home.vue'),
        meta: {
            title: '首页',
        },
    },

]
