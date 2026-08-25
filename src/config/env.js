import dotenv from "dotenv";

dotenv.config();

const PROD_FRONTEND_URL = "https://civic-link-frontend.vercel.app";
const LOCAL_FRONTEND_URL = "http://localhost:5173";

function stripTrailingSlash(url) {
  return String(url || "").replace(/\/$/, "");
}

function parseOriginList(value) {
  return String(value || "")
    .split(",")
    .map((item) => stripTrailingSlash(item.trim()))
    .filter(Boolean);
}

const nodeEnv = process.env.NODE_ENV || "development";

const frontendOrigins = parseOriginList(process.env.FRONTEND_URL);
const frontendUrl =
  frontendOrigins[0] ||
  (nodeEnv === "production" ? PROD_FRONTEND_URL : LOCAL_FRONTEND_URL);

const env = {
  nodeEnv,
  port: Number(process.env.PORT) || 5000,

  supabaseUrl: process.env.SUPABASE_URL,
  supabaseAnonKey: process.env.SUPABASE_ANON_KEY,

  databaseUrl: process.env.DATABASE_URL,

  frontendUrl,
  frontendOrigins,
};

export default env;