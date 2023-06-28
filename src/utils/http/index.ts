import axios from 'axios'
import type {
    AxiosInstance,
    AxiosError,
    AxiosRequestConfig,
    AxiosResponse,
} from 'axios'
import {showToast} from 'vant';
import {ResultData} from "@/utils/http/type.ts";

export const service: AxiosInstance = axios.create({
    // 判断环境设置不同的baseURL
    baseURL:
        import.meta.env.VITE_APP_NODE_ENV === 'development'
            ? import.meta.env.VITE_APP_BASE_API
            : import.meta.env.VITE_APP_BASE_URL,
    timeout: 25000,
})
/**
 * @description: 请求拦截器
 * @returns {*}
 */
service.interceptors.request.use(
    (config) => {
        // 生成不重复的随机用户假Id，存储到localStorage中
        let token = localStorage.getItem('token')
        if (!token) {
            localStorage.setItem('token', Math.random().toString(36).substr(2) + Math.random().toString(36).substr(2))
            token = localStorage.getItem('token')
        }
        if (token) {
            config.headers.token = token
        }
        return config
    },
    (error: AxiosError) => {
        showToast(error.message)
        return Promise.reject(error)
    },
)
/**
 * @description: 响应拦截器
 * @returns {*}
 */
service.interceptors.response.use(
    (response: AxiosResponse) => {
        const {data} = response
        return data
    },
    (error: AxiosError) => {
        showToast('请求失败')
        return Promise.reject(error)
    },
)

/**
 * @description: 导出封装的请求方法
 * @returns {*}
 */
const http = {
    get<T>(
        url: string,
        params?: object,
        config?: AxiosRequestConfig,
    ): Promise<ResultData<T>> {
        return service.get(url, {params, ...config})
    },

    post<T>(
        url: string,
        data?: object,
        config?: AxiosRequestConfig,
    ): Promise<ResultData<T>> {
        return service.post(url, data, config)
    },

    put<T>(
        url: string,
        data?: object,
        config?: AxiosRequestConfig,
    ): Promise<ResultData<T>> {
        return service.put(url, data, config)
    },

    delete<T>(
        url: string,
        data?: object,
        config?: AxiosRequestConfig,
    ): Promise<ResultData<T>> {
        return service.delete(url, {data, ...config})
    },
}

export default http
