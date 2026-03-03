import { NextRequest, NextResponse } from 'next/server';
import { generateJournalEntry, extractKeyPoints } from '@/lib/ai';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { notes } = body;

    if (!notes || typeof notes !== 'string' || notes.trim().length === 0) {
      return NextResponse.json(
        { error: 'Notes are required and must be non-empty' },
        { status: 400 }
      );
    }

    // Generate journal entry
    const journalEntry = await generateJournalEntry(notes);

    // Extract key points
    const keyPoints = await extractKeyPoints(notes);

    return NextResponse.json({
      journalEntry,
      keyPoints,
    });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'An error occurred' },
      { status: 500 }
    );
  }
}