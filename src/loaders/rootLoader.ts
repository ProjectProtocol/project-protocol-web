import User from "../types/User"

export interface RootState {
  user?: User
}

export async function rootLoader(): Promise<RootState> {
  return { user: { email: "jerpderp@werp.com" } }
}
