import apiClient from './client'
import { SearchData } from './search'

export function get(id: string) {
  return apiClient
    .get(`offices/${id}`)
    .then((r) => r.data.office)
    .catch(() => false)
}

interface IOfficeList {
  search?: string
  page?: number
}

export function list(params: IOfficeList = {}): Promise<SearchData> {
  return apiClient.get('offices', { params }).then((r) => r.data as SearchData)
}
