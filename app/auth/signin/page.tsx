'use client'

import { useState, FormEvent } from 'react'
import Link from 'next/link'
import { useAuth } from '@/lib/auth'
import { FormInput } from '@/components/FormInput'
import { Button } from '@/components/Button'

export default function SignInPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { login } = useAuth()

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    // Client-side validation
    if (!email || !password) {
      setError('Please fill in all fields')
      setIsLoading(false)
      return
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address')
      setIsLoading(false)
      return
    }

    try {
      await login({ email, password })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Sign in failed')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleSubmit} noValidate>
          {error && (
            <div
              className="rounded-md bg-red-50 p-4 text-sm text-red-800"
              role="alert"
              aria-live="polite"
            >
              {error}
            </div>
          )}

          <FormInput
            label="Email address"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading}
          />

          <FormInput
            label="Password"
            type="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoading}
          />

          <div>
            <Button type="submit" isLoading={isLoading} className="w-full">
              Sign in
            </Button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          Don't have an account?{' '}
          <Link
            href="/auth/signup"
            className="font-semibold leading-6 text-primary-600 hover:text-primary-500"
          >
            Sign up
          </Link>
        </p>

        <div className="mt-4 rounded-md bg-blue-50 p-4">
          <p className="text-sm text-blue-800">
            <strong>Demo credentials:</strong>
          </p>
          <p className="mt-1 text-sm text-blue-700">
            Email: demo@example.com
            <br />
            Password: password123
          </p>
        </div>
      </div>
    </div>
  )
}
