import { SignInButton, SignUpButton, SignedOut } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link2, Zap, Shield, BarChart3 } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 md:py-32">
        <div className="flex flex-col items-center text-center space-y-8">
          <div className="space-y-4 max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              Shorten Links, Amplify Results
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground">
              Transform long URLs into powerful, trackable short links. Fast, secure, and built for modern teams.
            </p>
          </div>
          
          <SignedOut>
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
              <SignUpButton forceRedirectUrl="/dashboard" mode="redirect">
                <Button size="lg" className="text-lg px-8">
                  Get Started Free
                </Button>
              </SignUpButton>
              <SignInButton forceRedirectUrl="/dashboard" mode="redirect">
                <Button size="lg" variant="outline" className="text-lg px-8">
                  Sign In
                </Button>
              </SignInButton>
            </div>
          </SignedOut>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">Powerful Features</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need to manage and track your short links effectively
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="border-2">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-2">
                <Zap className="w-6 h-6 text-primary" />
              </div>
              <CardTitle>Lightning Fast</CardTitle>
              <CardDescription>
                Create short links in seconds with our optimized infrastructure
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-2">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-2">
                <Shield className="w-6 h-6 text-primary" />
              </div>
              <CardTitle>Secure & Reliable</CardTitle>
              <CardDescription>
                Enterprise-grade security with 99.9% uptime guarantee
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-2">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-2">
                <BarChart3 className="w-6 h-6 text-primary" />
              </div>
              <CardTitle>Advanced Analytics</CardTitle>
              <CardDescription>
                Track clicks, locations, and user engagement in real-time
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-2">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-2">
                <Link2 className="w-6 h-6 text-primary" />
              </div>
              <CardTitle>Custom URLs</CardTitle>
              <CardDescription>
                Create branded short links that match your identity
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <Card className="border-2 bg-card/50 backdrop-blur">
          <CardContent className="py-12">
            <div className="flex flex-col items-center text-center space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold">
                Ready to get started?
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl">
                Join thousands of users who trust our platform for their link shortening needs
              </p>
              <SignedOut>
                <SignUpButton forceRedirectUrl="/dashboard" mode="redirect">
                  <Button size="lg" className="text-lg px-8">
                    Create Your Free Account
                  </Button>
                </SignUpButton>
              </SignedOut>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
