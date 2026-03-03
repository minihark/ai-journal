'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface JournalEntry {
  id: string;
  notes: string;
  entry: string;
  keyPoints: string[];
  date: string;
}

export default function JournalPage() {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [selectedEntry, setSelectedEntry] = useState<JournalEntry | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load entries from localStorage
    const loadEntries = () => {
      try {
        const savedEntries = localStorage.getItem('ai-journal-entries');
        const parsed = savedEntries ? JSON.parse(savedEntries) : [];
        setEntries(parsed);
      } catch (e) {
        console.error('Error loading entries:', e);
      } finally {
        setLoading(false);
      }
    };

    loadEntries();
  }, []);

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this entry?')) {
      const newEntries = entries.filter(entry => entry.id !== id);
      localStorage.setItem('ai-journal-entries', JSON.stringify(newEntries));
      setEntries(newEntries);
      if (selectedEntry?.id === id) {
        setSelectedEntry(null);
      }
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 font-sans py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
              Your Journal
            </h1>
            <p className="text-zinc-600 dark:text-zinc-400 mt-2">
              Browse your past reflections and insights
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Badge className="bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">
              {entries.length} {entries.length === 1 ? 'entry' : 'entries'}
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Entries List */}
          <div className="space-y-4">
            {loading ? (
              <div className="flex items-center justify-center h-64 text-zinc-500">
                <svg className="h-8 w-8 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span className="ml-3">Loading your journal...</span>
              </div>
            ) : entries.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-64 border-2 border-dashed border-zinc-300 dark:border-zinc-700 rounded-lg">
                <p className="text-zinc-500 dark:text-zinc-400">No entries yet</p>
                <p className="text-sm text-zinc-400 dark:text-zinc-500 mt-2">
                  Write some notes on the homepage to get started
                </p>
              </div>
            ) : (
              entries
                .slice()
                .reverse()
                .map((entry) => (
                  <Card
                    key={entry.id}
                    className={`cursor-pointer transition-all hover:shadow-md ${
                      selectedEntry?.id === entry.id
                        ? 'border-zinc-900 dark:border-zinc-50 ring-2 ring-zinc-900 dark:ring-zinc-50'
                        : 'border-zinc-200 dark:border-zinc-800'
                    }`}
                    onClick={() => setSelectedEntry(selectedEntry?.id === entry.id ? null : entry)}
                  >
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base flex items-center justify-between">
                        <span>{entry.date}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(entry.id);
                          }}
                          className="h-6 text-xs"
                        >
                          Delete
                        </Button>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex flex-wrap gap-1">
                          {entry.keyPoints.slice(0, 3).map((point, i) => (
                            <Badge key={i} variant="secondary" className="text-xs">
                              {point}
                            </Badge>
                          ))}
                          {entry.keyPoints.length > 3 && (
                            <Badge variant="secondary" className="text-xs">
                              +{entry.keyPoints.length - 3} more
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-zinc-600 dark:text-zinc-400 line-clamp-2">
                          {entry.notes}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))
            )}
          </div>

          {/* Selected Entry View */}
          <div className="min-h-[400px]">
            {selectedEntry ? (
              <Card className="h-full border-zinc-200 dark:border-zinc-800">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl">{formatDate(selectedEntry.date)}</CardTitle>
                    <Button variant="outline" size="sm" onClick={() => setSelectedEntry(null)}>
                      Close
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 mb-2">
                      Original Notes
                    </h3>
                    <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950/50 p-4 text-sm">
                      {selectedEntry.notes}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 mb-2">
                      AI Journal Entry
                    </h3>
                    <div className="prose prose-zinc dark:prose-invert max-w-none text-sm">
                      <pre className="whitespace-pre-wrap text-zinc-800 dark:text-zinc-300">
                        {selectedEntry.entry}
                      </pre>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 mb-2">
                      Key Points
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedEntry.keyPoints.map((point, index) => (
                        <Badge key={index} className="bg-zinc-100 dark:bg-zinc-800">
                          {point}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <div className="flex flex-col items-center justify-center h-[400px] border-2 border-dashed border-zinc-300 dark:border-zinc-700 rounded-lg">
                <svg className="h-12 w-12 text-zinc-400 dark:text-zinc-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                <p className="mt-4 text-zinc-500 dark:text-zinc-400">
                  Select an entry to view
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}