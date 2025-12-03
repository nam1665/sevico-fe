'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie'
import type { User, AuthTokens, LoginRequest, SignupRequest } from '@/types/auth'

/**
 * Auth Context and Hook
 * 
 * IMPORTANT: Token Storage Options
 * 
 * Currently using: localStorage (easy to implement, works client-side)
 * 
 * TRADE-OFFS:
 * 1. localStorage:
 *    ✓ Simple to implement
 *    ✓ Persists across sessions
 *    ✗ Vulnerable to XSS attacks
 *    ✗ Accessible via JavaScript
 * 
 * 2. HttpOnly Cookies (RECOMMENDED for production):
 *    ✓ Not accessible via JavaScript (XSS protection)
 *    ✓ Can be secured with SameSite, Secure flags
 *    ✓ Automatically sent with requests
 *    ✗ Requires server-side session management
 *    ✗ Slightly more complex to implement
 * 
 * TO SWITCH TO HTTPONLY COOKIES:
 * - Remove localStorage usage
 * - Set cookies from API routes using response.setHeader()
 * - Use middleware.ts to validate tokens on server
 * - Use server actions or API routes to handle auth state
 * 
 * Example middleware:
 * ```typescript
 * import { NextResponse } from 'next/server'
 * import type { NextRequest } from 'next/server'
 * 
 * export function middleware(request: NextRequest) {
 *   const token = request.cookies.get('auth-token')
 *   if (!token && request.nextUrl.pathname.startsWith('/dashboard')) {
 *     return NextResponse.redirect(new URL('/auth/signin', request.url))
 *   }
 *   return NextResponse.next()
 * }
 * ```
 */

interface AuthContextType {
  user: User | null
  login: (credentials: LoginRequest) => Promise<void>
  signup: (data: SignupRequest) => Promise<void>
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  // Load user from localStorage on mount
  useEffect(() => {
    const token = localStorage.getItem('auth-token')
    const storedUser = localStorage.getItem('user')
    
    if (token && storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch (error) {
        console.error('Failed to parse user data:', error)
        localStorage.removeItem('auth-token')
        localStorage.removeItem('user')
      }
    }
    setIsLoading(false)
  }, [])

  const login = async (credentials: LoginRequest) => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || 'Login failed')
      }

      const data: AuthTokens = await response.json()
      
      // Store token and user data
      localStorage.setItem('auth-token', data.token)
      localStorage.setItem('user', JSON.stringify(data.user))
      setUser(data.user)
      
      router.push('/dashboard')
    } catch (error) {
      console.error('Login error:', error)
      throw error
    }
  }

  const signup = async (data: SignupRequest) => {
    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || 'Signup failed')
      }

      const result: AuthTokens = await response.json()
      
      // Store token and user data
      localStorage.setItem('auth-token', result.token)
      localStorage.setItem('user', JSON.stringify(result.user))
      setUser(result.user)
      
      router.push('/dashboard')
    } catch (error) {
      console.error('Signup error:', error)
      throw error
    }
  }

  const logout = () => {
    localStorage.removeItem('auth-token')
    localStorage.removeItem('user')
    setUser(null)
    router.push('/')
  }

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

/**
 * Get auth token for API requests
 * Use this helper to attach Authorization header to API calls
 */
export function getAuthToken(): string | null {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('auth-token')
  }
  return null
}
