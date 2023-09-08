import axios, { AxiosRequestTransformer } from 'axios'

const snakeCaseParams: AxiosRequestTransformer = (data) => {
  const snakeParams = data

  return snakeParams
}

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  responseType: 'json',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  transformRequest: snakeCaseParams,
})

export default apiClient
