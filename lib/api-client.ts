/**
 * API Client Utilities
 * 
 * This file provides helper functions for making API requests
 * with authentication and error handling.
 * 
 * TO REPLACE WITH REAL BACKEND:
 * 1. Update NEXT_PUBLIC_API_URL in .env to your backend URL
 * 2. Replace mock API routes in app/api/* with real endpoints
 * 3. Update error handling to match your backend's error format
 * 4. Add request/response interceptors if needed
 */

import { getAuthToken } from './auth'

export class ApiError extends Error {
  constructor(
    public status: number,
    message: string
  ) {
    super(message)
    this.name = 'ApiError'
  }
}

interface RequestOptions extends RequestInit {
  requireAuth?: boolean
}

/**
 * Make an authenticated API request
 */
export async function apiRequest<T>(
  endpoint: string,
  options: RequestOptions = {}
): Promise<T> {
  const { requireAuth = false, headers = {}, ...fetchOptions } = options

  const url = endpoint.startsWith('http')
    ? endpoint
    : `${process.env.NEXT_PUBLIC_API_URL || ''}${endpoint}`

  const requestHeaders: HeadersInit = {
    'Content-Type': 'application/json',
    ...headers,
  }

  // Add auth token if required
  if (requireAuth) {
    const token = getAuthToken()
    if (token) {
      requestHeaders['Authorization'] = `Bearer ${token}`
    }
  }

  const response = await fetch(url, {
    ...fetchOptions,
    headers: requestHeaders,
  })

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Request failed' }))
    throw new ApiError(response.status, error.message || `HTTP ${response.status}`)
  }

  return response.json()
}

/**
 * Helper for GET requests
 */
export function apiGet<T>(endpoint: string, requireAuth = false): Promise<T> {
  return apiRequest<T>(endpoint, { method: 'GET', requireAuth })
}

/**
 * Helper for POST requests
 */
export function apiPost<T>(endpoint: string, data: unknown, requireAuth = false): Promise<T> {
  return apiRequest<T>(endpoint, {
    method: 'POST',
    body: JSON.stringify(data),
    requireAuth,
  })
}

/**
 * Helper for PUT requests
 */
export function apiPut<T>(endpoint: string, data: unknown, requireAuth = false): Promise<T> {
  return apiRequest<T>(endpoint, {
    method: 'PUT',
    body: JSON.stringify(data),
    requireAuth,
  })
}

/**
 * Helper for DELETE requests
 */
export function apiDelete<T>(endpoint: string, requireAuth = false): Promise<T> {
  return apiRequest<T>(endpoint, { method: 'DELETE', requireAuth })
}
