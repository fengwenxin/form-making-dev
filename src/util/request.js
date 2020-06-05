import axios from 'axios'

const request = axios.create({
  withCredentials: false
})

request.interceptors.request.use(
  config => {
    return config
  },
  error => {
    console.log('error', error)
    return Promise.reject(new Error(error).message)
  }
)

request.interceptors.response.use(
  response => {
<<<<<<< HEAD
=======
    console.log('.....', response)
>>>>>>> 65e2240164023ddc2fda7c53f97948ab8e096da8
    return response.data
  },
  error => {
    console.log('error', error)
    return Promise.reject(new Error(error).message)
  }
)

export default request
