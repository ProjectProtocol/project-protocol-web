import apiClient from './client'

export async function update(
  password: string,
  newPassword: string,
  newPasswordConfirm: string,
) {
  const result = await apiClient
    .patch('/profile', {
      password,
      newPassword,
      newPasswordConfirm,
    })
    .then((r) => 400 > r.status && r.status >= 200)
    .catch(() => false)

  return result
}
