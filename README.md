# ⚡ ContextIQ — AI Chief of Staff

> Turns every meeting into living business intelligence

## Quick Start

```bash
npm install
cp .env.example .env.local
# Fill in your API keys in .env.local
npx prisma db push
npm run db:seed
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Stack
- **Frontend**: Next.js 14, React, TypeScript, TailwindCSS, Framer Motion
- **Backend**: Next.js API Routes, Prisma ORM
- **AI**: OpenAI GPT-4o, Whisper v3
- **Database**: PostgreSQL + pgvector
- **Cache**: Upstash Redis
- **Storage**: AWS S3
- **Realtime**: Pusher
- **Billing**: Stripe
- **Auth**: NextAuth.js

## Features
- 🎙️ Real-time meeting recording & transcription
- 🧠 AI-powered summaries, actions & insights
- 🕸️ Knowledge graph with entity extraction
- 📊 Analytics & team performance
- 👥 CRM intelligence with sentiment scoring
- 🤖 AI Chief of Staff chat interface
- 🔗 Integrations: Salesforce, Slack, Notion, Zoom, HubSpot

## Folder Structure
```
src/
├── app/          # Next.js 14 App Router
├── components/   # React components
├── lib/          # Core libraries (OpenAI, Prisma, etc.)
├── services/     # Business logic
├── hooks/        # Custom React hooks
├── store/        # Zustand state management
├── types/        # TypeScript types
└── config/       # App configuration
```