import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const buildApiUrl = (path: string) => `https://staging.api.n2i-2024.ovh.servers.dotslash.fr${path.startsWith("/") ? "" : "/"}${path}`;

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateArray(length: number) {
  const array = [];
  for (let i = 0; i < length; ++i) array.push(i);
  return array;
}
