# Nexora: Backend Architecture & Service Map

The Nexora backend is a modular, high-performance Node.js environment designed for scalability, security, and AI orchestration.

## 1. Directory Structure
The application follows a module-based structure where Each feature area is self-contained.

``` text
src/
├── modules/ (Feature-specific logic)
│   ├── auth/          # JWT, OAuth (Google), 2FA (TOTP)
│   ├── user/          # Profiles, RBAC, settings
│   ├── billing/       # Stripe integrations & Webhooks
│   ├── ai/            # Gemini AI proxy & Analysis
│   ├── blog/          # Content management & SEO
│   ├── seo/           # Sitemap & Metadata APIs
│   ├── media/         # S3/R2 storage & Image processing
│   └── notifications/ # Email & In-app alerts
├── middleware/ (Global request filters)
│   ├── firebaseGuard.ts # Firebase Token Verification
│   ├── authGuard.ts     # Internal JWT & Role checks
│   ├── validate.ts      # Zod schema validation
│   ├── rateLimiter.ts   # DDoS protection via Redis
│   └── errorHandler.ts  # Unified error response engine
├── jobs/ (Async background processing)
│   └── workers for emails, payments, and AI tasks
├── lib/ (Shared utilities & Singletons)
│   ├── db.ts          # Prisma client
│   ├── redis.ts       # ioredis client
│   ├── stripe.ts      # Stripe SDK
│   └── gemini.ts      # Google AI client
├── config/ (Validated environment settings)
└── server.ts (App entry point)
```

## 2. Core Security Model
- **Primary Auth:** Firebase Authentication for client-side identity.
- **Verification:** `firebaseGuard.ts` intercept requests to verify ID tokens via `firebase-admin`.
- **RBAC:** Secondary `authGuard.ts` handles internal role-based access control and JWT refresh flows.

## 3. High-Performance Job Pipeline
All heavy lifting (emailing, image resizing, AI analysis) is offloaded to **BullMQ** workers in the `jobs/` directory, backed by Redis for persistence and concurrency control.

## 4. Environment & Validation
Configuration is strictly managed in `src/config` using **Zod** for schema validation. The application will fail to start if required environment variables are missing or malformed.
