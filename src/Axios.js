import axios from 'axios'


const cors = require('cors');
const express = require('express')
const app = express()
app.use(cors())
// axios.interceptors.request.use(
//     config => {
//     //   const token = localStorageService.getAccessToken()
//     //   if (token) {
//     //     config.headers['Authorization'] = 'Bearer ' + token
//     //   }
//       // config.headers['Content-Type'] = 'application/json';
//       config.headers['Access-Control-Allow-Origin'] = "true"
//       return config
//     },
//     error => {
//       Promise.reject(error)
//     }
//   )