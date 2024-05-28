const ffmpeg = require("fluent-ffmpeg");
const path = require("path");
const fs = require("fs");
require("dotenv").config();

const streamUrl = process.env.STREAM_URL;
const outputDir = "./output"; // Ensure this directory exists

// Create the output directory if it doesn't exist
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir);
}

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

recordStream();
