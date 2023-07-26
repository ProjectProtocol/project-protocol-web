import { reauthenticate } from "../api/session"
import User from "../types/User"

export interface RootState {
  user?: User
}

/**
 * Reauth as a check for current user
 */
export async function rootLoader(): Promise<RootState> {
  const res = await reauthenticate()
  return { user: res?.data?.user }
}
