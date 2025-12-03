import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'About - Sevico',
  description: 'Learn more about Sevico and our mission to provide production-ready Next.js starters',
}

export default function AboutPage() {
  return (
    <div className="bg-white px-6 py-32 lg:px-8">
      <div className="mx-auto max-w-3xl text-base leading-7 text-gray-700">
        <p className="text-base font-semibold leading-7 text-primary-600">About Us</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Building Better Web Applications
        </h1>
        <p className="mt-6 text-xl leading-8">
          Sevico is a production-ready Next.js starter template designed to help developers ship
          faster without compromising on code quality or best practices.
        </p>
        <div className="mt-10 max-w-2xl">
          <h2 className="mt-16 text-2xl font-bold tracking-tight text-gray-900">Our Mission</h2>
          <p className="mt-6">
            We believe that every project should start with a solid foundation. Too often,
            developers spend days or weeks setting up authentication, routing, and basic UI
            components before they can focus on building their unique features.
          </p>
          <p className="mt-8">
            Sevico eliminates this overhead by providing a well-structured, fully-typed,
            production-ready starter that includes:
          </p>
          <ul role="list" className="mt-8 max-w-xl space-y-8 text-gray-600">
            <li className="flex gap-x-3">
              <svg
                className="mt-1 h-5 w-5 flex-none text-primary-600"
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
              <span>
                <strong className="font-semibold text-gray-900">Authentication System</strong> - A
                complete JWT-based auth system with login, signup, and protected routes.
              </span>
            </li>
            <li className="flex gap-x-3">
              <svg
                className="mt-1 h-5 w-5 flex-none text-primary-600"
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
              <span>
                <strong className="font-semibold text-gray-900">Modern Tech Stack</strong> -
                Next.js 14, TypeScript, Tailwind CSS, and React Server Components.
              </span>
            </li>
            <li className="flex gap-x-3">
              <svg
                className="mt-1 h-5 w-5 flex-none text-primary-600"
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
              <span>
                <strong className="font-semibold text-gray-900">Best Practices</strong> - ESLint,
                Prettier, TypeScript strict mode, and comprehensive testing setup.
              </span>
            </li>
          </ul>
          <h2 className="mt-16 text-2xl font-bold tracking-tight text-gray-900">
            Why Choose Sevico?
          </h2>
          <p className="mt-6">
            Unlike other starters, Sevico is designed to be expanded, not replaced. Every component
            is well-documented, every pattern is explained, and the entire codebase is structured
            for long-term maintainability.
          </p>
          <p className="mt-8">
            Whether you're building a SaaS product, a marketing site, or an internal tool, Sevico
            provides the foundation you need to move fast and build something great.
          </p>
        </div>
        <div className="mt-16 flex items-center gap-x-6">
          <Link href="/pricing" className="btn-primary">
            View Pricing
          </Link>
          <Link href="/auth/signup" className="text-sm font-semibold leading-6 text-gray-900">
            Get Started <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
