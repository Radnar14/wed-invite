import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function scheduledText({ before, after, effectiveDate }: { before: string; after: string; effectiveDate: string }) {
  return Date.now() >= Date.parse(effectiveDate) ? after : before
}
