# AI Journal Assistant

Transform your casual notes into thoughtful, reflective journal entries using AI.

## Features

- **AI-Powered Journaling**: Turn your daily notes into beautifully written journal entries
- **Key Point Extraction**: Automatically extract and highlight key insights from your notes
- **Journal Browser**: Browse and manage all your past entries
- **Export to Markdown**: Download your journal entries as `.md` files
- **Responsive Design**: Works beautifully on desktop and mobile

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS 4 with shadcn/ui
- **AI**: OpenAI GPT-4o-mini
- **Language**: TypeScript
- **Storage**: LocalStorage (client-side)

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, or pnpm
- OpenAI API key ([get one here](https://platform.openai.com/api-keys))

### Installation

1. Clone or navigate to the project directory:

```bash
cd ai-journal
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env.local` file with your OpenAI API key:

```bash
cp .env.local.example .env.local
```

Edit `.env.local` and add your API key:

```
OPENAI_API_KEY=your_api_key_here
```

4. Run the development server:

```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Usage

1. **Write your notes** on the homepage about your day, thoughts, or anything on your mind
2. **Click "Generate Journal Entry"** - the AI will transform your notes into a well-written journal entry
3. **Review key points** - AI extracts the most important insights from your notes
4. **Export or save** - Download your journal entry as a markdown file or save it to the journal browser
5. **Browse history** - View all your past entries in the `/journal` page

## Project Structure

```
ai-journal/
├── app/
│   ├── api/
│   │   └── generate/
│   │       └── route.ts      # OpenAI API integration
│   ├── journal/
│   │   └── page.tsx          # Journal browser page
│   ├── page.tsx              # Main landing page
│   └── layout.tsx            # Root layout
├── components/
│   └── ui/                   # shadcn/ui components
├── lib/
│   └── ai.ts                 # OpenAI client and utilities
├── public/                   # Static assets
├── .env.local                # Environment variables (not committed)
├── .env.local.example        # Example environment variables
├── next.config.js
├── package.json
└── tsconfig.json
```

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `OPENAI_API_KEY` | Your OpenAI API key | Yes (for AI features) |

## Deployment

This app can be deployed to various platforms:

- **Vercel**: [One-click deploy](https://vercel.com/new)
- **Netlify**: Drag and drop the `dist` folder
- **Railway**: Connect your GitHub repository
- **Other platforms**: Follow Next.js deployment docs

## Privacy & Security

- Your notes and journal entries are stored locally in your browser's localStorage
- The OpenAI API calls are made server-side via API routes
- Your API key is stored in environment variables, never in the code
- Entries are only as secure as your local storage (clear browser data for privacy)

## License

MIT