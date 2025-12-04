'use client'

import { useState, FormEvent, useEffect, Suspense } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { FormInput } from '@/components/FormInput'
import { Button } from '@/components/Button'
import { buildApiUrl, API_ENDPOINTS } from '@/lib/constants'
import type { ApiError } from '@/types/api'

function ResetPasswordForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [email, setEmail] = useState('')
  const [resetToken, setResetToken] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')

  useEffect(() => {
    // Get email from query parameters if available
    const emailParam = searchParams.get('email')
    const tokenParam = searchParams.get('token')
    
    if (emailParam) {
      setEmail(decodeURIComponent(emailParam))
    }
    if (tokenParam) {
      setResetToken(decodeURIComponent(tokenParam))
    }
  }, [searchParams])

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!email) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    if (!resetToken.trim()) {
      newErrors.resetToken = 'Reset token is required. Please use the link from your email.'
    }

    if (!newPassword) {
      newErrors.newPassword = 'Password is required'
    } else if (newPassword.length < 8) {
      newErrors.newPassword = 'Password must be at least 8 characters'
    }

    if (newPassword !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
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
      const response = await fetch(buildApiUrl(API_ENDPOINTS.auth.passwordResetConfirm), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          reset_token: resetToken,
          new_password: newPassword,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        const errorData = data as ApiError
        throw new Error(errorData.detail || 'Failed to reset password')
      }

      setSuccessMessage('Password reset successfully! Redirecting to sign in...')
      
      // Redirect to signin page after 2 seconds
      setTimeout(() => {
        router.push('/auth/signin')
      }, 2000)
    } catch (err) {
      setErrors({
        general: err instanceof Error ? err.message : 'Failed to reset password',
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Reset your password
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Enter your new password below to reset your account.
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

          <FormInput
            label="Reset token"
            type="text"
            required
            value={resetToken}
            onChange={(e) => setResetToken(e.target.value)}
            error={errors.resetToken}
            disabled={isLoading}
            placeholder="Paste the token from your email"
          />

          <FormInput
            label="New password"
            type="password"
            autoComplete="new-password"
            required
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            error={errors.newPassword}
            disabled={isLoading}
          />

          <FormInput
            label="Confirm password"
            type="password"
            autoComplete="new-password"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            error={errors.confirmPassword}
            disabled={isLoading}
          />

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full"
          >
            {isLoading ? 'Resetting...' : 'Reset Password'}
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

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={
      <div className="flex min-h-screen flex-col items-center justify-center">
        <div className="text-gray-600">Loading...</div>
      </div>
    }>
      <ResetPasswordForm />
    </Suspense>
  )
}
