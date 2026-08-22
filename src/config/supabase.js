import "dotenv/config";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error(
    "SUPABASE_URL and SUPABASE_ANON_KEY are required. Set them in Render: Environment → Environment Variables (local .env is not deployed).",
  );
}

export const supabase = createClient(supabaseUrl, supabaseKey);
