import { ResourceTag } from 'src/types/Resource'
import apiClient from './client'

interface IResourceListParams {
  search?: string
  page?: number
  location?: string
  distance?: string
  tags?: ResourceTag[]
}

export async function list(params: IResourceListParams) {
  const result = await apiClient
    .get(`resources`, { params })
    .then((r) => r.data)
    .catch(() => false)

  return result
}
