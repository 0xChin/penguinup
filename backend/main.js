const ffmpeg = require("fluent-ffmpeg");
const path = require("path");
const fs = require("fs");
const express = require("express");
require("dotenv").config();

const streamUrl = process.env.STREAM_URL;
const outputDir = "./output"; // Ensure this directory exists

// Create the output directory if it doesn't exist
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir);
}

const app = express();
const port = 4000;

// Serve static files from the output directory
app.use("/clips", express.static(outputDir));

// Start the recording loop
function getTimestamp() {
  return new Date().toISOString().replace(/[:.]/g, "-");
}

function recordStream() {
  const timestamp = getTimestamp();
  const outputFilePath = path.join(outputDir, `stream_${timestamp}.mp4`);

  console.log(`Recording to: ${outputFilePath}`);

  ffmpeg(streamUrl)
    .outputOptions([
      "-c:v libx264", // Encode video to H.264
      "-crf 30", // Constant Rate Factor for compression
      "-preset fast", // Preset for encoding speed vs compression
      "-c:a aac", // Encode audio to AAC
      "-b:a 128k", // Audio bitrate
      "-t 10", // Record only 10 seconds for testing (adjust as needed)
    ])
    .on("end", () => {
      console.log("Recording ended.");
      setTimeout(recordStream, 0); // Start recording the next segment immediately
    })
    .on("error", (err) => {
      console.error("Error occurred: " + err.message);
    })
    .save(outputFilePath);
}

// Start recording
recordStream();

// Start the Express server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
  console.log(`Serving clips from: ${outputDir}`);
});
