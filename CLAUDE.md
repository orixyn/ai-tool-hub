# AI Tool Hub

AIツールを検索・比較・管理できるWebアプリケーション。

## Tech Stack

- **Framework**: Next.js 16 (App Router, Turbopack)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS v4
- **Auth**: Clerk (`@clerk/nextjs` v7)
- **Database**: Supabase (PostgreSQL)
- **Icons**: Lucide React
- **Hosting**: Vercel
- **Package Manager**: npm

## Project Structure

```
src/
├── app/
│   ├── layout.tsx              # Root layout (ClerkProvider + Header/Footer)
│   ├── page.tsx                # Top page (hero + featured tools + categories)
│   ├── tools/
│   │   ├── page.tsx            # Tool list (search + category filter)
│   │   └── [slug]/page.tsx     # Tool detail (overview, pricing, actions)
│   ├── dashboard/
│   │   ├── layout.tsx          # Auth guard
│   │   ├── page.tsx            # Dashboard overview
│   │   ├── favorites/page.tsx  # Favorites list
│   │   └── bookmarks/page.tsx  # Bookmarks & ToDo
│   ├── sign-in/                # Clerk Sign In
│   └── sign-up/                # Clerk Sign Up
├── components/
│   ├── layout/                 # Header, Footer
│   ├── tools/                  # ToolCard, ToolGrid, CategoryFilter, SearchBar
│   ├── favorites/              # FavoriteButton
│   └── bookmarks/              # BookmarkButton, BookmarkList, BookmarkItem
├── actions/
│   ├── favorites.ts            # Favorite CRUD (Server Actions)
│   └── bookmarks.ts            # Bookmark CRUD (Server Actions)
├── lib/
│   ├── supabase/
│   │   ├── client.ts           # Browser client
│   │   ├── server.ts           # Server client (cookie-based)
│   │   └── types.ts            # Database type definitions
│   └── constants.ts            # Categories, pricing labels
└── middleware.ts               # Clerk auth middleware
```

## Database

4 tables: `categories`, `tools`, `favorites`, `bookmarks`
- Migration SQL: `supabase/migrations/`
- User management is handled by Clerk (no users table)
- `favorites` and `bookmarks` reference Clerk's `user_id` as text

## Environment Variables

Required in `.env.local`:
```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

## Key Patterns

- **Server Actions** for mutations (favorites, bookmarks) — defined in `src/actions/`
- **Supabase client/server separation** — browser uses `createBrowserClient`, server uses `createServerClient` with cookie handling
- **Clerk v7**: `SignedIn`/`SignedOut` components removed; use `useAuth()` hook instead
- **Optimistic UI** on FavoriteButton and BookmarkButton via `useTransition`
- **Auth guard**: `/dashboard/**` routes protected in both middleware and layout
- **Type casting**: Supabase query results cast to explicit types due to manual type definitions (will be replaced by `supabase gen types` later)

## Commands

- `npm run dev` — Start dev server
- `npm run build` — Production build
- `npm run lint` — ESLint check
