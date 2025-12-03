import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Pricing - Sevico',
  description: 'Simple, transparent pricing for Sevico',
}

export default function PricingPage() {
  const tiers = [
    {
      name: 'Starter',
      price: '$0',
      description: 'Perfect for getting started and small projects.',
      features: [
        'Full source code access',
        'Authentication system',
        'Basic components',
        'Community support',
        'Regular updates',
      ],
      cta: 'Get Started',
      href: '/auth/signup',
      featured: false,
    },
    {
      name: 'Pro',
      price: '$49',
      description: 'For professional developers and growing teams.',
      features: [
        'Everything in Starter',
        'Premium components',
        'Advanced examples',
        'Priority support',
        'Lifetime updates',
        'Commercial license',
      ],
      cta: 'Get Pro',
      href: '/auth/signup',
      featured: true,
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      description: 'For large teams with custom requirements.',
      features: [
        'Everything in Pro',
        'Custom development',
        'Dedicated support',
        'SLA guarantee',
        'Team training',
        'Custom integrations',
      ],
      cta: 'Contact Sales',
      href: '/auth/signup',
      featured: false,
    },
  ]

  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-base font-semibold leading-7 text-primary-600">Pricing</h2>
          <p className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Choose the plan that's right for you
          </p>
        </div>
        <p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-gray-600">
          Start for free and upgrade as you grow. All plans include the complete source code.
        </p>
        <div className="isolate mx-auto mt-16 grid max-w-md grid-cols-1 gap-y-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:gap-x-8 xl:gap-x-12">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`rounded-3xl p-8 ring-1 ${
                tier.featured
                  ? 'bg-primary-600 ring-primary-600'
                  : 'bg-white ring-gray-200'
              }`}
            >
              <h3
                className={`text-lg font-semibold leading-8 ${
                  tier.featured ? 'text-white' : 'text-gray-900'
                }`}
              >
                {tier.name}
              </h3>
              <p
                className={`mt-4 text-sm leading-6 ${
                  tier.featured ? 'text-primary-100' : 'text-gray-600'
                }`}
              >
                {tier.description}
              </p>
              <p className="mt-6 flex items-baseline gap-x-1">
                <span
                  className={`text-4xl font-bold tracking-tight ${
                    tier.featured ? 'text-white' : 'text-gray-900'
                  }`}
                >
                  {tier.price}
                </span>
                {tier.price !== 'Custom' && (
                  <span
                    className={`text-sm font-semibold leading-6 ${
                      tier.featured ? 'text-primary-100' : 'text-gray-600'
                    }`}
                  >
                    /one-time
                  </span>
                )}
              </p>
              <Link
                href={tier.href}
                className={`mt-6 block rounded-md px-3 py-2 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${
                  tier.featured
                    ? 'bg-white text-primary-600 hover:bg-primary-50 focus-visible:outline-white'
                    : 'bg-primary-600 text-white shadow-sm hover:bg-primary-500 focus-visible:outline-primary-600'
                }`}
              >
                {tier.cta}
              </Link>
              <ul
                role="list"
                className={`mt-8 space-y-3 text-sm leading-6 ${
                  tier.featured ? 'text-primary-100' : 'text-gray-600'
                }`}
              >
                {tier.features.map((feature) => (
                  <li key={feature} className="flex gap-x-3">
                    <svg
                      className={`h-6 w-5 flex-none ${
                        tier.featured ? 'text-white' : 'text-primary-600'
                      }`}
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
