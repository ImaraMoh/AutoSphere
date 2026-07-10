import express from "express";
import multer from "multer";
import cors from "cors";
import { extractText } from "./services/visionService.js";

import {
parseVehicleDocument
}
from "./services/documentParser.js";

const app = express();

app.use(cors());
app.use(express.json());

const upload = multer({ dest: "uploads/" });

app.post("/ocr", upload.single("image"), async (req, res) => {
    console.log("FILE RECEIVED:");
    console.log(req.file);
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No image file received",
      });
    }

    const text = await extractText(req.file.path);
    const vehicleData = parseVehicleDocument(text);

    return res.json({
      success: true,
      text,
      vehicleData,
    });
  } catch (error) {
    console.log("OCR API Error:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// helpful test route
app.get("/", (req, res) => {
  res.json({ success: true, message: "OCR API running" });
});

// JSON 404, not HTML
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

app.listen(5000, () => {
  console.log("OCR API running on port 5000");
});