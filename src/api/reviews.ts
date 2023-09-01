import apiClient from './client'

export function list(agentId: string) {
  return apiClient
    .get(`agents/${agentId}/reviews`)
    .then((r) => r.data)
    .catch(() => false)
}
