# Sevico - Production-Ready Next.js Starter

A modern, fully-typed Next.js starter template with authentication, beautiful UI components, and best practices built-in. Start building your production app in minutes, not days.

## ✨ Features

- **Next.js 14** with App Router and React Server Components
- **TypeScript** for type safety and better developer experience
- **Tailwind CSS** for rapid, responsive styling
- **Authentication System** - JWT-based auth with protected routes
- **API Routes** - Sample REST endpoints ready to customize
- **Form Validation** - Client-side validation with Zod
- **Testing Setup** - Jest + React Testing Library configured
- **ESLint & Prettier** - Code quality and formatting
- **Responsive Design** - Mobile-first with accessible components
- **SEO Ready** - Meta tags and semantic HTML

## 📁 Project Structure

```
sevico-fe/
├── app/                    # Next.js App Router
│   ├── (routes)/
│   │   ├── page.tsx       # Home page
│   │   ├── about/         # About page
│   │   ├── pricing/       # Pricing page
│   │   ├── auth/          # Authentication pages
│   │   │   ├── signin/    # Sign in page
│   │   │   └── signup/    # Sign up page
│   │   └── dashboard/     # Protected dashboard
│   ├── api/               # API routes
│   │   ├── auth/          # Auth endpoints
│   │   │   ├── login/     # POST /api/auth/login
│   │   │   └── signup/    # POST /api/auth/signup
│   │   └── profile/       # GET /api/profile
│   ├── layout.tsx         # Root layout
│   └── globals.css        # Global styles
├── components/            # Reusable UI components
│   ├── Navbar.tsx         # Navigation bar
│   ├── Footer.tsx         # Footer component
│   ├── Button.tsx         # Button component
│   └── FormInput.tsx      # Form input component
├── lib/                   # Utilities and helpers
│   ├── auth.tsx           # Auth context and hooks
│   ├── withAuth.tsx       # HOC for protected pages
│   ├── api-client.ts      # API request helpers
│   ├── utils.ts           # General utilities
│   └── validation.ts      # Form validation helpers
├── types/                 # TypeScript type definitions
│   └── auth.ts            # Auth-related types
├── __tests__/             # Test files
│   ├── components/        # Component tests
│   └── lib/               # Utility tests
├── public/                # Static assets
├── middleware.ts          # Next.js middleware (route protection)
└── ...config files
```

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Environment Variables

Copy the example environment file and configure it:

```bash
cp .env.example .env
```

Edit `.env` and set your values:

```env
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
NEXT_PUBLIC_API_URL=http://localhost:3000
NODE_ENV=development
```

**Important:** Change `JWT_SECRET` to a secure random string in production!

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Try the Demo

- Navigate to the sign-in page
- Use demo credentials:
  - **Email:** `demo@example.com`
  - **Password:** `password123`
- Access the protected dashboard at `/dashboard`

## 📝 Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm start            # Start production server
npm run lint         # Run ESLint
npm run format       # Format code with Prettier
npm run format:check # Check code formatting
npm test             # Run tests
npm test:watch       # Run tests in watch mode
npm run type-check   # Check TypeScript types
```

## 🔐 Authentication Flow

### Current Implementation (Mock/Demo)

The starter uses **localStorage** with JWT tokens for simplicity:

1. User signs in/up via API routes
2. Server generates JWT token and returns it
3. Token stored in localStorage
4. Client includes token in Authorization header for protected requests
5. Protected pages check for user in `useAuth()` hook

**Demo User:**
- Email: `demo@example.com`
- Password: `password123`

### Trade-offs

| Approach | Pros | Cons |
|----------|------|------|
| **localStorage** (current) | Simple, works client-side | Vulnerable to XSS attacks |
| **HttpOnly Cookies** (recommended) | XSS protection, secure | Requires server-side setup |

## 🔒 Switching to Production Auth

### Option 1: HttpOnly Cookies (Recommended)

1. **Modify API routes** to set cookies:

```typescript
// app/api/auth/login/route.ts
import { cookies } from 'next/headers'

