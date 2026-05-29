import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  // During build/SSR without real env vars, use a no-op placeholder
  return createBrowserClient(
    url && url.startsWith("http") ? url : "https://placeholder.supabase.co",
    key ?? "placeholder-key"
  );
}
