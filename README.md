# Suitmedia Test - Ideas Platform

A modern Next.js 16 web application for displaying articles/ideas with filtering, sorting, and pagination.

**🔗 [Live Demo](https://suitmediatest-wedanta.baguswedanta.com/)**

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm

### Installation

```bash
# Clone repository
git clone <repository-url>
cd suitmediatest

# Copy environment variables
cp .env.example .env.local

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) - redirects to `/ideas` page.

## 📋 Environment Variables

Create `.env.local`:

```env
NEXT_PUBLIC_API_BASE_URL=https://suitmedia-backend.suitdev.com
NEXT_PUBLIC_ASSETS_BASE_URL=https://assets.suitdev.com
NEXT_PUBLIC_SITE_URL=https://suitmediatest-wedanta.baguswedanta.com
```

> `.env.local` is gitignored. Never commit sensitive data.

## 🛠 Tech Stack

- **Framework**: Next.js 16.1.1 (App Router), React 19.2.3, TypeScript 5
- **Styling**: Tailwind CSS 4, PostCSS
- **UI**: Radix UI, Framer Motion, Lucide React
- **Tools**: ESLint, TypeScript

## ✨ Features

- Article listing with pagination (5/10/15/20 per page)
- Sort by publication date (newest/oldest)
- Responsive grid layout
- Image lazy loading with placeholder fallback
- State persistence (localStorage)
- Parallax banner effects
- Mobile-friendly navigation

## 📁 Project Structure

```text
suitmediatest/
├── app/              # Next.js App Router
│   ├── api/ideas/   # API route handler
│   └── ideas/       # Ideas page
├── components/       # Shared UI components
├── lib/             # Utilities & API clients
└── shared/          # Shared components & assets
```

## 📡 API

**Endpoint**: `GET /api/ideas`

**Query Parameters**:

- `page[number]` or `page` - Page number (default: 1)
- `page[size]` or `size` - Items per page (default: 10)
- `sort` - Sort order: `"published_at"` or `"-published_at"` (default: `"-published_at"`)

**External API**: `https://suitmedia-backend.suitdev.com/api/ideas`

## 💻 Scripts

```bash
npm run dev    # Development server
npm run build  # Production build
npm run start  # Production server
npm run lint   # Run ESLint
```

## 🚢 Deployment

### Production Build

```bash
npm run build
npm run start
```

### Deploy to Vercel

1. Push to GitHub/GitLab/Bitbucket
2. Import project in [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard
4. Deploy

**Live URL**: [https://suitmediatest-wedanta.baguswedanta.com/](https://suitmediatest-wedanta.baguswedanta.com/)

## ⚙️ Configuration

### Next.js (`next.config.ts`)

Image optimization for:

- `suitmedia-backend.suitdev.com`
- `assets.suitdev.com`

### Tailwind (`globals.css`)

Custom brand colors:

- `--brand-primary`: #ff6b35
- `--brand-primary-scrolled`: #ff6b35f2

## 📝 License

Private and proprietary.

---

**Note**: This is a test project for Suitmedia. Visit the [live website](https://suitmediatest-wedanta.baguswedanta.com/) to see it in action.
