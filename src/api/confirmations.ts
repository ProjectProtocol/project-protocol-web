import apiClient from './client'

// Create a new user (register)
export async function create({ token }: { token: string }) {
  const result = await apiClient
    .post('/auth/confirmations', { token })
    .then((r) => r.data)
    .catch(() => false)

  return result
}
