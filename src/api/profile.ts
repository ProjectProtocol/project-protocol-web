import apiClient from './client'

export async function update(newPassword: string, newPasswordConfirm: string) {
  const result = await apiClient
    .patch('/profile', {
      newPassword,
      newPasswordConfirm,
    })
    .then((r) => r.data)
    .catch(() => false)

  return result
}
