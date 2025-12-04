import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Serious Vibe Coder - Build Fast. Build Smart. Build With the Right Vibes.',
  description: 'We help founders, indie hackers, and developers vibe code the right way with clean structure, scalable architecture, and production-ready foundations.',
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Hero Section */}
      <section className="container mx-auto px-4 pt-20 pb-32 text-center">
        <div className="mb-8 inline-block">
          <span className="text-6xl animate-pulse">⭐</span>
        </div>
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
          Serious Vibe Coder
        </h1>
        <p className="text-2xl md:text-3xl text-purple-200 mb-8 font-light">
          Build Fast. Build Smart. Build With the Right Vibes.
        </p>
        <p className="text-lg md:text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
          We help founders, indie hackers, and developers "vibe code" the right way—
          with clean structure, scalable architecture, and production-ready foundations from day one.
        </p>
      </section>

      {/* What We Do Section */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-gray-900">
            🚀 What We Do
          </h2>

          {/* Service 1 */}
          <div className="max-w-5xl mx-auto mb-20">
            <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl p-8 md:p-12 shadow-xl hover:shadow-2xl transition-shadow duration-300">
              <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                1. Instant Starter Templates & Boilerplates
              </h3>
              <p className="text-xl text-gray-700 mb-6">
                Jumpstart your next idea with high-quality, scalable templates for web or mobile apps.
              </p>
              
              <div className="bg-white rounded-xl p-6 mb-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-3">Built using:</h4>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-center">
                    <span className="mr-2">▸</span> Next.js, React, Expo
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2">▸</span> Clean folder structures
                  </li>
                </ul>
              </div>

              <div className="bg-white rounded-xl p-6 mb-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-3">Production-ready helpers:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="flex items-center text-gray-700">
                    <span className="mr-2">✓</span> Vector database integration
                  </div>
                  <div className="flex items-center text-gray-700">
                    <span className="mr-2">✓</span> Email sending helper
                  </div>
                  <div className="flex items-center text-gray-700">
                    <span className="mr-2">✓</span> Authentication & JWT helper
                  </div>
                  <div className="flex items-center text-gray-700">
                    <span className="mr-2">✓</span> Database helper
                  </div>
                  <div className="flex items-center text-gray-700">
                    <span className="mr-2">✓</span> API best-practice setup
                  </div>
                </div>
              </div>

              <p className="text-lg font-medium text-purple-700">
                Launch faster with the correct foundation—no messy code, no spaghetti architecture.
              </p>
            </div>
          </div>

          {/* Service 2 */}
          <div className="max-w-5xl mx-auto mb-20">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 md:p-12 shadow-xl hover:shadow-2xl transition-shadow duration-300">
              <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                2. Technical Consulting — Your Real Tech Partner
              </h3>
              <p className="text-xl text-gray-700 mb-4">
                We don't just "make apps."
              </p>
              <p className="text-xl text-gray-700 mb-6 font-medium">
                We help you build the right product the right way.
              </p>
              
              <div className="bg-white rounded-xl p-6 mb-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-3">As your tech partner, we help you:</h4>
                <ul className="space-y-3">
                  <li className="flex items-start text-gray-700">
                    <span className="mr-3 mt-1 text-blue-600">●</span>
                    <span>Reduce time & development cost</span>
                  </li>
                  <li className="flex items-start text-gray-700">
                    <span className="mr-3 mt-1 text-blue-600">●</span>
                    <span>Architect a long-term scalable system</span>
                  </li>
                  <li className="flex items-start text-gray-700">
                    <span className="mr-3 mt-1 text-blue-600">●</span>
                    <span>Choose the right technologies</span>
                  </li>
                  <li className="flex items-start text-gray-700">
                    <span className="mr-3 mt-1 text-blue-600">●</span>
                    <span>Move from idea → MVP → real product</span>
                  </li>
                  <li className="flex items-start text-gray-700">
                    <span className="mr-3 mt-1 text-blue-600">●</span>
                    <span>Avoid common mistakes that kill early startup projects</span>
                  </li>
                </ul>
              </div>

              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-6 text-white">
                <p className="text-lg font-medium mb-2">We're not an outsourcing team.</p>
                <p className="text-xl font-bold">We're your technical co-pilot.</p>
              </div>
            </div>
          </div>

          {/* Service 3 */}
          <div className="max-w-5xl mx-auto">
            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-8 md:p-12 shadow-xl hover:shadow-2xl transition-shadow duration-300">
              <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                3. Tutorials for Startup Builders
              </h3>
              <p className="text-xl text-gray-700 mb-6">
                Easy-to-follow guides teaching you how to build real products from scratch.
              </p>
              
              <div className="bg-white rounded-xl p-6 mb-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-3">Learn how to:</h4>
                <ul className="space-y-3">
                  <li className="flex items-start text-gray-700">
                    <span className="mr-3 text-purple-600">→</span>
                    <span>Build a full web app or mobile app</span>
                  </li>
                  <li className="flex items-start text-gray-700">
                    <span className="mr-3 text-purple-600">→</span>
                    <span>Structure your code properly</span>
                  </li>
                  <li className="flex items-start text-gray-700">
                    <span className="mr-3 text-purple-600">→</span>
                    <span>Integrate databases, APIs, email, authentication</span>
                  </li>
                  <li className="flex items-start text-gray-700">
                    <span className="mr-3 text-purple-600">→</span>
                    <span>Ship products the "Serious Vibe" way—clean, scalable, maintainable</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white rounded-xl p-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-3">Perfect for:</h4>
                <div className="flex flex-wrap gap-3">
                  <span className="bg-purple-100 text-purple-800 px-4 py-2 rounded-full font-medium">Solo founders</span>
                  <span className="bg-purple-100 text-purple-800 px-4 py-2 rounded-full font-medium">New developers</span>
                  <span className="bg-purple-100 text-purple-800 px-4 py-2 rounded-full font-medium">Startup teams</span>
                  <span className="bg-purple-100 text-purple-800 px-4 py-2 rounded-full font-medium">Anyone who wants to level up their coding "vibes"</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Focus Section */}
      <section className="bg-gradient-to-br from-slate-900 to-purple-900 py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-8 text-white">
            🔥 Our Focus: Correct Vibe Coding
          </h2>
          <p className="text-xl text-gray-300 text-center max-w-4xl mx-auto mb-12">
            Most people "vibe code" the wrong way—quick fixes, random files, inconsistent structure.
            <br />
            <span className="text-purple-300 font-medium">We teach and deliver the correct way to vibe code:</span>
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mb-12">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-purple-300/30 hover:bg-white/20 transition-all duration-300">
              <div className="text-3xl mb-3">🏗️</div>
              <h3 className="text-xl font-bold text-white mb-2">Structure first</h3>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-purple-300/30 hover:bg-white/20 transition-all duration-300">
              <div className="text-3xl mb-3">📈</div>
              <h3 className="text-xl font-bold text-white mb-2">Scalability always</h3>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-purple-300/30 hover:bg-white/20 transition-all duration-300">
              <div className="text-3xl mb-3">✨</div>
              <h3 className="text-xl font-bold text-white mb-2">Clean components</h3>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-purple-300/30 hover:bg-white/20 transition-all duration-300">
              <div className="text-3xl mb-3">🔧</div>
              <h3 className="text-xl font-bold text-white mb-2">Maintainable architecture</h3>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-purple-300/30 hover:bg-white/20 transition-all duration-300 md:col-span-2 lg:col-span-1">
              <div className="text-3xl mb-3">🚀</div>
              <h3 className="text-xl font-bold text-white mb-2">Ready for real users, real traffic, real production</h3>
            </div>
          </div>

          <p className="text-2xl text-center text-purple-200 font-medium">
            Good vibes, good code. No shortcuts.
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            💬 Ready to build something serious?
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto mb-10 leading-relaxed">
            Whether you're launching your first startup or leveling up your dev workflow,
            Serious Vibe Coder gives you the tools, templates, and guidance to build faster—and build right.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/auth/signup"
              className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300"
            >
              Get Started
            </Link>
            <Link 
              href="/about"
              className="bg-white border-2 border-purple-600 text-purple-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-purple-50 transform hover:-translate-y-1 transition-all duration-300"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
