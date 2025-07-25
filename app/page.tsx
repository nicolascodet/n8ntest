"use client";

import { EmailCard } from "@/components/email-card";
import { EmailSkeleton } from "@/components/email-skeleton";
import { useEmails } from "@/hooks/use-emails";
import { Button } from "@/components/ui/button";
import { RefreshCw, Mail, AlertCircle } from "lucide-react";

export default function Home() {
  const { emails, loading, error, refetch } = useEmails();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Header */}
      <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <Mail className="h-6 w-6 text-gray-700 dark:text-gray-300" />
              <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                Thunderbird Labs Email Summaries
              </h1>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={refetch}
              disabled={loading}
              className="gap-2"
            >
              <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error ? (
          <div className="flex flex-col items-center justify-center py-12">
            <AlertCircle className="h-12 w-12 text-red-500 mb-4" />
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
              Error loading emails
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              {error}
            </p>
            <Button onClick={refetch} variant="outline" size="sm">
              Try Again
            </Button>
          </div>
        ) : loading ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <EmailSkeleton key={i} />
            ))}
          </div>
        ) : emails.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12">
            <Mail className="h-12 w-12 text-gray-400 mb-4" />
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
              No emails found
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Email summaries will appear here when available
            </p>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {emails.map((email) => (
              <EmailCard key={email.id} email={email} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}