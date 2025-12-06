import { NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import type { User } from '@/types/auth'

export const dynamic = 'force-dynamic'

/**
 * GET /api/profile
 * 
 * Protected endpoint that returns user profile data.
 * Requires Authorization header with Bearer token.
 * 
 * MOCK IMPLEMENTATION:
 * - Validates JWT token from Authorization header
 * - Returns mock user data
 * 
 * TO REPLACE WITH REAL BACKEND:
 * 1. Fetch user data from database using userId from token
 * 2. Add proper error handling for missing/invalid tokens
 * 3. Consider caching user data
 * 4. Add fields like profile picture, preferences, etc.
 * 
 * Example with database:
 * ```typescript
 * const user = await db.user.findUnique({
 *   where: { id: decoded.userId },
 *   select: { id: true, email: true, name: true, avatar: true }
 * })
 * if (!user) throw new Error('User not found')
 * ```
 */

interface JWTPayload {
  userId: string
  email: string
  iat: number
  exp: number
}

export async function GET(request: Request) {
  try {
    // Get token from Authorization header
    const authHeader = request.headers.get('authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Unauthorized', message: 'Missing or invalid authorization header' },
        { status: 401 }
      )
    }

    const token = authHeader.substring(7) // Remove 'Bearer ' prefix

    // Verify JWT token
    const secret = process.env.JWT_SECRET || 'your-secret-key'
    let decoded: JWTPayload
    try {
      decoded = jwt.verify(token, secret) as JWTPayload
    } catch (error) {
      return NextResponse.json(
        { error: 'Unauthorized', message: 'Invalid or expired token' },
        { status: 401 }
      )
    }

    // Mock user lookup - Replace with real database query
    const user: User = {
      id: decoded.userId,
      email: decoded.email,
      name: decoded.email === 'demo@example.com' ? 'Demo User' : 'User',
    }

    return NextResponse.json(user)
  } catch (error) {
    console.error('Profile error:', error)
    return NextResponse.json(
      { error: 'Internal server error', message: 'Something went wrong' },
      { status: 500 }
    )
  }
}
