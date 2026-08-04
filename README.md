# 🏃 DustTrainers - Race & Event Management Platform

[![Next.js](https://img.shields.io/badge/Next.js-15.5.7-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18.3.1-61DAFB?style=for-the-badge&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Redux Toolkit](https://img.shields.io/badge/Redux_Toolkit-2.7.0-764ABC?style=for-the-badge&logo=redux)](https://redux-toolkit.js.org/)
[![Stripe](https://img.shields.io/badge/Stripe-Integration-635BFF?style=for-the-badge&logo=stripe)](https://stripe.com/)

**DustTrainers** is a comprehensive, full-stack event and race management platform designed for marathon runners, event organizers (vendors), and platform administrators. Built with Next.js 15 App Router, TypeScript, Redux Toolkit, Mapbox, Stripe, and WebSockets, it provides seamless end-to-end race discovery, ticket registration, event creation, real-time messaging, and multi-role administrative dashboards.

---

## 📋 Table of Contents

- [Key Features](#-key-features)
- [User Roles & Permissions](#-user-roles--permissions)
- [Tech Stack](#-tech-stack)
- [Project Architecture & Directory Structure](#-project-architecture--directory-structure)
- [State Management & API Layer](#-state-management--api-layer)
- [Environment Variables](#-environment-variables)
- [Getting Started](#-getting-started)
- [Scripts & Commands](#-scripts--commands)
- [Deployment](#-deployment)

---

## ✨ Key Features

### 🏁 Public Portal & Event Discovery
- **Hero & Interactive Map Discovery**: Search races by location, category, date range, or keywords using Mapbox interactive maps.
- **Race Categories & Listing**: Browse events with grid/map toggle views, distance filters, and sorting.
- **Detailed Event Pages**: Comprehensive race overviews including schedules, route maps, vendor profiles, FAQs, user reviews, ratings, and active comment threads.
- **Online Booking & Stripe Checkout**: Multi-step ticket registration workflow with real-time add-on calculations and Stripe payment gateway integration.
- **PDF Ticket Export**: Downloadable race entry passes featuring event details and dynamic formatting built with `jspdf` and `html2canvas`.
- **Community Forum**: Community feed for runners to post updates, share experiences, upload images, like, and comment.
- **Real-Time Direct Messaging**: Live WebSocket chat system connecting participants, organizers, and support teams.

### 👥 Role-Based Dashboards
#### 🛡️ Admin Dashboard (`/dashboard/admin`)
- Platform-wide statistics (total users, active vendors, listed events, booking metrics, revenue).
- **Event Management**: Review, approve, reject, edit, or delete submitted race events.
- **Vendor Directory**: Manage vendor accounts, verify organization status, and view detailed profiles.
- **Community Moderation**: Monitor posts, manage flags/comments, and enforce guidelines.
- **Subscriber Management**: View and export newsletter subscribers list.

#### 🎪 Vendor / Organizer Dashboard (`/dashboard/vendor`)
- Organizer metrics tracking total events hosted, total ticket sales, and total earnings.
- **Multi-Step Event Creator**: Dynamic event builder with interactive Mapbox location picker, custom FAQ builder, ticket tier setup, and multi-media dropzone (images, video preview, PDF documents).
- **Event Portfolio**: Manage created races/expos and share event links directly.
- **Vendor Profile**: Update organization details, payment details (Stripe onboarding link), and contact info.

#### 🏃 User / Runner Dashboard (`/dashboard/user`)
- Overview of registered races, upcoming schedules, and event history.
- **My Tickets**: Quick access to confirmed bookings with downloadable PDF tickets.
- **Saved Events**: Bookmark favorite races for quick tracking.
- **Personal Profile**: Manage user credentials, avatar, and contact details.

---

## 🔐 User Roles & Permissions

The application implements strict Role-Based Access Control (RBAC) via JWT tokens and the `WithRole` higher-order component:

| Role | Access Level | Key Capabilities |
| :--- | :--- | :--- |
| **Public / Guest** | Read-Only & Registration | Explore events, read community posts, register/login, submit contact inquiries. |
| **User (Runner)** | Participant Portal | Book tickets, view/download tickets, save events, participate in community discussions, chat with vendors/admin. |
| **Vendor (Organizer)** | Host Portal | Create and manage race events, view event sales metrics, share event links, chat with users. |
| **Admin** | System Overseer | Full system access, approve/reject events, manage users/vendors, moderate community content, monitor platform revenue. |

---

## 🛠️ Tech Stack

### Core Framework & Frontend
- **Framework**: [Next.js 15.5.7](https://nextjs.org/) (App Router with Turbopack)
- **Library**: [React 18.3.1](https://react.dev/) & TypeScript 5
- **Styling**: Tailwind CSS v4, Ant Design (`antd`), Shadcn UI (Radix UI primitives)
- **Animations**: Framer Motion, Lottie React, Swiper.js

### State Management & Communication
- **State & Data Fetching**: Redux Toolkit (`@reduxjs/toolkit`) & RTK Query
- **State Persistence**: `redux-persist` with SSR fallback storage
- **Real-Time Communication**: WebSockets (`SocketProvider` context)

### Forms & Validation
- **Form Management**: React Hook Form
- **Schema Validation**: Zod (`@hookform/resolvers/zod`)
- **Custom Form Architecture**: Reusable `MyForm` component suit (`MyFormInput`, `MyFormAddress`, `MyFormFileUpload`, `MyFormDatePicker`, `MyFormSelect`, etc.)

### Third-Party Services & Utilities
- **Maps & Geolocation**: Mapbox GL JS (`react-map-gl`, `@mapbox/mapbox-sdk`), Google Maps React
- **Payments**: Stripe (`@stripe/stripe-js`, `@stripe/react-stripe-js`)
- **Authentication**: JWT token auto-refresh flow, NextAuth (`next-auth`) for social OAuth (Google, Facebook, Apple)
- **PDF Generation**: `html2canvas` & `jspdf`
- **Charts & Data Visualization**: Recharts
- **Notifications**: Sonner & SweetAlert2

---

## 📁 Project Architecture & Directory Structure

```
race-event-management/
├── public/                  # Static assets and public resources
├── src/
│   ├── app/                 # Next.js App Router Pages & Layouts
│   │   ├── (auth)/          # Auth routes (login, register, reset-password, verify-email)
│   │   ├── (chat)/          # Real-time chat routes
│   │   ├── (common)/        # Public routes (home, race-categories, community, about, contact)
│   │   ├── (dashboard)/     # Dashboard routes (admin, vendor, user)
│   │   ├── globals.css      # Global styles & Tailwind configuration
│   │   └── layout.tsx       # Root Layout wrapped with Redux, Socket, NextAuth, and Toaster
│   ├── assets/              # Static images, icons, and SVG assets
│   ├── components/          # Modular React Components
│   │   ├── cards/           # Event, Post, Comment, Review, Stat, and Expo cards
│   │   ├── dashboard/       # Role-specific dashboard layouts and navigation sidebars
│   │   ├── pages/           # Page-specific complex UI sections
│   │   ├── shared/          # Navbar, Footer, Loading spinners, Section headers
│   │   ├── ui/              # Radix UI primitives & custom `MyForm` input components
│   │   └── ui-library/      # Additional reusable UI elements
│   ├── lib/                 # Mock data generators, context providers, utility functions
│   ├── nextAuth/            # NextAuth options (OAuth providers) & session provider
│   ├── provider/            # WebSocket provider (SocketProvider.tsx)
│   ├── redux/               # Redux store & RTK Query API slices
│   │   ├── api/             # Base API configuration with JWT auto-refresh logic
│   │   ├── features/        # RTK Query slices (admin, auth, booking, chat, community, event, vendor, etc.)
│   │   ├── hooks.ts         # Typed Redux hooks (`useAppDispatch`, `useAppSelector`)
│   │   └── store.ts         # Redux store setup with persistence
│   ├── role-wrapper/        # `WithRole.tsx` RBAC security wrapper
│   ├── types/               # TypeScript interfaces & types (Events, User, Post, Common)
│   └── utils/               # Toast handlers, token verifiers, smooth scrollers, logout helpers
├── .env                     # Environment variables configuration
├── next.config.ts           # Next.js configuration
├── package.json             # Dependencies and scripts
├── postcss.config.mjs       # PostCSS configuration for Tailwind
└── tsconfig.json            # TypeScript compiler configuration
```

---

## ⚡ State Management & API Layer

The application utilizes **Redux Toolkit** alongside **RTK Query** (`baseApi.ts`) for server state management:

- **Automatic Token Refresh**: The `baseQueryWithRefreshToken` interceptor automatically catches `401 Unauthorized` or expired JWT errors and executes a token refresh flow via `/auth/refresh-token` without requiring the user to re-authenticate manually.
- **Tag Invalidation**: Automatic cache invalidation across tags: `user`, `event`, `community`, `admin`, `subscriber`, `vendor`, `booking`, and `chat`.
- **State Persistence**: The `auth` slice is persisted in local storage (`redux-persist`), ensuring sessions remain intact across browser reloads.

---

## 🔑 Environment Variables

Create a `.env` file in the root directory and configure the following variables:

```env
# Mapbox Token (Required for maps & location pickers)
NEXT_PUBLIC_MAPBOX_TOKEN=your_mapbox_public_token

# Backend REST API Base URL
NEXT_PUBLIC_BASE_URL=https://api.example.com/api/v1

# WebSocket Server URL (Required for live chat)
NEXT_PUBLIC_SOCKET_URL=wss://api.example.com

# Stripe Publishable Key (Required for payment checkout)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key

# NextAuth & OAuth Credentials (Optional / Social Logins)
NEXT_PUBLIC_NEXT_AUTH_SECRET=your_next_auth_secret
NEXT_PUBLIC_GOOGLE_ID=your_google_client_id
NEXT_PUBLIC_GOOGLE_SECRET=your_google_client_secret
NEXT_PUBLIC_FACEBOOK_ID=your_facebook_client_id
NEXT_PUBLIC_FACEBOOK_SECRET=your_facebook_client_secret
NEXT_PUBLIC_APPLE_ID=your_apple_client_id
NEXT_PUBLIC_APPLE_SECRET=your_apple_client_secret
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js**: `v18.x` or `v20.x` recommended
- **npm**, **yarn**, **pnpm**, or **bun**

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/moriyam-mohona/race-event-management.git
   cd race-event-management
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Create a `.env` file in the project root as described in the [Environment Variables](#-environment-variables) section.

4. **Run the Development Server**:
   ```bash
   npm run dev
   ```

5. **Open the Application**:
   Navigate to [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📜 Scripts & Commands

| Script | Command | Description |
| :--- | :--- | :--- |
| **Development** | `npm run dev` | Starts Next.js dev server with Turbopack enabled. |
| **Build** | `npm run build` | Compiles production-optimized build. |
| **Production Start** | `npm run start` | Launches production server on port 5001 (`--port 5001`). |
| **Lint** | `npm run lint` | Runs Next.js ESLint check across all files. |

---

## 🌐 Deployment

### Deploy on Vercel
The easiest way to deploy this Next.js app is via [Vercel](https://vercel.com/):

1. Push your code to GitHub / GitLab / Bitbucket.
2. Import your repository into Vercel.
3. Configure the Environment Variables listed above in the Vercel Dashboard project settings.
4. Click **Deploy**.

---

### Developed for DustTrainers Race & Event Management
