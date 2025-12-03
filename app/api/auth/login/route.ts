import { NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import { z } from 'zod'
import type { LoginRequest, AuthTokens } from '@/types/auth'

/**
 * POST /api/auth/login
 * 
 * Mock login endpoint that validates credentials and returns a JWT token.
 * 
 * MOCK IMPLEMENTATION:
 * - Validates against hardcoded demo user
 * - Signs a JWT with a secret from environment variables
 * - Returns token and user data
 * 
 * TO REPLACE WITH REAL BACKEND:
 * 1. Replace demo user check with database lookup
 * 2. Use proper password hashing (bcrypt, argon2)
 * 3. Add rate limiting for security
 * 4. Add proper error logging
 * 5. Consider using refresh tokens
 * 6. Set HttpOnly cookies instead of returning token in response
 * 
 * Example with database:
 * ```typescript
 * const user = await db.user.findUnique({ where: { email } })
 * const valid = await bcrypt.compare(password, user.passwordHash)
 * if (!valid) throw new Error('Invalid credentials')
 * ```
 */

// Validation schema
const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
})

// Mock user database
const DEMO_USER = {
  id: '1',
  email: 'demo@example.com',
  password: 'password123', // In production, this would be hashed!
  name: 'Demo User',
}

export async function POST(request: Request) {
  try {
    const body: LoginRequest = await request.json()

    // Validate input
    const validation = loginSchema.safeParse(body)
    if (!validation.success) {
      return NextResponse.json(
        { error: 'Validation failed', message: validation.error.errors[0].message },
        { status: 400 }
      )
    }

    const { email, password } = validation.data

    // Mock authentication - Replace with real database lookup
    if (email !== DEMO_USER.email || password !== DEMO_USER.password) {
      return NextResponse.json(
        { error: 'Invalid credentials', message: 'Email or password is incorrect' },
        { status: 401 }
      )
    }

    // Generate JWT token
    const secret = process.env.JWT_SECRET || 'your-secret-key'
    const token = jwt.sign(
      {
        userId: DEMO_USER.id,
        email: DEMO_USER.email,
      },
      secret,
      { expiresIn: '7d' }
    )

    // Return token and user data
    const response: AuthTokens = {
      token,
      user: {
        id: DEMO_USER.id,
        email: DEMO_USER.email,
        name: DEMO_USER.name,
      },
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { error: 'Internal server error', message: 'Something went wrong' },
      { status: 500 }
    )
  }
}
