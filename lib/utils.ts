import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const buildApiUrl = (path: string) => `https://staging-a2cm-api-n2i2024.coolify.dotslash.fr${path.startsWith("/") ? "" : "/"}${path}`;

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateArray(length: number) {
  const array = [];
  for (let i = 0; i < length; ++i) array.push(i);
  return array;
}
