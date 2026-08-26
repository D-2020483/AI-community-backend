import {
  isValidCoordPair,
  reverseGeocode,
  searchPlaces,
} from "../../utils/geocode.js";

export const searchPlacesHandler = async (req, res, next) => {
  try {
    const query = String(req.query.q || "").trim();
    if (!query) {
      return res.status(200).json({ success: true, data: [] });
    }

    const results = await searchPlaces(query, 6);
    return res.status(200).json({ success: true, data: results });
  } catch (error) {
    next(error);
  }
};

export const reverseGeocodeHandler = async (req, res, next) => {
  try {
    const lat = req.query.lat;
    const lng = req.query.lng ?? req.query.lon;
    if (!isValidCoordPair(lat, lng)) {
      return res.status(400).json({
        success: false,
        message: "Valid latitude and longitude are required.",
      });
    }

    const result = await reverseGeocode(lat, lng);
    return res.status(200).json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};
