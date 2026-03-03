'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';

export default function Home() {
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const [journalEntry, setJournalEntry] = useState('');
  const [error, setError] = useState('');
  const [keyPoints, setKeyPoints] = useState<string[]>([]);

  const handleGenerate = async () => {
    if (!notes.trim()) {
      setError('Please enter your notes first');
      return;
    }

    setLoading(true);
    setError('');
    setJournalEntry('');
    setKeyPoints([]);

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ notes }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate journal entry');
      }

      setJournalEntry(data.journalEntry);
      setKeyPoints(data.keyPoints);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleExport = () => {
    const content = `# Journal Entry\n\n${journalEntry}\n\n## Key Points\n${keyPoints.map(point => `- ${point}`).join('\n')}`;
    const blob = new Blob([content], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `journal-entry-${new Date().toISOString().split('T')[0]}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const clearAll = () => {
    setNotes('');
    setJournalEntry('');
    setKeyPoints([]);
    setError('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-50 to-zinc-100 dark:from-zinc-950 dark:to-zinc-900 font-sans">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="flex flex-col items-center justify-center space-y-8">
          {/* Header */}
          <div className="text-center space-y-4 max-w-2xl">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
              AI Journal Assistant
            </h1>
            <p className="text-xl text-zinc-600 dark:text-zinc-400">
              Transform your casual notes into thoughtful, reflective journal entries
            </p>
          </div>

          {/* Main Card */}
          <Card className="w-full max-w-2xl shadow-2xl border-zinc-200 dark:border-zinc-800">
            <CardHeader className="space-y-2 border-b border-zinc-200 dark:border-zinc-800">
              <CardTitle className="text-2xl">Your Daily Reflection</CardTitle>
              <CardDescription>
                Write your thoughts and let AI help you craft a beautiful journal entry
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6 p-6">
              {/* Error Message */}
              {error && (
                <div className="rounded-lg bg-red-50 dark:bg-red-950/30 p-4 border border-red-200 dark:border-red-900/50">
                  <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
                  <Button variant="ghost" size="sm" onClick={clearAll} className="mt-2 h-8 text-xs">
                    Clear All
                  </Button>
                </div>
              )}

              {/* Note Input */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                    Today's Notes
                  </label>
                  <span className="text-xs text-zinc-500">
                    {notes.length} characters
                  </span>
                </div>
                <Textarea
                  placeholder="Write about your day, your thoughts, or anything on your mind..."
                  className="min-h-[200px] resize-none text-base"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                />
                <div className="flex justify-end">
                  <Button variant="ghost" size="sm" onClick={clearAll}>
                    Clear
                  </Button>
                </div>
              </div>

              {/* Generate Button */}
              <Button
                className="w-full h-12 text-lg font-medium"
                size="lg"
                onClick={handleGenerate}
                disabled={loading || !notes.trim()}
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <svg className="h-5 w-5 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Generating...
                  </span>
                ) : (
                  'Generate Journal Entry'
                )}
              </Button>

              {/* Key Points */}
              {keyPoints.length > 0 && (
                <div className="space-y-3 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                    Key Points
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {keyPoints.map((point, index) => (
                      <Badge
                        key={index}
                        className="bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300"
                      >
                        {point}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Generated Journal Entry */}
              {journalEntry && (
                <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium text-zinc-900 dark:text-zinc-100">
                      Your Journal Entry
                    </h3>
                    <Button variant="outline" size="sm" onClick={handleExport}>
                      Download as Markdown
                    </Button>
                  </div>
                  <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950/50 p-6">
                    <pre className="whitespace-pre-wrap text-sm text-zinc-800 dark:text-zinc-300">
                      {journalEntry}
                    </pre>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Footer */}
          <div className="text-center text-sm text-zinc-500 dark:text-zinc-400">
            <p>AI-powered journaling powered by OpenAI</p>
          </div>
        </div>
      </div>
    </div>
  );
}