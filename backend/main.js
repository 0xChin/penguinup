const ffmpeg = require("fluent-ffmpeg");
const path = require("path");
const fs = require("fs");
const express = require("express");
const { v2: cloudinary } = require("cloudinary");
const { FleekSdk, PersonalAccessTokenService } = require("@fleekxyz/sdk");

require("dotenv").config();

const streamUrl = process.env.STREAM_URL;
const outputDir = "./output"; // Ensure this directory exists

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const patService = new PersonalAccessTokenService({
  personalAccessToken: process.env.FLEEK_PAT,
  projectId: process.env.FLEEK_PROJECT_ID, // Optional
});

const fleekSdk = new FleekSdk({ accessTokenService: patService });

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

let id = 1;

function recordStream(retryCount = 0) {
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
      "-t 600", // Record only 60 seconds for testing (adjust as needed)
    ])
    .on("end", () => {
      console.log("Recording ended.");
      cloudinary.uploader.upload(
        outputFilePath,
        { public_id: id, resource_type: "video" },
        async (error, result) => {
          if (error) {
            console.log("an error occured");
            console.log(error);
          } else {
            if (result.audio) {
              console.log(result.playback_url);
              const resultFleek = await fleekSdk
                .ipfs()
                .addFromPath(outputFilePath);
              console.log(resultFleek);
            } else {
              console.log("camera not working, retrying");
            }
          }
        }
      );
      id += 1;
      setTimeout(() => recordStream(0), 0); // Start recording the next segment immediately
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
