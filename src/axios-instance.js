import axios from 'axios'

axios.defaults.timeout = 5000
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'
axios.defaults.baseURL = 'https://www.group-je.com/api'

// POST传参序列化(添加请求拦截器)
axios.interceptors.request.use((config) => {
    // 在发送请求之前做某件事
    return config
}, (error) => {
    console.log('错误的传参')
    return Promise.reject(error)
})

// 返回状态判断(添加响应拦截器)
axios.interceptors.response.use((res) => {
    // 对响应数据做些事
    if (!res.data.success) {
        return Promise.resolve(res)
    }
    return res
}, (error) => {
    console.log('网络异常', error)
    return Promise.reject(error)
})

// 返回一个Promise(发送post请求)
export function fetchPost (url, params) {
    return new Promise((resolve, reject) => {
        axios.post(url, params)
            .then(response => {
                resolve(response)
            }, err => {
                reject(err)
            })
            .catch((error) => {
                reject(error)
            })
    })
}
// 返回一个Promise(发送get请求)
export function fetchGet (url, param) {
    return new Promise((resolve, reject) => {
        axios.get(url, {params: param})
            .then(response => {
                resolve(response)
            }, err => {
                reject(err)
            })
            .catch((error) => {
                reject(error)
            })
    })
}
export default {
    fetchPost,
    fetchGet
}
