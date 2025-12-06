'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { validateToken, removeAccessToken } from '@/lib/auth-utils'
import type { UserProfile } from '@/types/api'

export default function DashboardPage() {
  const router = useRouter()
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await validateToken()
        if (!data) {
          router.push('/auth/signin')
          return
        }
        setProfile(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load profile')
        router.push('/auth/signin')
      } finally {
        setIsLoading(false)
      }
    }

    fetchProfile()
  }, [router])

  const handleLogout = () => {
    removeAccessToken()
    router.push('/auth/signin')
  }

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-purple-600 border-r-transparent"></div>
      </div>
    )
  }

  if (error || !profile) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        {/* Header with Logout */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">Dashboard</h1>
            <p className="mt-2 text-lg text-gray-600">Welcome back, {profile.fullname}!</p>
          </div>
          <button
            onClick={handleLogout}
            className="rounded-lg bg-red-600 px-4 py-2 text-white font-medium hover:bg-red-700 transition-colors"
          >
            Logout
          </button>
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="flex items-center mb-6">
            <div className="h-20 w-20 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center text-white text-3xl font-bold">
              {profile.fullname.charAt(0).toUpperCase()}
            </div>
            <div className="ml-6">
              <h2 className="text-2xl font-bold text-gray-900">{profile.fullname}</h2>
              <p className="text-gray-600">{profile.email}</p>
              {profile.is_verified && (
                <span className="inline-flex items-center mt-2 px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                  ✓ Verified
                </span>
              )}
            </div>
          </div>

          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Profile Information</h3>
            <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="bg-gray-50 rounded-lg p-4">
                <dt className="text-sm font-medium text-gray-500">Email</dt>
                <dd className="mt-1 text-sm text-gray-900">{profile.email}</dd>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4">
                <dt className="text-sm font-medium text-gray-500">Full Name</dt>
                <dd className="mt-1 text-sm text-gray-900">{profile.fullname}</dd>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4">
                <dt className="text-sm font-medium text-gray-500">Date of Birth</dt>
                <dd className="mt-1 text-sm text-gray-900">
                  {new Date(profile.dob).toLocaleDateString()}
                </dd>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4">
                <dt className="text-sm font-medium text-gray-500">Account Status</dt>
                <dd className="mt-1 text-sm text-gray-900">
                  {profile.is_verified ? 'Verified' : 'Not Verified'}
                </dd>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4">
                <dt className="text-sm font-medium text-gray-500">Member Since</dt>
                <dd className="mt-1 text-sm text-gray-900">
                  {new Date(profile.created_at).toLocaleDateString()}
                </dd>
              </div>
              
              {profile.avatar && (
                <div className="bg-gray-50 rounded-lg p-4">
                  <dt className="text-sm font-medium text-gray-500">Avatar</dt>
                  <dd className="mt-1">
                    <Image
                      src={profile.avatar}
                      alt="Avatar"
                      width={40}
                      height={40}
                      className="h-10 w-10 rounded-full object-cover"
                      unoptimized
                    />
                  </dd>
                </div>
              )}
            </dl>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <button className="p-4 border-2 border-gray-200 rounded-lg hover:border-purple-600 hover:shadow-md transition-all text-left">
              <div className="text-2xl mb-2">🚀</div>
              <div className="font-semibold text-gray-900">Start New Project</div>
              <div className="text-sm text-gray-600">Get a boilerplate template</div>
            </button>
            
            <button className="p-4 border-2 border-gray-200 rounded-lg hover:border-purple-600 hover:shadow-md transition-all text-left">
              <div className="text-2xl mb-2">📚</div>
              <div className="font-semibold text-gray-900">View Tutorials</div>
              <div className="text-sm text-gray-600">Learn to build better</div>
            </button>
            
            <button className="p-4 border-2 border-gray-200 rounded-lg hover:border-purple-600 hover:shadow-md transition-all text-left">
              <div className="text-2xl mb-2">💬</div>
              <div className="font-semibold text-gray-900">Get Consulting</div>
              <div className="text-sm text-gray-600">Talk to an expert</div>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
