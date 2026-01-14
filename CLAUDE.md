# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `bun dev` - Start development server at localhost:3000
- `bun build` - Build for production
- `bun lint` - Run ESLint

## Architecture

This is a Next.js 16 personal portfolio website using the App Router with React Server Components.

**Stack:** Next.js 16, React 19, Tailwind CSS v4, Motion (Framer Motion), TypeScript

**Key patterns:**
- Single-page layout with section components (`Hero`, `ProjectCards`, `About`, `Contact`)
- Project data is defined in `data/projects.ts` with typed `Project` interface
- Uses shadcn/ui conventions with `components.json` config (new-york style, stone base color)
- Custom reusable components go in `components/core/` (e.g., `morphing-dialog.tsx`)
- Motion primitives in `components/motion-primitives/`
- Utility function `cn()` in `lib/utils.ts` for className merging

**Styling:**
- Tailwind v4 with CSS variables for theming defined in `app/globals.css`
- Dark mode only (hardcoded `className="dark"` on html element)
- Custom colors: `card-orange`, `card-cream`, `card-cyan`, `card-green`
- Fonts: Playfair Display (headings), IBM Plex Mono (body)

**Client components:** Mark with `"use client"` directive when using React hooks or Motion animations.
