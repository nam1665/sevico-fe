export interface User {
  id: string
  email: string
  name: string
}

export interface AuthTokens {
  token: string
  user: User
}

export interface LoginRequest {
  email: string
  password: string
}

export interface SignupRequest {
  email: string
  password: string
  name: string
}

export interface ApiError {
  error: string
  message?: string
}
