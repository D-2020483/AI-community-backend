const NOMINATIM_BASE = "https://nominatim.openstreetmap.org";
const USER_AGENT =
  process.env.GEOCODER_USER_AGENT ||
  "CivicLink/1.0 (https://civic-link-frontend.vercel.app)";

function isValidCoordPair(lat, lng) {
  const latitude = Number(lat);
  const longitude = Number(lng);
  return (
    Number.isFinite(latitude) &&
    Number.isFinite(longitude) &&
    latitude >= -90 &&
    latitude <= 90 &&
    longitude >= -180 &&
    longitude <= 180
  );
}

function mapHit(hit) {
  if (!hit) return null;
  const lat = Number(hit.lat);
  const lng = Number(hit.lon);
  if (!isValidCoordPair(lat, lng)) return null;
  return {
    lat,
    lng,
    displayName: hit.display_name || hit.name || `${lat}, ${lng}`,
  };
}

async function nominatimFetch(path) {
  const response = await fetch(`${NOMINATIM_BASE}${path}`, {
    headers: {
      Accept: "application/json",
      "User-Agent": USER_AGENT,
    },
  });
  if (!response.ok) {
    const error = new Error("Location search is temporarily unavailable.");
    error.statusCode = response.status >= 500 ? 502 : response.status;
    throw error;
  }
  return response.json();
}

export async function searchPlaces(query, limit = 6) {
  const q = String(query || "").trim();
  if (!q) return [];

  const rows = await nominatimFetch(
    `/search?format=jsonv2&limit=${encodeURIComponent(limit)}&q=${encodeURIComponent(q)}`,
  );
  return (Array.isArray(rows) ? rows : []).map(mapHit).filter(Boolean);
}

export async function reverseGeocode(lat, lng) {
  if (!isValidCoordPair(lat, lng)) return null;
  const data = await nominatimFetch(
    `/reverse?format=jsonv2&lat=${encodeURIComponent(lat)}&lon=${encodeURIComponent(lng)}`,
  );
  return mapHit(data);
}

export { isValidCoordPair };
