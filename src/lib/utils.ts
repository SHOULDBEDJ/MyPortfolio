import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import {
  Github,
  Linkedin,
  Twitter,
  Youtube,
  Instagram,
  Facebook,
  Twitch,
  Code,
  Link,
} from 'lucide-react';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getSocialIcon = (platform: string) => {
  const p = (platform || '').toLowerCase().trim();
  if (p.includes('github')) return Github;
  if (p.includes('linkedin')) return Linkedin;
  if (p.includes('twitter') || p.includes('x.com')) return Twitter;
  if (p.includes('youtube')) return Youtube;
  if (p.includes('instagram')) return Instagram;
  if (p.includes('facebook')) return Facebook;
  if (p.includes('twitch')) return Twitch;
  if (p.includes('leetcode') || p.includes('hackerrank') || p.includes('codechef') || p.includes('code')) return Code;
  return Link; // Default fallback icon
};
