import apiClient from "./client"

export async function getAgent(id: string) {
  const result = await apiClient
    .get(`agents/${id}`)
    .then((r) => r.data)
    .catch(() => false)

  return result && result.agent
}

export async function getAgentReviews(id: string) {
  const result = await apiClient
    .get(`agents/${id}/reviews`)
    .then((r) => r.data)
    .catch(() => false)

  return result
}
