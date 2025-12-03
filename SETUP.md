# Quick Setup Guide

Get your Sevico app running in 5 minutes!

## Step 1: Install Dependencies

```bash
npm install
```

This will install all required packages including Next.js, React, TypeScript, Tailwind CSS, and testing libraries.

## Step 2: Configure Environment

```bash
cp .env.example .env
```

Then edit `.env` and set a secure JWT secret:

```env
JWT_SECRET=generate-a-random-secure-string-here
```

**Tip:** Generate a secure secret with:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

## Step 3: Start Development Server

```bash
npm run dev
```

Your app will be available at [http://localhost:3000](http://localhost:3000)

## Step 4: Try It Out

1. Visit [http://localhost:3000](http://localhost:3000)
2. Click "Sign In" in the navigation
3. Use demo credentials:
   - Email: `demo@example.com`
   - Password: `password123`
4. You'll be redirected to the protected Dashboard

## Step 5: Start Building!

The template is ready to customize:

- **Add pages:** Create files in `app/` directory
- **Add components:** Create files in `components/` directory
- **Add API routes:** Create files in `app/api/` directory
- **Style:** Edit `tailwind.config.js` and `app/globals.css`

## Common Commands

```bash
npm run dev          # Start dev server
npm run build        # Build for production
npm test             # Run tests
npm run lint         # Check code quality
npm run format       # Format code
```

## Next Steps

- Read the full [README.md](./README.md) for detailed documentation
- Check out the [CONTRIBUTING.md](./CONTRIBUTING.md) guide
- Replace mock authentication with real backend
- Customize the design to match your brand

## Need Help?

- Check the README for troubleshooting
- Open an issue on GitHub
- Review the inline code comments for guidance

Happy coding! 🚀
