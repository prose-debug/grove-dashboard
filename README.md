# Grove Dashboard

Beautiful web interface for browsing Grove learnings and personalized dashboards.

## Features

- **Learnings Browse** - Full-text search and category filtering across 1,000+ learnings
- **Role Dashboard** - Personalized dashboards for QA, Developers, PMs, and new hires
- **Team Metrics** - Adoption rates and team learning progress
- **Responsive Design** - Built with Next.js and Tailwind CSS

## Tech Stack

- **Next.js 16** + React 19 + TypeScript
- **Tailwind CSS v4** for styling
- **better-sqlite3 + Drizzle ORM** for type-safe database access
- **Recharts** for data visualization

## Setup

```bash
npm install
npm run dev
```

Visit `http://localhost:3001/learnings` to get started.

## Database

Connects to the read-only learnings database at:
```
/Users/microwave/Desktop/grove/cory-learnings/learnings.db
```

## File Structure

```
grove-dashboard/
├── src/
│   ├── app/
│   │   ├── api/              # API routes for learnings data
│   │   ├── dashboard/        # Role-based dashboards
│   │   ├── learnings/        # Browse learnings
│   │   ├── team/             # Team metrics
│   │   └── layout.tsx        # Root layout
│   ├── components/           # React components
│   ├── db/                   # Database schema and client
│   └── globals.css           # Design system (Tailwind + CSS vars)
├── public/
├── package.json
└── tsconfig.json
```

## Development

```bash
npm run dev       # Start dev server (port 3001)
npm run build     # Build for production
npm run start      # Run production build
npm run lint      # Run ESLint
npm test          # Run Jest tests
```
