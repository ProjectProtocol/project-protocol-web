import { ResourceTag } from 'src/types/Resource'
import apiClient from './client'

interface IResourceListParams {
  search?: string
  page?: number
  location?: string
  distance?: string
  tags?: ResourceTag[]
}

export interface IResourceCommentParams {
  body: string
}

export async function list(params: IResourceListParams) {
  const result = await apiClient
    .get(`resources`, { params })
    .then((r) => r.data)
    .catch(() => false)

  return result
}

export async function like(id: number) {
  const result = await apiClient
    .post(`resources/${id}/like`)
    .then((r) => r.data)
    .catch(() => false)

  return result
}

export async function dislike(id: number) {
  const result = await apiClient
    .post(`resources/${id}/dislike`)
    .then((r) => r.data)
    .catch(() => false)

  return result
}

export async function get(id: string) {
  const result = await apiClient
    .get(`resources/${id}`)
    .then((r) => r.data.resource)
    .catch(() => false)

  return result
}

export async function createComment(
  resourceId: number,
  params: IResourceCommentParams,
) {
  const result = await apiClient
    .post(`resources/${resourceId}/comments`, params)
    .then((r) => r.data)
    .catch(() => false)

  return result
}
