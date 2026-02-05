# Subly Frontend

A modern subscription management SaaS application built with React, TypeScript, and Vite.

## 🚀 Features

- **Authentication**: Secure signup/login with JWT
- **Customer Management**: Track and manage your customers
- **Subscription Tracking**: Monitor active subscriptions and renewals
- **Plan Management**: Create and manage subscription plans
- **Dashboard Analytics**: Visual insights with charts and statistics
- **Responsive Design**: Mobile-first UI with Tailwind CSS
- **Google Analytics**: Integrated tracking with GA4

## 🛠️ Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Fast build tool
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **Tailwind CSS** - Utility-first CSS
- **Recharts** - Data visualization
- **React GA4** - Google Analytics integration

## 📁 Project Structure

```
src/
├── api/              # API client & endpoints
├── auth/             # Authentication context & protected routes
├── components/       # Reusable UI components
├── pages/            # Page components
├── router/           # Route configuration
├── types/            # TypeScript type definitions
└── utils/            # Helper functions (analytics, etc.)
```

## 🚦 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd subly-frontend
```

2. Install dependencies
```bash
npm install
```

3. Configure environment variables

Create a `.env` file in the root:

```env
VITE_API_URL=http://localhost:5005
VITE_GA_ID=G-XXXXXXXXXX
```

4. Start development server
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

## 🏗️ Build & Deploy

### Build for production
```bash
npm run build
```

### Preview production build
```bash
npm run preview
```

### Deploy to Vercel

1. Connect your repository to Vercel
2. Set environment variables:
   - `VITE_API_URL` - Your backend API URL
   - `VITE_GA_ID` - Google Analytics ID
3. Deploy

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Lint code with ESLint

## 🔒 Authentication

The app uses JWT tokens stored in `localStorage`. Protected routes automatically redirect unauthenticated users to `/login`.

## 🎨 Styling

Tailwind CSS is configured with custom utilities. See `tailwind.config.js` for theme customization.

## 📊 Analytics

Google Analytics 4 is integrated to track:
- Page views on route changes
- Custom events (via `logEvent` utility)

## 🔗 API Integration

All API calls go through `src/api/axios.ts` which:
- Automatically injects auth tokens
- Handles 401 redirects
- Shows rate limit alerts (429)

## DEMO

https://subly-silk.vercel.app/

## Backend

https://github.com/PauSerranoHerraiz/subly-backend

## 🤝 Contributing

Contributions are welcome! Please open an issue or PR.
