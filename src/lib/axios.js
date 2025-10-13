import axios from 'axios'

import { STORAGE_KEY_ACCESS_TOKEN } from '@/constants/local-storage'

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
})
