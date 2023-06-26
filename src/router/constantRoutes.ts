import { RouteRecordRaw } from 'vue-router'
export const staticRoutes: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'home',
        component: () => import('@/views/home/home.vue'),
        meta: {
            title: '首页',
            icon: 'HomeFilled',
        },
    },
]
