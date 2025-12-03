'use client'

import { withAuth } from '@/lib/withAuth'
import { useAuth } from '@/lib/auth'
import { useEffect, useState } from 'react'
import { apiGet } from '@/lib/api-client'
import type { User } from '@/types/auth'

function DashboardPage() {
  const { user } = useAuth()
  const [profile, setProfile] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    // Fetch user profile from API
    const fetchProfile = async () => {
      try {
        const data = await apiGet<User>('/api/profile', true)
        setProfile(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load profile')
      } finally {
        setIsLoading(false)
      }
    }

    fetchProfile()
  }, [])

  return (
    <div className="bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Dashboard</h1>
          <p className="mt-2 text-lg text-gray-600">Welcome back, {user?.name}!</p>
        </div>

        {/* Profile Card */}
        <div className="card mb-8">
          <h2 className="mb-4 text-xl font-semibold text-gray-900">Profile Information</h2>
          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary-600 border-r-transparent"></div>
            </div>
          ) : error ? (
            <div className="rounded-md bg-red-50 p-4 text-sm text-red-800">{error}</div>
          ) : (
            <dl className="divide-y divide-gray-200">
              <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
                <dt className="text-sm font-medium text-gray-500">Full name</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                  {profile?.name}
                </dd>
              </div>
              <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
                <dt className="text-sm font-medium text-gray-500">Email address</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                  {profile?.email}
                </dd>
              </div>
              <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
                <dt className="text-sm font-medium text-gray-500">User ID</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                  {profile?.id}
                </dd>
              </div>
            </dl>
          )}
        </div>

        {/* Protected Content Example */}
        <div className="card">
          <h2 className="mb-4 text-xl font-semibold text-gray-900">Protected Content</h2>
          <p className="text-gray-600">
            This is a protected page that requires authentication. Only logged-in users can see
            this content.
          </p>
          <div className="mt-6 rounded-md bg-green-50 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-green-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-green-800">Authentication Working!</h3>
                <div className="mt-2 text-sm text-green-700">
                  <p>
                    You're seeing this page because you're authenticated. Try signing out and
                    accessing this page again - you'll be redirected to the sign in page.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid Example */}
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-3">
          <div className="card">
            <dt className="text-sm font-medium text-gray-500">Total Projects</dt>
            <dd className="mt-2 text-3xl font-semibold text-gray-900">12</dd>
          </div>
          <div className="card">
            <dt className="text-sm font-medium text-gray-500">Active Tasks</dt>
            <dd className="mt-2 text-3xl font-semibold text-gray-900">24</dd>
          </div>
          <div className="card">
            <dt className="text-sm font-medium text-gray-500">Completed</dt>
            <dd className="mt-2 text-3xl font-semibold text-gray-900">156</dd>
          </div>
        </div>
      </div>
    </div>
  )
}

// Wrap the component with authentication
export default withAuth(DashboardPage)
