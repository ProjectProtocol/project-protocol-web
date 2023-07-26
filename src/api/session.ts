import apiClient from "./client"

export async function reauthenticate() {
  const res = await apiClient.get("/auth/reauthenticate").catch((e) => e)
  return res
}

export async function login(email: string, password: string) {
  const res = await apiClient.post("/auth/sign_in", { email, password })
  console.log(res)
}
