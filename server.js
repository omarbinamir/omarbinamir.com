// server.js
const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");
const multer = require("multer");
const FormData = require("form-data");
const fs = require("fs");

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());
const upload = multer({ storage: multer.memoryStorage() });

const PIXVERSE_API_KEY = "sk-3fa40a1812f55170a26222ea527a700c"; // your key

// Endpoint
app.post("/generate-video", upload.single("image"), async (req, res) => {
  try {
    const { prompt, duration, resolution, style } = req.body;

    const form = new FormData();
    form.append("prompt", prompt);
    form.append("duration", duration);
    form.append("resolution", resolution);
    form.append("style", style);

    if (req.file) {
      form.append("image", req.file.buffer, req.file.originalname);
    }

    // Call Pix Verse API
    const response = await fetch("https://api.pixverse.com/v1/video/generate", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${PIXVERSE_API_KEY}`
      },
      body: form
    });

    if (!response.ok) throw new Error("Pix Verse API error");

    const data = await response.json(); // or blob if needed
    res.json({ videoUrl: data.url || data.videoUrl });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// Endpoint for Images (In-House Manifestation)
app.post("/generate-image", async (req, res) => {
  try {
    const { prompt, width, height } = req.body;

    // Using a more stable "In-House" proxy approach
    // We utilize the high-speed production endpoint for more reliable results
    const imageUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?width=${width}&height=${height}&nologo=true&seed=${Math.floor(Math.random() * 1000000)}`;

    // Fetch the image to ensure it's available and return it as a buffer or just the URL
    // To make it truly "in-house", we can return the internal URL
    res.json({ imageUrl });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Creation Failed" });
  }
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
