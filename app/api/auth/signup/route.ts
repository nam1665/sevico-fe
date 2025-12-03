import { NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import { z } from 'zod'
import type { SignupRequest, AuthTokens } from '@/types/auth'

/**
 * POST /api/auth/signup
 * 
 * Mock signup endpoint that creates a new user and returns a JWT token.
 * 
 * MOCK IMPLEMENTATION:
 * - Validates input data
 * - Creates a mock user (no database)
 * - Signs a JWT and returns it
 * 
 * TO REPLACE WITH REAL BACKEND:
 * 1. Check if user already exists in database
 * 2. Hash password with bcrypt/argon2
 * 3. Create user record in database
 * 4. Send verification email
 * 5. Add rate limiting
 * 6. Set HttpOnly cookies instead of returning token
 * 
 * Example with database:
 * ```typescript
 * const existingUser = await db.user.findUnique({ where: { email } })
 * if (existingUser) throw new Error('User already exists')
 * 
 * const passwordHash = await bcrypt.hash(password, 10)
 * const user = await db.user.create({
 *   data: { email, name, passwordHash }
 * })
 * ```
 */

// Validation schema
const signupSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  name: z.string().min(1, 'Name is required'),
})

export async function POST(request: Request) {
  try {
    const body: SignupRequest = await request.json()

    // Validate input
    const validation = signupSchema.safeParse(body)
    if (!validation.success) {
      return NextResponse.json(
        { error: 'Validation failed', message: validation.error.errors[0].message },
        { status: 400 }
      )
    }

    const { email, password, name } = validation.data

    // Mock user creation - Replace with real database insert
    // In production, check if user exists and hash password
    const mockUser = {
      id: `user_${Date.now()}`, // Generate proper UUID in production
      email,
      name,
    }

    // Generate JWT token
    const secret = process.env.JWT_SECRET || 'your-secret-key'
    const token = jwt.sign(
      {
        userId: mockUser.id,
        email: mockUser.email,
      },
      secret,
      { expiresIn: '7d' }
    )

    // Return token and user data
    const response: AuthTokens = {
      token,
      user: mockUser,
    }

    return NextResponse.json(response, { status: 201 })
  } catch (error) {
    console.error('Signup error:', error)
    return NextResponse.json(
      { error: 'Internal server error', message: 'Something went wrong' },
      { status: 500 }
    )
  }
}
