// /routes/imageProxy.js
const express = require("express");
const axios = require("axios");
const router = express.Router();

router.get("/image-proxy", async (req, res) => {
  const { url } = req.query;
  if (!url) return res.status(400).send("Missing image URL");

  try {
    const response = await axios.get(url, { responseType: "stream" });
    res.setHeader("Content-Type", response.headers["content-type"]);
    response.data.pipe(res);
  } catch (err) {
    console.error("Image proxy error:", err.message);
    res.status(500).send("Failed to load image");
  }
});

module.exports = router;
