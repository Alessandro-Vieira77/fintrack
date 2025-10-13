import axios from 'axios'

import { STORAGE_KEY_ACCESS_TOKEN, STORAGE_KEY_REFRESH_TOKEN } from '@/constants/local-storage'

export const publicApi = axios.create({
  baseURL: 'https://fullstackclub-finance-dashboard-api.onrender.com/api',
})

export const protecdedApi = axios.create({
  baseURL: 'https://fullstackclub-finance-dashboard-api.onrender.com/api',
})

protecdedApi.interceptors.request.use(request => {
  const accessToken = localStorage.getItem(STORAGE_KEY_ACCESS_TOKEN)
  if (!accessToken) {
    return request
  }

  request.headers.Authorization = `Bearer ${accessToken} `
  return request
})

protecdedApi.interceptors.response.use(
  response => response,
  async error => {
    console.log(error)
    const originalRequest = error.config
    const refreshToken = localStorage.getItem(STORAGE_KEY_REFRESH_TOKEN)
    if (!refreshToken) {
      return Promise.reject(error)
    }

    if (
      error.response.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url.includes('/users/refresh-token')
    ) {
      originalRequest._retry = true
      try {
        const response = await publicApi.post('/users/refresh-token', {
          refreshToken,
        })

        const newAccessToken = response.data.accessToken
        const newRefreshToken = response.data.refreshToken
        localStorage.setItem(STORAGE_KEY_ACCESS_TOKEN, newAccessToken)
        localStorage.setItem(STORAGE_KEY_REFRESH_TOKEN, newRefreshToken)

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`
        return protecdedApi(originalRequest)
      } catch (refreshError) {
        console.log(refreshError)
        localStorage.removeItem(STORAGE_KEY_ACCESS_TOKEN)
        localStorage.removeItem(STORAGE_KEY_REFRESH_TOKEN)
      }
    }
    return Promise.reject(error)
  },
)
