export interface EmailSummary {
  id: string;
  sender: string;
  subject: string;
  summary: string;
  timestamp: string;
  priority?: 'high' | 'medium' | 'low';
  category?: string;
  tags?: string[];
}