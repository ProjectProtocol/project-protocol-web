import apiClient from './client'

export function get(id: string) {
  return apiClient
    .get(`offices/${id}`)
    .then((r) => r.data.office)
    .catch(() => false)
}
