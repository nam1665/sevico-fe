import { buildApiUrl, API_ENDPOINTS } from './constants'
import type { UserProfile } from '@/types/api'

// Token management
export const getAccessToken = (): string | null => {
  if (typeof window === 'undefined') return null
  return localStorage.getItem('access_token')
}

export const setAccessToken = (token: string): void => {
  localStorage.setItem('access_token', token)
}

export const removeAccessToken = (): void => {
  localStorage.removeItem('access_token')
  localStorage.removeItem('token_type')
  localStorage.removeItem('user_email')
}

export const getTokenType = (): string => {
  return localStorage.getItem('token_type') || 'bearer'
}

// Validate token and get user profile
export const validateToken = async (): Promise<UserProfile | null> => {
  const token = getAccessToken()
  
  if (!token) {
    return null
  }

  try {
    const response = await fetch(buildApiUrl(API_ENDPOINTS.auth.me), {
      method: 'GET',
      headers: {
        'token': token,
      },
    })

    if (!response.ok) {
      // Token is invalid, remove it
      removeAccessToken()
      return null
    }

    const data = await response.json()
    return data as UserProfile
  } catch (error) {
    console.error('Token validation failed:', error)
    removeAccessToken()
    return null
  }
}

// Check if user is authenticated
export const isAuthenticated = (): boolean => {
  return getAccessToken() !== null
}

// Create authenticated fetch wrapper
export const authenticatedFetch = async (url: string, options: RequestInit = {}): Promise<Response> => {
  const token = getAccessToken()
  
  if (!token) {
    throw new Error('Not authenticated')
  }

  const headers = {
    ...options.headers,
    'token': token,
  }

  return fetch(url, {
    ...options,
    headers,
  })
}
