import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { EmailSummary } from "@/types/email";
import { Calendar, Mail, Tag } from "lucide-react";

interface EmailCardProps {
  email: EmailSummary;
}

export function EmailCard({ email }: EmailCardProps) {
  const priorityColors = {
    high: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
    medium: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
    low: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  };

  return (
    <Card className="hover:shadow-lg transition-shadow duration-200 border-gray-200 dark:border-gray-800">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start gap-2">
          <div className="flex-1">
            <CardTitle className="text-lg font-semibold line-clamp-1">
              {email.subject}
            </CardTitle>
            <CardDescription className="flex items-center gap-2 mt-1">
              <Mail className="h-3 w-3" />
              <span className="text-sm">{email.sender}</span>
            </CardDescription>
          </div>
          {email.priority && (
            <Badge className={`${priorityColors[email.priority]} border-none`}>
              {email.priority}
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-3">
          {email.summary}
        </p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-500">
            <Calendar className="h-3 w-3" />
            <span>{new Date(email.timestamp).toLocaleString()}</span>
          </div>
          {email.tags && email.tags.length > 0 && (
            <div className="flex items-center gap-1">
              <Tag className="h-3 w-3 text-gray-400" />
              <div className="flex gap-1">
                {email.tags.slice(0, 2).map((tag, index) => (
                  <Badge key={index} variant="secondary" className="text-xs px-2 py-0">
                    {tag}
                  </Badge>
                ))}
                {email.tags.length > 2 && (
                  <Badge variant="secondary" className="text-xs px-2 py-0">
                    +{email.tags.length - 2}
                  </Badge>
                )}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}