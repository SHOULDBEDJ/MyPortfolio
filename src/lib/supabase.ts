// Supabase Client — Portfolio KV Store
// Reads VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY from build-time env vars.
// If not configured, all operations silently do nothing (localStorage-only mode).

const supabaseUrl   = import.meta.env.VITE_SUPABASE_URL   || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

const headers = {
  apikey:        supabaseAnonKey,
  Authorization: `Bearer ${supabaseAnonKey}`,
  'Content-Type': 'application/json',
};

/** Fetch ALL rows from portfolio_kv as a plain key→value map. */
export async function getAllKV(): Promise<Record<string, unknown> | null> {
  if (!isSupabaseConfigured) return null;
  try {
    const res = await fetch(`${supabaseUrl}/rest/v1/portfolio_kv?select=key,value`, { headers });
    if (!res.ok) return null;
    const rows: Array<{ key: string; value: unknown }> = await res.json();
    return Object.fromEntries(rows.map(r => [r.key, r.value]));
  } catch {
    return null;
  }
}

/** Upsert a single key-value pair into portfolio_kv. */
export async function upsertKV(key: string, value: unknown): Promise<void> {
  if (!isSupabaseConfigured) return;
  try {
    await fetch(`${supabaseUrl}/rest/v1/portfolio_kv`, {
      method:  'POST',
      headers: { ...headers, Prefer: 'resolution=merge-duplicates' },
      body:    JSON.stringify({ key, value, updated_at: new Date().toISOString() }),
    });
  } catch {
    // Silent — localStorage is the source of truth when offline
  }
}

/** Batch upsert many KV pairs at once (used for initial sync). */
export async function upsertManyKV(entries: Array<{ key: string; value: unknown }>): Promise<void> {
  if (!isSupabaseConfigured || entries.length === 0) return;
  try {
    const ts = new Date().toISOString();
    await fetch(`${supabaseUrl}/rest/v1/portfolio_kv`, {
      method:  'POST',
      headers: { ...headers, Prefer: 'resolution=merge-duplicates' },
      body:    JSON.stringify(entries.map(e => ({ key: e.key, value: e.value, updated_at: ts }))),
    });
  } catch {
    // Silent
  }
}

// Legacy helper (kept for backward compat)
export async function fetchFromSupabase(table: string): Promise<unknown[] | null> {
  if (!isSupabaseConfigured) return null;
  try {
    const res = await fetch(`${supabaseUrl}/rest/v1/${table}?select=*`, { headers });
    if (res.ok) return await res.json();
  } catch { /* silent */ }
  return null;
}
