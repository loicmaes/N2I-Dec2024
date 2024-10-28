import type { BlobOptions } from "node:buffer";

export function generateBlobUrl(data: BlobPart[], config: BlobOptions): string {
  const blob = new Blob(data, config);
  return URL.createObjectURL(blob);
}
export function generateDownloadLink(url: string, fileName: string): HTMLAnchorElement {
  const obj = document.createElement("a");
  obj.setAttribute("href", url);
  obj.setAttribute("download", fileName);
  obj.style.display = "none";

  return obj;
}
export function processDownload(url: string, fileName: string) {
  const anchor = generateDownloadLink(url, fileName);
  anchor.click();
  revoke(anchor, url);
}
export function revoke(anchor: HTMLAnchorElement, url: string) {
  document.removeChild(anchor);
  URL.revokeObjectURL(url);
}
