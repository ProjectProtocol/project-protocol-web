import apiClient from './client'

export async function get(id: string) {
  const result = await apiClient
    .get(`agents/${id}`)
    .then((r) => r.data)
    .catch(() => false)

  return result && result.agent
}

export async function list(officeId: string) {
  return await apiClient
    .get(`/offices/${officeId}/agents`)
    .then((r) => r.data.data)
    .catch(() => false)
}

export async function create(agent: {
  firstName?: string
  lastName: string
  officeId: number
}) {
  return await apiClient
    .post('/agents', { agent })
    .then((r) => r.data)
    .catch(() => false)
}
