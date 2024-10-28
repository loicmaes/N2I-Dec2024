import { generateBlobUrl, processDownload } from "~/lib/blob";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useJsonDownload(data: any) {
  const strData = JSON.stringify(data);

  const url = generateBlobUrl([strData], { type: "text/json" });
  processDownload(url, "seed.json");
}
