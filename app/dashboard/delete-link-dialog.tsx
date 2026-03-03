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
  DialogFooter,
} from '@/components/ui/dialog'
import { deleteLinkAction } from './action'
import { useRouter } from 'next/navigation'
import { Trash2 } from 'lucide-react'
import type { Link } from '@/db/schema'

interface DeleteLinkDialogProps {
  link: Link
}

export function DeleteLinkDialog({ link }: DeleteLinkDialogProps) {
  const [open, setOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const handleDelete = async () => {
    setError(null)
    setIsLoading(true)

    const result = await deleteLinkAction({ id: link.id })

    setIsLoading(false)

    if ('error' in result) {
      setError(result.error)
    } else {
      // Success - close dialog
      setOpen(false)
      // Refresh the page to remove the deleted link
      router.refresh()
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Delete link">
          <Trash2 className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete Link</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this link? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <div className="rounded-md bg-muted p-4">
            <p className="text-sm font-medium mb-1">Short Code:</p>
            <code className="text-sm font-mono bg-background px-2 py-1 rounded">
              /{link.shortCode}
            </code>
            <p className="text-sm font-medium mt-3 mb-1">Original URL:</p>
            <p className="text-sm text-muted-foreground break-all">
              {link.originalUrl}
            </p>
          </div>
        </div>
        {error && (
          <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">
            {error}
          </div>
        )}
        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={() => setOpen(false)}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant="destructive"
            onClick={handleDelete}
            disabled={isLoading}
          >
            {isLoading ? 'Deleting...' : 'Delete Link'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
