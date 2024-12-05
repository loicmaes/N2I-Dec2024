import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateArray(length: number) {
  const array = [];
  for (let i = 0; i < length; ++i) array.push(i);
  return array;
}
