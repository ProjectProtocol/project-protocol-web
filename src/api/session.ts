import apiClient from './client'

export async function reauthenticate() {
  const result = await apiClient
    .get('/auth/reauthenticate')
    .then((r) => r.data)
    .catch(() => false)

  return result
}

export async function create(email: string, password: string) {
  const { data } = await apiClient.post('/auth/sign_in', {
    email,
    password,
  })
  return data
}

export async function destroy() {
  const res = await apiClient.delete('/auth/sign_out')
  return res
}
