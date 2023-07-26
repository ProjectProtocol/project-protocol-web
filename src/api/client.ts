import axios from "axios"

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  responseType: "json",
  withCredentials: true,
})

export default apiClient
