import express from "express";
import { supabase } from "../config/supabase.js";

const router = express.Router();

router.get("/supabase", async (req, res) => {
  try {
    const { data, error } = await supabase.from("test").select("*");

    if (error) {
      return res.status(500).json({
        message: "Supabase connection failed",
        error: error.message,
      });
    }

    res.json({
      message: "Supabase connection successful",
      data,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
});

export default router;
