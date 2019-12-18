import axios from 'axios'
import { Loading, Message } from 'element-ui'

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


axios.interceptors.request.use(config => {
  startLoading()
  return config
}), error => {
  return Promise.reject(error)
}

axios.interceptors.response.use(reponse => {
  endLoading()
  return reponse
}), error => {
  Message.error(error,reponse.data)
  return Promise.reject(error)
}


const http = axios.create({
  baseURL: 'http://localhost:3000/admin/api'
})



export default http