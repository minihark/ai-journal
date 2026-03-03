# AI Journal Assistant - Plan

## App Overview
- **Name**: AI Journal Assistant
- **Date**: 2026-03-03
- **Purpose**: Help users transform casual daily notes into meaningful journal entries using AI

## Stack
- **Framework**: Next.js 16 with TypeScript
- **Styling**: Tailwind CSS 4 with shadcn/ui components
- **AI**: OpenAI API (GPT-4o-mini for cost-effective completions)
- **Storage**: LocalStorage for notes, with option to export to markdown

## Core Features
1. **Note Input**: Simple text area for daily thoughts
2. **AI Transformation**: Convert casual notes into well-written journal entries
3. **Journal Browser**: View past journal entries
4. **Export**: Download entries as markdown files
5. **Stats**: Track writing habits and progress

## Design Goals
- Clean, minimalist interface
- Calming color scheme (soft blues, warm grays)
- Smooth animations and transitions
- Mobile-responsive

## Architecture
```
ai-journal/
├── app/
│   ├── page.tsx (landing - note input)
│   ├── journal/page.tsx (journal browser)
│   └── api/
│       └── generate/
│           └── route.ts (OpenAI API handler)
├── components/
│   ├── note-editor.tsx
│   ├── journal-entry.tsx
│   └── ui/ (shadcn components)
├── lib/
│   └── ai.ts (OpenAI client setup)
└── types/
    └── journal.ts (TypeScript types)
```

## Implementation Status
- ✅ Next.js project initialized
- ✅ shadcn/ui set up (base color: Neutral)
- ✅ UI components added (textarea, button, card, badge, input, label)
- ✅ OpenAI client integration (`lib/ai.ts`)
- ✅ API route created (`app/api/generate/route.ts`)
- ✅ Landing page with note input and AI generation
- ✅ Journal browser page with delete functionality
- ✅ Export to markdown feature
- ✅ README.md created
- ✅ `.env.local.example` created
- ✅ Git repository initialized
- ✅ GitHub repository created: https://github.com/minihark/ai-journal
- ✅ Initial commit pushed to GitHub

## Deployment
- **Status**: Ready for Coolify deployment
- **Method**: https://apps.harkco.se → Create New Resource → GitHub
- **Repository**: https://github.com/minihark/ai-journal
- **URL**: https://ai-journal.apps.harkco.se (pending)

## Next Steps
1. User provides OpenAI API key in `.env.local`
2. Test local development (`npm run dev`)
3. Deploy to Coolify
4. Test deployed version
5. Iterate based on user feedback