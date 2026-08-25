import env from "../config/env.js";

const DEFAULT_ORIGINS = [
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  "https://civic-link-frontkend.vercel.app",
  "https://civic-link-frontend.vercel.app",
];

const VERCEL_PREVIEW =
  /^https:\/\/civic-link-frontk?end(-[a-z0-9-]+)?\.vercel\.app$/;

function stripTrailingSlash(url) {
  return String(url || "").replace(/\/$/, "");
}

export function defaultFrontendOrigins() {
  return [...DEFAULT_ORIGINS];
}

export function isAllowedFrontendOrigin(origin) {
  if (!origin) return false;
  const normalized = stripTrailingSlash(origin);
  if ([...DEFAULT_ORIGINS, ...env.frontendOrigins].includes(normalized)) {
    return true;
  }
  return VERCEL_PREVIEW.test(normalized);
}

function originFromUrl(value) {
  if (!value) return "";
  try {
    return stripTrailingSlash(new URL(value).origin);
  } catch {
    return "";
  }
}

/**
 * Prefer the frontend that made the request (local Vite vs deployed Vercel)
 * so invitation emails and copy-links match the environment in use.
 */
export function frontendUrlFromRequest(req) {
  const candidates = [
    req?.get?.("x-app-origin"),
    req?.headers?.["x-app-origin"],
    req?.get?.("origin"),
    req?.headers?.origin,
    originFromUrl(req?.get?.("referer") || req?.headers?.referer),
  ];

  for (const candidate of candidates) {
    const origin = stripTrailingSlash(
      Array.isArray(candidate) ? candidate[0] : candidate,
    );
    if (isAllowedFrontendOrigin(origin)) return origin;
  }

  return env.frontendUrl;
}

export function buildInviteUrl(frontendUrl, token) {
  const base = stripTrailingSlash(frontendUrl || env.frontendUrl);
  return `${base}/accept-invite?token=${encodeURIComponent(token)}`;
}

export function buildInviteLoginUrl(frontendUrl, _role, token) {
  return buildInviteUrl(frontendUrl, token);
}
