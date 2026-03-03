import { OpenAI } from 'openai';

// Get OpenAI API key from environment
const apiKey = process.env.OPENAI_API_KEY;

if (!apiKey) {
  console.warn('OPENAI_API_KEY not set. AI features will be limited.');
}

export const openai = new OpenAI({
  apiKey,
});

// System prompt for journal entry generation
export const JOURNAL_SYSTEM_PROMPT = `You are an AI journal assistant. Your task is to transform casual user notes into well-written, reflective journal entries.

Guidelines:
1. Keep the tone personal and reflective
2. Expand on key points mentioned by the user
3. Add thoughtful reflections and insights
4. Maintain the user's voice and perspective
5. Format with proper paragraphs and structure
6. End with a positive reflection or forward-looking statement

Return only the journal entry text, no additional commentary.`;

// Function to generate a journal entry from notes
export async function generateJournalEntry(notes: string): Promise<string> {
  if (!apiKey) {
    return `# Journal Entry\n\n${notes}\n\n[AI generation not available - API key not configured]`;
  }

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: JOURNAL_SYSTEM_PROMPT,
        },
        {
          role: 'user',
          content: `Here are my notes from today:\n\n${notes}\n\nPlease transform these into a thoughtful journal entry.`,
        },
      ],
      temperature: 0.7,
      max_tokens: 2000,
    });

    return completion.choices[0]?.message?.content || notes;
  } catch (error) {
    console.error('Error generating journal entry:', error);
    return `# Journal Entry\n\n${notes}\n\n[Error generating AI summary: ${error instanceof Error ? error.message : 'Unknown error'}]`;
  }
}

// Function to extract key points from notes
export async function extractKeyPoints(notes: string): Promise<string[]> {
  if (!apiKey) {
    return ['Key point extraction not available'];
  }

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: `Extract 3-5 key points from the user's notes. Return as a JSON array of strings. Keep points concise (5-10 words each).`,
        },
        {
          role: 'user',
          content: notes,
        },
      ],
      temperature: 0.5,
      max_tokens: 500,
      response_format: { type: 'json_object' },
    });

    const content = completion.choices[0]?.message?.content || '[]';
    const points = JSON.parse(content);
    return Array.isArray(points) ? points : ['Key point extraction failed'];
  } catch (error) {
    console.error('Error extracting key points:', error);
    return ['Error extracting key points'];
  }
}