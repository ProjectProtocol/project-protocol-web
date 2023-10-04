import apiClient from './client'

export async function create({ email }: { email: string }) {
  const result = await apiClient
    .post('/auth/password_resets', { email })
    .then((r) => r.data)
    .catch(() => false)

  return result
}
