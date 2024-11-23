import { useCallback } from "react";

export default function useHttp() {
  const request = useCallback(async (url: string) => {
    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Could not fetch ${url}, status: ${response.status}`);
      }

      const data = response.json();

      return data;
    } catch {
      throw new Error("Error fetching data");
    }
  }, []);

  return { request };
}
