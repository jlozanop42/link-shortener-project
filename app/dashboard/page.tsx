import { currentUser } from "@clerk/nextjs/server";
import { getUserLinks } from "@/data/links";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link2, ExternalLink, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

export default async function DashboardPage() {
  const user = await currentUser();

  if (!user) {
    return null;
  }

  // Query user's links from the database
  const userLinks = await getUserLinks(user.id);

  return (
    <main className="min-h-screen p-6">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
          <p className="text-muted-foreground">
            Manage your shortened links
          </p>
        </div>

        {userLinks.length === 0 ? (
          <Card>
            <CardContent className="py-12">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
                  <Link2 className="w-8 h-8 text-muted-foreground" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold">No links yet</h3>
                  <p className="text-muted-foreground max-w-md">
                    Get started by creating your first shortened link
                  </p>
                </div>
                <Button>Create Link</Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-muted-foreground">
                {userLinks.length} {userLinks.length === 1 ? 'link' : 'links'} total
              </p>
              <Button>Create New Link</Button>
            </div>

            {userLinks.map((link) => (
              <Card key={link.id}>
                <CardHeader>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <CardTitle className="flex items-center gap-2 mb-2">
                        <Link2 className="w-4 h-4 text-primary flex-shrink-0" />
                        <code className="text-sm font-mono bg-muted px-2 py-1 rounded">
                          /{link.shortCode}
                        </code>
                      </CardTitle>
                      <CardDescription className="break-all">
                        {link.originalUrl}
                      </CardDescription>
                    </div>
                    <Button variant="ghost" size="icon" asChild>
                      <a
                        href={link.originalUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Open original link"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>
                        Created {new Date(link.createdAt).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}