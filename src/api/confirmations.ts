import apiClient from './client'

// Create a new user (register)
export async function create({ token }: { token?: string }): Promise<boolean> {
  const result = await apiClient
    .post('/auth/confirmations', { token })
    .then((r) => 400 > r.status && r.status >= 200)
    .catch(() => false)

  return result
}
