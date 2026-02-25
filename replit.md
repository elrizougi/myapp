# مجرد تكنيك (Justtechnic) Portfolio & Blog

## Overview

Justtechnic (مجرد تكنيك) is a bilingual (Arabic/English) portfolio and blog website for a data analytics and business intelligence company. It showcases services (projects), blog posts, and provides a contact form for inquiries. The application includes a client-facing public site and an admin dashboard for managing content (projects, blog posts, and messages).

The app is built as a full-stack TypeScript application with a React frontend and Express backend, using PostgreSQL for data persistence via Drizzle ORM.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript, bundled by Vite
- **Routing**: Wouter (lightweight client-side router)
- **State Management**: TanStack React Query for server state, React Context (`DataContext`) for shared app state and auth
- **UI Components**: shadcn/ui component library (new-york style) built on Radix UI primitives
- **Styling**: Tailwind CSS v4 with CSS variables for theming, supports dark mode
- **Internationalization**: Custom i18n system (`client/src/lib/i18n.tsx`) with Arabic (RTL) as default and English (LTR) support. The HTML document uses `dir="rtl"` and `lang="ar"` by default
- **Fonts**: Cairo, Tajawal (Arabic), Inter, JetBrains Mono (English/code) loaded from Google Fonts

### Client Directory Structure
- `client/src/pages/` — Public pages (Home, Projects, Blog, Resume, Contact) and admin pages (AdminLogin, Dashboard, ManageProjects, ManageBlog, AdminMessages)
- `client/src/components/` — Reusable components (Navbar, Hero, Footer, ProjectCard, BlogCard, admin/AdminLayout)
- `client/src/components/ui/` — shadcn/ui component library
- `client/src/lib/` — Utilities, query client, i18n, data context
- `client/src/hooks/` — Custom React hooks (use-toast, use-mobile)
- `client/src/data/` — Static fallback data for projects and blog posts

### Backend Architecture
- **Runtime**: Node.js with Express 5
- **Language**: TypeScript, executed via tsx in development
- **API Pattern**: RESTful JSON API under `/api/` prefix
- **Resources**: Projects (`/api/projects`), Blog Posts (`/api/blog-posts`), Messages (`/api/messages`)
- **CRUD Operations**: Full CRUD for projects, blog posts, and messages with Zod validation on create endpoints
- **Storage Layer**: `IStorage` interface in `server/storage.ts` with `DatabaseStorage` implementation using Drizzle ORM

### Server Directory Structure
- `server/index.ts` — Express app setup, middleware, HTTP server creation
- `server/routes.ts` — API route registration
- `server/uploads.ts` — Local file upload handling with multer (saves to `uploads/` directory)
- `server/storage.ts` — Data access layer (interface + PostgreSQL implementation)
- `server/db.ts` — Database connection pool setup
- `server/seed.ts` — Database seeding script with sample Arabic/English content
- `server/vite.ts` — Vite dev server middleware for development
- `server/static.ts` — Static file serving for production builds

### Shared Code
- `shared/schema.ts` — Drizzle ORM table definitions and Zod insert schemas, shared between client and server

### Database Schema (PostgreSQL via Drizzle ORM)
- **users** — id (UUID, auto-generated), username (unique), password
- **projects** — id (serial), title, titleEn, description, descriptionEn, image, tags (text array), demoUrl, repoUrl, featured (boolean)
- **blogPosts** — id (serial), title, titleEn, excerpt, excerptEn, date, dateEn, readTime, readTimeEn, category, categoryEn, featured (boolean)
- **messages** — id (serial), name, email, purpose, message, read (boolean), createdAt (timestamp)

All content tables have bilingual fields (Arabic and English versions).

### Authentication
- Simple client-side authentication via `DataContext` — password-based login stored in React state (not session-based server auth). Admin routes are protected with a `ProtectedRoute` component that redirects to `/admin` login page.

### Build System
- **Development**: Vite dev server proxied through Express with HMR
- **Production Build**: `script/build.ts` runs Vite for client and esbuild for server, outputting to `dist/` directory. Server is bundled as CommonJS (`dist/index.cjs`), client as static files in `dist/public/`
- **Database Migrations**: `drizzle-kit push` for schema synchronization

### Path Aliases
- `@/*` → `client/src/*`
- `@shared/*` → `shared/*`
- `@assets` → `attached_assets/`

## External Dependencies

### Database
- **PostgreSQL** — Primary data store, connected via `DATABASE_URL` environment variable
- **pg** (node-postgres) — PostgreSQL client driver
- **Drizzle ORM** — Type-safe SQL query builder and schema definition
- **drizzle-kit** — Database migration and push tooling
- **connect-pg-simple** — PostgreSQL session store (available but not actively used for auth)

### File Uploads
- **multer** — Handles multipart/form-data file uploads
- Files are saved to a local `uploads/` directory (configurable via `UPLOAD_DIR` env var, defaults to `process.cwd()/uploads`)
- Upload routes: `POST /api/uploads/request-url` returns upload config, `POST /api/uploads` accepts files
- Served statically at `/uploads/<filename>`
- Allowed types: images (JPEG, PNG, GIF, WebP, SVG) and PDF; max 25MB
- For Docker: mount a volume at `/app/uploads` to persist files

### Key NPM Packages
- **Express 5** — HTTP server framework
- **Vite** — Frontend build tool and dev server
- **React 18** — UI library
- **TanStack React Query** — Server state management and data fetching
- **Zod** — Runtime schema validation (used for API input validation)
- **drizzle-zod** — Generates Zod schemas from Drizzle table definitions
- **wouter** — Lightweight client-side routing
- **react-hook-form** — Form state management with `@hookform/resolvers` for Zod integration
- **multer** — Multipart form data / file upload middleware
- **Radix UI** — Headless UI component primitives (full suite installed)
- **Tailwind CSS v4** — Utility-first CSS framework via `@tailwindcss/vite` plugin
- **class-variance-authority (CVA)** — Component variant styling
- **date-fns** — Date utility library
- **embla-carousel-react** — Carousel component
- **recharts** — Charting library (used in chart UI component)
- **vaul** — Drawer component

### Replit-Specific
- `@replit/vite-plugin-runtime-error-modal` — Runtime error overlay in development
- `@replit/vite-plugin-cartographer` — Dev tooling (development only)
- `@replit/vite-plugin-dev-banner` — Development banner (development only)
- Custom `vite-plugin-meta-images` — Automatically updates OpenGraph meta tags with Replit deployment URLs