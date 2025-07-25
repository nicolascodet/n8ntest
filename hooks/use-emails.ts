"use client";

import { useState, useEffect } from 'react';
import { EmailSummary } from '@/types/email';

export function useEmails() {
  const [emails, setEmails] = useState<EmailSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEmails = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('/api/emails');
      
      if (!response.ok) {
        throw new Error('Failed to fetch emails');
      }
      
      const data = await response.json();
      
      // Handle both array and single object responses
      const emailArray = Array.isArray(data) ? data : [data];
      
      // Transform data to match our EmailSummary type
      const transformedEmails: EmailSummary[] = emailArray.map((item: any, index: number) => ({
        id: item.id || `email-${index}`,
        sender: item.sender || item.from || 'Unknown Sender',
        subject: item.subject || 'No Subject',
        summary: item.summary || item.content || item.body || 'No summary available',
        timestamp: item.timestamp || item.date || new Date().toISOString(),
        priority: item.priority || undefined,
        category: item.category || undefined,
        tags: item.tags || undefined,
      }));
      
      setEmails(transformedEmails);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmails();
    
    // Refresh every 30 seconds
    const interval = setInterval(fetchEmails, 30000);
    
    return () => clearInterval(interval);
  }, []);

  return { emails, loading, error, refetch: fetchEmails };
}