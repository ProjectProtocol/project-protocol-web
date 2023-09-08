import axios from 'axios'
import { snakeCase } from 'lodash'
import transformKeys from 'src/util/transformKeys'

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  responseType: 'json',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  transformRequest: (data) => transformKeys(data, snakeCase),
})

export default apiClient
