# Suitmedia Test - Ideas Platform

A modern, responsive web application built with Next.js 16, featuring an article/ideas listing system with advanced filtering, sorting, and pagination capabilities. This project demonstrates best practices in React development, TypeScript, and modern web performance optimization.

## 🌐 Live Demo

**🔗 [View Live Website](https://suitmediatest-wedanta.baguswedanta.com/)**

The application is currently deployed and accessible at: [https://suitmediatest-wedanta.baguswedanta.com/](https://suitmediatest-wedanta.baguswedanta.com/)

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Development](#development)
- [Configuration](#configuration)
- [API Documentation](#api-documentation)
- [Component Architecture](#component-architecture)
- [Styling](#styling)
- [Performance Optimizations](#performance-optimizations)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## 🎯 Overview

This project is a Next.js-based web application that displays a collection of articles (called "Ideas") fetched from an external API. The application provides a seamless user experience with features like:

- **Dynamic Article Listing**: Display articles in a responsive grid layout with pagination
- **Real-time Sorting**: Sort articles by publication date (newest/oldest)
- **Flexible Pagination**: Choose how many articles to display per page (5, 10, 15, 20)
- **Responsive Design**: Mobile-first approach that works perfectly on all devices
- **Image Optimization**: Lazy loading with automatic placeholder fallback
- **Smooth Animations**: Framer Motion powered transitions and hover effects
- **State Persistence**: User preferences saved to localStorage for better UX
- **Error Handling**: Graceful error handling with user-friendly messages

## ✨ Features

### Core Functionality

- **Article Listing**: Display articles in a responsive grid layout
- **Pagination**: Navigate through multiple pages of articles
- **Sorting**: Sort articles by publication date (ascending/descending)
- **Per-Page Selection**: Customize how many articles to display per page (5, 10, 15, 20)
- **Image Handling**: Automatic fallback to placeholder images when article images fail to load
- **Lazy Loading**: All images use lazy loading for optimal performance
- **Responsive Design**: Fully responsive layout that works on all device sizes
- **State Persistence**: User preferences (page, size, sort) are saved to localStorage

### UI/UX Features

- **Banner Component**: Hero section with parallax scrolling effect
- **Smooth Animations**: Framer Motion animations for page transitions
- **Interactive Cards**: Hover effects on article cards
- **Mobile Navigation**: Responsive mobile menu with smooth transitions
- **Loading States**: Visual feedback during data fetching
- **Error Handling**: Graceful error handling with user-friendly messages

## 🛠 Tech Stack

### Core Framework

- **Next.js 16.1.1** - React framework with App Router
- **React 19.2.3** - UI library
- **TypeScript 5** - Type safety

### Styling

- **Tailwind CSS 4** - Utility-first CSS framework
- **PostCSS** - CSS processing
- **CSS Variables** - Custom theming system

### UI Components & Libraries

- **Radix UI** - Accessible component primitives
  - `@radix-ui/react-dropdown-menu`
  - `@radix-ui/react-slot`
- **Framer Motion 12.25.0** - Animation library
- **Lucide React** - Icon library
- **class-variance-authority** - Component variant management

### Utilities

- **clsx** - Conditional classNames
- **tailwind-merge** - Merge Tailwind classes intelligently

### Development Tools

- **ESLint** - Code linting
- **TypeScript** - Static type checking

## 📁 Project Structure

```
suitmediatest/
├── app/                          # Next.js App Router directory
│   ├── api/                      # API routes
│   │   └── ideas/
│   │       └── route.ts          # Ideas API endpoint handler
│   ├── ideas/                    # Ideas page
│   │   ├── layout.tsx           # Layout for ideas section
│   │   └── page.tsx             # Main ideas page
│   ├── globals.css              # Global styles
│   ├── layout.tsx               # Root layout
│   ├── page.tsx                 # Home page (redirects to /ideas)
│   └── not-found.tsx            # 404 page
│
├── components/                   # Shared UI components
│   └── ui/                      # Reusable UI primitives
│       ├── button.tsx
│       ├── dropdown-menu.tsx
│       └── select.tsx           # Custom select component
│
├── lib/                         # Utility libraries
│   ├── api/                     # API client functions
│   │   ├── ideas.ts            # Client-side API functions
│   │   └── ideas-server.ts     # Server-side API functions
│   └── utils.ts                # General utilities
│
├── shared/                      # Shared resources
│   ├── assets/                 # Static assets
│   │   ├── article/           # Article-related assets
│   │   │   └── placeholder.jpg
│   │   ├── icon/              # Icons
│   │   │   └── dropdown.png
│   │   ├── ideas/             # Ideas section assets
│   │   │   └── homepage_background.webp
│   │   └── navbar/            # Navigation assets
│   │       └── site-logo.webp
│   │
│   └── components/             # Shared React components
│       ├── articles/           # Article-related components
│       │   ├── ArticleCard.tsx
│       │   ├── ArticleList.tsx
│       │   ├── ArticleListView.tsx
│       │   ├── hooks/
│       │   │   └── useArticleList.ts
│       │   ├── utils/         # Article utilities
│       │   │   ├── articleDateUtils.ts
│       │   │   ├── articleFont.ts
│       │   │   ├── articleImageUtils.ts
│       │   │   ├── articleStorageUtils.ts
│       │   │   └── articleUtils.ts
│       │   └── index.ts
│       │
│       ├── banner/             # Banner component
│       │   ├── Banner.tsx
│       │   ├── BannerContent.tsx
│       │   ├── hooks/
│       │   │   └── useBannerParallax.ts
│       │   ├── utils/
│       │   │   └── bannerUtils.ts
│       │   ├── types.ts
│       │   └── index.ts
│       │
│       └── header/             # Header/Navigation component
│           ├── Header.tsx
│           └── data/
│               └── navList.ts
│
├── public/                      # Static public files
│   └── manifest.json
│
├── components.json             # shadcn/ui configuration
├── eslint.config.mjs          # ESLint configuration
├── next.config.ts             # Next.js configuration
├── package.json               # Project dependencies
├── postcss.config.mjs        # PostCSS configuration
├── tsconfig.json             # TypeScript configuration
└── README.md                 # This file
```

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed on your system:

- **Node.js** 18.x or higher - [Download Node.js](https://nodejs.org/)
- **npm** 9.x or higher (comes with Node.js), or you can use:
  - **yarn** - [Install Yarn](https://yarnpkg.com/)
  - **pnpm** - [Install pnpm](https://pnpm.io/)
  - **bun** - [Install Bun](https://bun.sh/)

### Installation Steps

1. **Clone the repository**

```bash
git clone <repository-url>
cd suitmediatest
```

> **Note**: Replace `<repository-url>` with the actual repository URL.

2. **Set up environment variables**

Create a `.env.local` file in the root directory by copying the example file:

```bash
# Copy the example environment file
cp .env.example .env.local

# On Windows (PowerShell)
Copy-Item .env.example .env.local
```

Then edit `.env.local` and update the values according to your environment:

```env
# API Configuration
NEXT_PUBLIC_API_BASE_URL=https://suitmedia-backend.suitdev.com

# Assets CDN URL for images and static assets
NEXT_PUBLIC_ASSETS_BASE_URL=https://assets.suitdev.com

# Site Configuration
NEXT_PUBLIC_SITE_URL=https://suitmediatest-wedanta.baguswedanta.com
```

> **Important**:
>
> - The `.env.local` file is automatically ignored by git (already in `.gitignore`)
> - Never commit sensitive data or API keys to version control
> - For production, set these variables in your deployment platform's environment settings

3. **Install dependencies**

Choose one of the following package managers:

```bash
# Using npm
npm install

# Using yarn
yarn install

# Using pnpm
pnpm install

# Using bun
bun install
```

4. **Run the development server**

```bash
# Using npm
npm run dev

# Using yarn
yarn dev

# Using pnpm
pnpm dev

# Using bun
bun dev
```

5. **Open your browser**

Once the development server is running, navigate to:

- **Development URL**: [http://localhost:3000](http://localhost:3000)

The page will automatically redirect to `/ideas` which is the main content page showing all articles.

> **Tip**: The development server supports Hot Module Replacement (HMR), so changes you make will be reflected immediately in the browser.

## 💻 Development

### Available Scripts

- **`npm run dev`** - Start the development server
- **`npm run build`** - Build the application for production
- **`npm run start`** - Start the production server (requires build first)
- **`npm run lint`** - Run ESLint to check code quality

### Development Workflow

1. The app uses **Next.js App Router** for routing
2. All components are written in **TypeScript** for type safety
3. **Hot Module Replacement (HMR)** is enabled for fast development
4. **ESLint** runs automatically to ensure code quality

### Code Style

- Follow TypeScript best practices
- Use functional components with hooks
- Implement proper error handling
- Add comments for complex logic
- Keep components small and focused

## ⚙️ Configuration

### Next.js Configuration (`next.config.ts`)

The Next.js configuration includes image optimization settings:

```typescript
const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "suitmedia-backend.suitdev.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "assets.suitdev.com",
        pathname: "/**",
      },
    ],
  },
};
```

This allows Next.js Image component to optimize images from these domains.

### TypeScript Configuration (`tsconfig.json`)

- **Target**: ES2017
- **Module**: ESNext
- **JSX**: React JSX
- **Path Alias**: `@/*` maps to project root

### Tailwind Configuration

Tailwind CSS is configured via CSS variables in `globals.css`. Custom brand colors are defined:

- `--brand-primary`: #ff6b35
- `--brand-primary-hover`: #ff6b35e6
- `--brand-primary-scrolled`: #ff6b35f2
- `--text-active`: #f5f5f5
- `--background-page`: #ffffff

## 📡 API Documentation

### External API

The application fetches data from:

```
https://suitmedia-backend.suitdev.com/api/ideas
```

Base URL: [https://suitmedia-backend.suitdev.com/api/ideas](https://suitmedia-backend.suitdev.com/api/ideas)

### API Route (`/api/ideas`)

**Endpoint**: `GET /api/ideas`

**Query Parameters**:

| Parameter                | Type   | Default         | Description                                    |
| ------------------------ | ------ | --------------- | ---------------------------------------------- |
| `page[number]` or `page` | number | 1               | Current page number                            |
| `page[size]` or `size`   | number | 10              | Items per page                                 |
| `sort`                   | string | "-published_at" | Sort order ("published_at" or "-published_at") |

**Response Format**:

```typescript
{
  data: Article[];
  links?: {
    first: string | null;
    last: string | null;
    prev: string | null;
    next: string | null;
  };
  meta?: {
    current_page: number;
    from: number;
    last_page: number;
    per_page: number;
    to: number;
    total: number;
  };
}
```

**Article Interface**:

```typescript
interface Article {
  id: number;
  slug: string;
  title: string;
  content: string;
  published_at: string;
  deleted_at: string | null;
  created_at: string;
  updated_at: string;
  small_image?: ArticleImage[];
  medium_image?: ArticleImage[];
  [key: string]: unknown;
}

interface ArticleImage {
  id: number;
  mime: string;
  file_name: string;
  url: string;
}
```

### API Client Functions

#### Client-Side (`lib/api/ideas.ts`)

```typescript
fetchIdeas(params?: IdeasParams): Promise<IdeasResponse>
```

Fetches ideas from the API route handler (runs on client).

#### Server-Side (`lib/api/ideas-server.ts`)

```typescript
fetchIdeasServer(params?: IdeasParams): Promise<IdeasResponse>
```

Fetches ideas directly from the external API (runs on server).

### Error Handling

The API route handler includes comprehensive error handling:

- **Timeout**: 30-second timeout with abort controller
- **Network Errors**: Detects and handles network failures
- **HTTP Errors**: Properly formats error responses
- **JSON Parsing**: Handles malformed responses gracefully

## 🏗 Component Architecture

### Article Components

#### `ArticleCard`

Displays a single article card with image, title, and publication date.

**Props**:

- `article: Article` - Article data
- `index: number` - Index for animation delay

**Features**:

- Image lazy loading
- Automatic placeholder fallback
- Hover animations
- Responsive image sizing

#### `ArticleList`

Main container component that manages article list state.

**Props**:

- `initialData?: IdeasResponse` - Initial server-rendered data

**Uses**: `useArticleList` hook for state management

#### `ArticleListView`

Presentation component that renders the article list UI.

**Features**:

- Grid layout
- Pagination controls
- Sort dropdown
- Per-page selector

### Banner Components

#### `Banner`

Main banner component wrapper.

**Props**:

- `image: string | { src: string; alt: string }`
- `title?: string`
- `subtitle?: string`
- `height?: "small" | "medium" | "large"`
- `imageAlt?: string`
- `backgroundColor?: string`

**Features**:

- Parallax scrolling effect
- Responsive heights
- Image error handling
- Default background fallback

### Header Component

#### `Header`

Navigation header with scroll behavior.

**Features**:

- Auto-hide on scroll down
- Show on scroll up
- Background color change on scroll
- Responsive mobile menu
- Active route highlighting

## 🎨 Styling

### Tailwind CSS

The project uses Tailwind CSS v4 with the following approach:

- **Utility-first**: Use utility classes for styling
- **Custom Properties**: CSS variables for theming
- **Responsive**: Mobile-first breakpoints
- **Dark Mode**: Support for dark theme (configured but not active by default)

### Custom Utilities

Custom Tailwind utilities defined in `globals.css`:

- `.line-clamp-3` - Truncate text to 3 lines
- `.bg-brand-primary` - Brand primary color
- `.text-brand-primary` - Brand primary text color
- `.text-active` - Active text color
- `.bg-page` - Page background color

### Fonts

- **Geist Sans** - Primary font (loaded via Next.js font optimization)
- **Geist Mono** - Monospace font
- **Roboto Condensed** - Used for article cards (loaded via utility)

### Animation

Framer Motion is used for:

- Page transitions
- Card entrance animations
- Hover effects
- Banner parallax scrolling

## ⚡ Performance Optimizations

### Image Optimization

- **Lazy Loading**: All images use `loading="lazy"`
- **Next.js Image**: Automatic image optimization
- **Responsive Sizes**: Proper `sizes` attribute for responsive images
- **Placeholder Fallback**: Automatic fallback when images fail to load

### Code Optimization

- **Server-Side Rendering**: Initial data fetched on server
- **Client-Side State**: Hydrated on client for interactivity
- **State Persistence**: localStorage for user preferences
- **Memoization**: Proper React hooks usage

### Bundle Optimization

- **Tree Shaking**: Automatic unused code elimination
- **Code Splitting**: Automatic route-based splitting
- **Font Optimization**: Next.js font optimization
- **CSS Optimization**: Tailwind purging unused styles

## 🚢 Deployment

### 🌐 Live Website

The application is currently deployed and accessible at:

**🔗 [https://suitmediatest-wedanta.baguswedanta.com/](https://suitmediatest-wedanta.baguswedanta.com/)**

You can visit the live site to see the application in action with real data from the API.

### Production Build

To build the application for production, follow these steps:

1. **Build the application**:

```bash
npm run build
```

This command will:

- Optimize the application for production
- Create an optimized build in the `.next` folder
- Generate static pages where possible
- Bundle and minify JavaScript and CSS

2. **Start production server**:

```bash
npm run start
```

This will start the production server on port 3000 (or the port specified in your environment).

### Environment Variables

The application uses environment variables for configuration. These are already set up in the codebase.

#### Required Environment Variables

Create a `.env.local` file in the root directory (or copy from `.env.example`):

```env
# API Configuration
NEXT_PUBLIC_API_BASE_URL=https://suitmedia-backend.suitdev.com

# Assets CDN URL for images and static assets
NEXT_PUBLIC_ASSETS_BASE_URL=https://assets.suitdev.com

# Site Configuration
NEXT_PUBLIC_SITE_URL=https://suitmediatest-wedanta.baguswedanta.com
```

#### Environment Variables Explained

| Variable                      | Description                              | Default Value                                    |
| ----------------------------- | ---------------------------------------- | ------------------------------------------------ |
| `NEXT_PUBLIC_API_BASE_URL`    | Base URL for the backend API             | `https://suitmedia-backend.suitdev.com`          |
| `NEXT_PUBLIC_ASSETS_BASE_URL` | CDN URL for images and static assets     | `https://assets.suitdev.com`                     |
| `NEXT_PUBLIC_SITE_URL`        | Public URL of the website (for metadata) | `https://suitmediatest-wedanta.baguswedanta.com` |

> **Security Note**:
>
> - Variables prefixed with `NEXT_PUBLIC_` are exposed to the browser client-side
> - Never use `NEXT_PUBLIC_` prefix for sensitive data like API keys or secrets
> - The `.env.local` file is automatically ignored by git (configured in `.gitignore`)
> - For production deployments, set these variables in your deployment platform's environment settings (Vercel, Netlify, etc.)

#### Setup for Development

1. Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

2. Edit `.env.local` with your values (if different from defaults)

3. Restart the development server after changing environment variables

### Deployment Platforms

#### Vercel (Recommended for Next.js)

Vercel is the easiest platform to deploy Next.js applications:

1. Push your code to GitHub, GitLab, or Bitbucket
2. Import your project in [Vercel](https://vercel.com)
3. Configure build settings (automatically detected for Next.js)
4. Add environment variables if needed
5. Deploy

The deployment will be automatically configured with:

- Automatic HTTPS
- Global CDN
- Automatic deployments on git push
- Preview deployments for pull requests

#### Other Deployment Platforms

The application can be deployed to any platform that supports Node.js:

- **Netlify** - Similar to Vercel, great for Next.js apps
- **AWS Amplify** - AWS hosting solution
- **Google Cloud Run** - Serverless container platform
- **Docker** - Container-based deployment (see Dockerfile section below)
- **Any VPS/Server** - Can run `npm run build && npm run start`

### Docker Deployment (Optional)

Create `Dockerfile`:

```dockerfile
FROM node:18-alpine AS base

FROM base AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM base AS runner
WORKDIR /app
ENV NODE_ENV production
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000
CMD ["node", "server.js"]
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow TypeScript best practices
- Write meaningful commit messages
- Add comments for complex logic
- Test your changes thoroughly
- Ensure ESLint passes
- Update documentation as needed

## 📸 Screenshots & Features

The live website demonstrates the following features:

- **Article Grid Layout**: Responsive grid displaying articles with images, titles, and dates
- **Pagination**: Navigate through 274 articles across multiple pages
- **Sorting Options**: Sort by newest or oldest articles
- **Per-Page Selection**: Choose to display 5, 10, 15, or 20 articles per page
- **Responsive Header**: Navigation menu that adapts to screen size
- **Hero Banner**: Parallax banner with "Ideas" title and subtitle
- **Mobile-Friendly**: Fully responsive design that works on all devices

Visit the [live website](https://suitmediatest-wedanta.baguswedanta.com/) to see these features in action!

## 🔍 Project Highlights

- ✅ **Production Ready**: Successfully deployed and accessible online
- ✅ **Type Safe**: Full TypeScript implementation
- ✅ **Performance Optimized**: Lazy loading, code splitting, and image optimization
- ✅ **SEO Friendly**: Complete metadata and Open Graph tags
- ✅ **Responsive**: Mobile-first design approach
- ✅ **Accessible**: Built with Radix UI for accessibility
- ✅ **Modern Stack**: Latest Next.js 16 with App Router and React 19

## 📝 License

This project is private and proprietary.

## 👥 Authors

Suitmedia Test Project

## 🙏 Acknowledgments

- **Next.js** team for the amazing framework and App Router
- **Tailwind CSS** for the utility-first CSS framework
- **Framer Motion** for smooth animations and transitions
- **Radix UI** for accessible and composable component primitives
- **Vercel** for excellent Next.js deployment experience

---

## 📞 Support

This is a test project for Suitmedia. For questions or issues:

- Visit the [live website](https://suitmediatest-wedanta.baguswedanta.com/)
- Check the [API documentation](#-api-documentation) section
- Review the [Component Architecture](#-component-architecture) for implementation details
- Contact the development team for additional support
