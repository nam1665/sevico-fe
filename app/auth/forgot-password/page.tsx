'use client'

import { useState, FormEvent } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { FormInput } from '@/components/FormInput'
import { Button } from '@/components/Button'
import { buildApiUrl, API_ENDPOINTS } from '@/lib/constants'
import type { ApiError } from '@/types/api'

export default function ForgotPasswordPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!email) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setErrors({})
    setSuccessMessage('')

    if (!validateForm()) {
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch(buildApiUrl(API_ENDPOINTS.auth.passwordReset), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (!response.ok) {
        const errorData = data as ApiError
        throw new Error(errorData.detail || 'Failed to send reset email')
      }

      setSuccessMessage('Password reset email sent successfully! Please check your email for instructions.')
      
      // Reset form
      setEmail('')
      
      // Redirect to reset password page after 3 seconds
      setTimeout(() => {
        router.push(`/auth/reset-password?email=${encodeURIComponent(email)}`)
      }, 3000)
    } catch (err) {
      setErrors({
        general: err instanceof Error ? err.message : 'Failed to send reset email',
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Forgot your password?
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          No worries! Enter your email address and we'll send you a link to reset your password.
        </p>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleSubmit} noValidate>
          {errors.general && (
            <div
              className="rounded-md bg-red-50 p-4 text-sm text-red-800"
              role="alert"
              aria-live="polite"
            >
              {errors.general}
            </div>
          )}

          {successMessage && (
            <div
              className="rounded-md bg-green-50 p-4 text-sm text-green-800"
              role="alert"
              aria-live="polite"
            >
              {successMessage}
            </div>
          )}

          <FormInput
            label="Email address"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={errors.email}
            disabled={isLoading}
            placeholder="you@example.com"
          />

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full"
          >
            {isLoading ? 'Sending...' : 'Send Reset Link'}
          </Button>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          Remember your password?{' '}
          <Link href="/auth/signin" className="font-semibold leading-6 text-blue-600 hover:text-blue-500">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}
