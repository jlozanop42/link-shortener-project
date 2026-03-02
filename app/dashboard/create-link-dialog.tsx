'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { createLinkAction } from './action'
import { useRouter } from 'next/navigation'
import { Plus } from 'lucide-react'

export function CreateLinkDialog() {
  const [open, setOpen] = useState(false)
  const [originalUrl, setOriginalUrl] = useState('')
  const [shortCode, setShortCode] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsLoading(true)

    const result = await createLinkAction({
      originalUrl,
      shortCode: shortCode.trim() || undefined,
    })

    setIsLoading(false)

    if ('error' in result) {
      setError(result.error)
    } else {
      // Success - close dialog and reset form
      setOpen(false)
      setOriginalUrl('')
      setShortCode('')
      setError(null)
      // Refresh the page to show the new link
      router.refresh()
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Create Link
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Create New Link</DialogTitle>
          <DialogDescription>
            Create a shortened link by providing the original URL and an optional custom short code.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="originalUrl">Original URL</Label>
            <Input
              id="originalUrl"
              type="url"
              placeholder="https://example.com/very/long/url"
              value={originalUrl}
              onChange={(e) => setOriginalUrl(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="shortCode">Short Code (Optional)</Label>
            <Input
              id="shortCode"
              type="text"
              placeholder="my-link (leave empty for auto-generated)"
              value={shortCode}
              onChange={(e) => setShortCode(e.target.value)}
              disabled={isLoading}
              pattern="[a-zA-Z0-9_-]+"
              minLength={3}
              maxLength={20}
            />
            <p className="text-sm text-muted-foreground">
              Optional: 3-20 characters. Letters, numbers, hyphens, and underscores only. Leave empty to auto-generate.
            </p>
          </div>
          {error && (
            <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">
              {error}
            </div>
          )}
          <div className="flex justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Creating...' : 'Create Link'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
