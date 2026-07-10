import vision from "@google-cloud/vision";

const client = new vision.ImageAnnotatorClient({
  keyFilename: "./autosphere-ocr-key.json",
});

export async function extractText(imagePath) {
  const [result] = await client.textDetection(imagePath);
  const detections = result.textAnnotations;

  if (!detections || detections.length === 0) {
    return "";
  }

  return detections[0].description;
}