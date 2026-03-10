import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function TestPage() {
  return (
    <div className="container mx-auto px-4 py-20">
      <Card className="max-w-lg mx-auto">
        <CardHeader>
          <CardTitle>Test Page</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Hello World</p>
        </CardContent>
      </Card>
    </div>
  );
}
