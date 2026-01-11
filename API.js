// =============================
// API.js — Pix Verse AI Video Generator
// =============================

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("generate-form");
    const promptInput = document.getElementById("prompt");
    const durationInput = document.getElementById("duration");
    const resolutionInput = document.getElementById("resolution");
    const styleInput = document.getElementById("style");
    const imageInput = document.getElementById("image-file");

    const generateBtn = form.querySelector("button[type='submit']");
    const clearBtn = document.getElementById("clear-btn");

    const statusText = document.getElementById("status-text");
    const spinner = document.getElementById("spinner");
    const progressBar = document.getElementById("progress-bar");

    const gallery = document.getElementById("gallery");
    const emptyGallery = document.getElementById("empty-gallery");

    const pointsCount = document.getElementById("points-count");
    let points = parseInt(pointsCount.textContent, 10) || 100;

    // Update status
    function setStatus(message, progress = 0, showSpinner = false) {
        statusText.textContent = message;
        progressBar.style.width = `${progress}%`;
        spinner.style.display = showSpinner ? "block" : "none";
    }

    // Add video to gallery + auto-download
    function addVideoToGallery(videoUrl, prompt, duration) {
        const template = document.getElementById("video-card-template");
        const card = template.content.cloneNode(true);

        const videoEl = card.querySelector("video");
        videoEl.src = videoUrl;

        card.querySelector(".prompt-title").textContent =
            prompt.length > 40 ? prompt.slice(0, 37) + "..." : prompt;
        card.querySelector(".prompt-text").textContent = prompt;
        card.querySelector(".meta-duration").textContent = duration + "s";

        // Auto-download
        const a = document.createElement("a");
        a.href = videoUrl;
        const filenamePrompt = prompt.replace(/\s+/g, "_").replace(/[^\w_-]/g, "");
        a.download = `video_${filenamePrompt || "generated"}.mp4`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);

        // Gallery buttons
        const downloadLink = card.querySelector(".download-link");
        downloadLink.href = videoUrl;

        const copyBtn = card.querySelector(".copy-link-btn");
        copyBtn.addEventListener("click", () => {
            navigator.clipboard.writeText(videoUrl).then(() => alert("Video link copied!"));
        });

        const removeBtn = card.querySelector(".remove-btn");
        removeBtn.addEventListener("click", () => {
            card.firstElementChild.remove();
            if (!gallery.querySelector(".video-card")) emptyGallery.style.display = "block";
        });

        gallery.appendChild(card);
        emptyGallery.style.display = "none";
    }

    // Clear prompt
    clearBtn.addEventListener("click", () => promptInput.value = "");

    // Presets
    document.querySelectorAll(".preset-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            const preset = btn.dataset.preset;
            if (preset === "sunset") promptInput.value = "A cinematic sunset over a calm ocean, soft waves, golden light, cinematic camera movement";
            if (preset === "city") promptInput.value = "A bustling futuristic city at night, neon lights, flying cars, cinematic zooms, rain reflections";
        });
    });

    // Form submit
    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const prompt = promptInput.value.trim();
        const duration = parseInt(durationInput.value, 10);
        const resolution = resolutionInput.value;
        const style = styleInput.value;

        if (!prompt) { alert("Please enter a prompt!"); return; }
        if (points < 10) { alert("Not enough tokens!"); return; }

        try {
            setStatus("Sending request...", 10, true);
            generateBtn.disabled = true;

            let body, headers = {};
            if (imageInput.files.length > 0) {
                body = new FormData();
                body.append("prompt", prompt);
                body.append("duration", duration);
                body.append("resolution", resolution);
                body.append("style", style);
                body.append("image", imageInput.files[0]);
            } else {
                body = JSON.stringify({ prompt, duration, resolution, style });
                headers["Content-Type"] = "application/json";
            }

            setStatus("Generating video...", 50, true);

            const response = await fetch("http://localhost:3000/generate-video", {
                method: "POST",
                body,
                headers
            });

            if (!response.ok) throw new Error("Backend error");
            const data = await response.json();
            let videoUrl = data.videoUrl;
            if (data.blob) videoUrl = URL.createObjectURL(new Blob([data.blob], { type: "video/mp4" }));

            setStatus("Video generated!", 100, false);

            points -= 10;
            pointsCount.textContent = points;

            addVideoToGallery(videoUrl, prompt, duration);
        } catch (err) {
            console.error(err);
            setStatus("Failed to generate video.", 0, false);
            alert("Error: " + err.message);
        } finally { generateBtn.disabled = false; progressBar.style.width = "0%"; }
    });

    // Auto earn points every minute
    setInterval(() => {
        points += 5;
        pointsCount.textContent = points;
    }, 60000);
});
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

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
