import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { Button } from "@/components/ui/button";
import { Link2 } from "lucide-react";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Link Shortener - Fast, Secure URL Shortening",
  description: "Transform long URLs into powerful, trackable short links. Fast, secure, and built for modern teams.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      signInFallbackRedirectUrl="/dashboard"
      signUpFallbackRedirectUrl="/dashboard"
      appearance={{ baseTheme: dark }}
    >
      <html lang="en" className="dark" style={{ colorScheme: "dark" }}>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground dark`}
        >
          <header className="border-b">
            <div className="container mx-auto px-4 py-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Link2 className="w-6 h-6 text-primary" />
                <span className="text-xl font-bold">LinkShort</span>
              </div>
              <SignedOut>
                <div className="flex items-center gap-2">
                  <SignInButton
                    forceRedirectUrl="/dashboard"
                    mode="redirect"
                  >
                    <Button variant="ghost">Sign in</Button>
                  </SignInButton>
                  <SignUpButton
                    forceRedirectUrl="/dashboard"
                    mode="redirect"
                  >
                    <Button>Sign up</Button>
                  </SignUpButton>
                </div>
              </SignedOut>
              <SignedIn>
                <UserButton />
              </SignedIn>
            </div>
          </header>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
