import User from "../../types/User"

export interface AuthState {
  user?: User
}

export type Action = {
  type: "SET_USER"
  data?: User
}

export type Dispatch = (action: Action) => void