export async function POST(request: Request) {
  // ... validate credentials ...
  
  cookies().set('auth-token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7, // 7 days
  })
  
  return NextResponse.json({ user })
}
```

2. **Update middleware** to validate server-side:

```typescript
// middleware.ts
import { NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'

export function middleware(request: NextRequest) {
  const token = request.cookies.get('auth-token')
  
  if (!token && request.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/auth/signin', request.url))
  }
  
  // Verify token
  try {
    jwt.verify(token.value, process.env.JWT_SECRET!)
  } catch {
    return NextResponse.redirect(new URL('/auth/signin', request.url))
  }
  
  return NextResponse.next()
}
```

3. **Remove localStorage** from `lib/auth.tsx`

### Option 2: Use NextAuth.js

[NextAuth.js](https://next-auth.js.org/) provides a complete authentication solution:

```bash
npm install next-auth
```

Follow NextAuth documentation to set up providers (Google, GitHub, Email, etc.)

### Option 3: Use Auth0 / Clerk / Supabase

These services provide:
- User management
- Social login
- Session management
- Security best practices

See their documentation for integration guides.

## 🔌 Replacing Mock API with Real Backend

### Current Mock API

The template includes mock API routes that simulate authentication:

- `POST /api/auth/login` - Validates hardcoded demo user
- `POST /api/auth/signup` - Creates mock user (no database)
- `GET /api/profile` - Returns mock profile data

### Steps to Connect Real Backend

1. **Update environment variables:**

```env
# Point to your backend API
NEXT_PUBLIC_API_URL=https://api.yourbackend.com
```

2. **Option A: Proxy through Next.js API routes**

Keep the same endpoints but proxy to your backend:

```typescript
// app/api/auth/login/route.ts
export async function POST(request: Request) {
  const body = await request.json()
  
  // Forward to your backend
  const response = await fetch(`${process.env.BACKEND_API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  
  return response
}
```

**Option B: Call backend directly from client**

Update `lib/api-client.ts` to use your backend URL directly.

3. **Update auth flow** to match your backend's token format and error responses

4. **Replace mock users** with database queries (Prisma, MongoDB, PostgreSQL, etc.)

## 🧪 Testing

### Run Tests

```bash
npm test              # Run all tests
npm test:watch        # Watch mode
```

### Test Structure

- **Component tests:** `__tests__/components/`
- **Utility tests:** `__tests__/lib/`

### Example Component Test

```typescript
import { render, screen } from '@testing-library/react'
import { Button } from '@/components/Button'

test('renders button with text', () => {
  render(<Button>Click me</Button>)
  expect(screen.getByText(/click me/i)).toBeInTheDocument()
})
```

### Writing Integration Tests

For testing API routes and user flows, consider adding:

```bash
npm install --save-dev cypress
# or
npm install --save-dev playwright
```

## 🎨 Styling & Customization

### Tailwind Configuration

Edit `tailwind.config.js` to customize colors, spacing, and more:

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          // Your brand colors
          500: '#3b82f6',
          600: '#2563eb',
        },
      },
    },
  },
}
```

### Global Styles

Edit `app/globals.css` for custom CSS and Tailwind utilities.

### Component Classes

The starter includes utility classes in `globals.css`:

- `.btn-primary` - Primary button styles
- `.btn-secondary` - Secondary button styles  
- `.input-field` - Input field styles
- `.card` - Card container styles

## ♿ Accessibility

The template follows accessibility best practices:

- **Semantic HTML** - Proper heading hierarchy, landmarks
- **ARIA labels** - Screen reader support
- **Keyboard navigation** - All interactive elements accessible
- **Form validation** - Clear error messages with `aria-describedby`
- **Focus indicators** - Visible focus states

## 🔧 Environment Variables

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `JWT_SECRET` | Secret for signing JWT tokens | Yes | `your-secret-key` |
| `NEXT_PUBLIC_API_URL` | API base URL | No | `http://localhost:3000` |
| `NODE_ENV` | Environment mode | No | `development` |

**Note:** Variables prefixed with `NEXT_PUBLIC_` are exposed to the browser.

## 📦 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Set environment variables
4. Deploy!

### Other Platforms

The app can be deployed to any platform that supports Next.js:

- **Netlify:** Use `next export` for static export
- **AWS Amplify:** Follow Next.js deployment guide
- **Docker:** Use the included Dockerfile (create one if needed)

### Build for Production

```bash
npm run build
npm start
```

## 🤝 Contributing

Contributions are welcome! Please follow these guidelines:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## 📄 License

MIT License - feel free to use this template for your projects.

## 🙋 Support

- **Issues:** Report bugs or request features via GitHub Issues
- **Discussions:** Ask questions in GitHub Discussions

## 🗺️ Roadmap

Future improvements planned:

- [ ] Database integration examples (Prisma + PostgreSQL)
- [ ] Email verification flow
- [ ] Password reset functionality
- [ ] User profile editing
- [ ] Dark mode support
- [ ] Internationalization (i18n)
- [ ] More UI components (Modal, Dropdown, etc.)
- [ ] Storybook integration

## 📚 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)
- [React Testing Library](https://testing-library.com/react)

---

**Built with ❤️ using Next.js, TypeScript, and Tailwind CSS**
