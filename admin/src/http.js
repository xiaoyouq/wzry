import axios from 'axios'
import { Loading, Message } from 'element-ui'
import Vue from 'vue'
import route from '../src/router/index'

let loading;
function startLoading() {
  loading = Loading.service({
    lock: true,
    text: '拼命加载中...',
    background: 'ragb(0,0,0,0,7)'
  })
}

function endLoading() {
  loading.close();
}

const http = axios.create({
  baseURL: 'http://localhost:3000/admin/api'
})


// 请求拦截
http.interceptors.request.use(config => {
  if (localStorage.token) {
    config.headers.Authorization = 'Bearer ' + localStorage.token
  }
  return config
}, error => {
  return error
})


// 相应拦截
http.interceptors.response.use(res => {
  return res;
}, error => {
  // response代表的相应的返回 
  if (error.response.status == '401'){
      route.push({path:'/login'})
  }
    if (error.response.data.message) {
      Vue.prototype.$message({
        type: "error",
        message: error.response.data.message
      })
    }
  return Promise.reject(error);
});

export default http