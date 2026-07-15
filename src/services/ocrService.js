// ocrService.js

/**
 * Intelligent helper to extract structured fields from raw OCR text payload 
 */
const parseOcrFieldsFromText = (rawText) => {
  if (!rawText) return {};

  const lines = rawText.split('\n').map(l => l.trim()).filter(Boolean);
  let extracted = {
    registrationNumber: "",
    ownerName: "",
    vehicleModel: "",
    expiryDate: "",
    engineNumber: "",
    chassisNumber: ""
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].toUpperCase();

    if (line.includes("PURCHASER NAME") || line.includes("OWNER") || line.includes("NAME:")) {
      const parts = lines[i].split(":");
      if (parts[1] && parts[1].trim()) {
        extracted.ownerName = parts[1].trim();
      } else if (lines[i + 1]) {
        extracted.ownerName = lines[i + 1].trim();
      }
    }

    if (line.includes("DATE OF REG") || line.includes("REGISTRATION") || line.includes("REG NO")) {
      const parts = lines[i].split(":");
      if (parts[1] && parts[1].trim()) {
        extracted.registrationNumber = parts[1].trim();
      } else if (lines[i + 1]) {
        extracted.registrationNumber = lines[i + 1].trim();
      }
    }
  }

  if (!extracted.registrationNumber && lines.length > 0) {
    const potentialReg = lines.find(l => l.includes("IDM") || l.includes("-") && l.length > 5);
    extracted.registrationNumber = potentialReg || lines[0];
  }

  return extracted;
};

/**
 * Extracts text and vehicle details from an image URI by sending it to the backend OCR server.
 */
export const extractTextFromImage = async (imageUri) => {
  try {
    console.log("Selected Image URI:", imageUri);

    if (!imageUri) {
      throw new Error("OCR Error: No image URI provided.");
    }

    const imageResponse = await fetch(imageUri);
    const blob = await imageResponse.blob();

    const formData = new FormData();
    formData.append(
      "image",
      blob,
      "document.jpg"
    );

    console.log("Sending multipart FormData to OCR backend...");

    const OCR_BACKEND_URL = process.env.EXPO_PUBLIC_OCR_URL || "http://172.20.10.2:5000/ocr";

    const response = await fetch(OCR_BACKEND_URL, {
      method: "POST",
      body: formData,
      headers: {
        "Accept": "application/json"
      }
    });

    const rawResponseText = await response.text();
    console.log("Backend OCR Raw Result:", rawResponseText);

    if (!response.ok) {
      throw new Error(`OCR Server responded with status ${response.status}: ${rawResponseText}`);
    }

    let parsedData;
    try {
      parsedData = JSON.parse(rawResponseText);
    } catch (parseError) {
      console.log("JSON Parse Notice: Response is plain text, mapping string raw value.");
      parsedData = { text: rawResponseText };
    }

    const textContent = parsedData.text || rawResponseText;
    const inferredFields = parseOcrFieldsFromText(textContent);

    return {
      text: textContent,
      registrationNumber: parsedData.registrationNumber || parsedData.registration || inferredFields.registrationNumber || "N/A",
      ownerName: parsedData.ownerName || parsedData.owner || inferredFields.ownerName || "Unknown Owner",
      vehicleModel: parsedData.vehicleModel || inferredFields.vehicleModel || "Vehicle Record",
      expiryDate: parsedData.expiryDate || inferredFields.expiryDate || "",
      engineNumber: parsedData.engineNumber || "",
      chassisNumber: parsedData.chassisNumber || ""
    };

  } catch (error) {
    console.log("OCR Extraction Connection Error:", error);
    throw error;
  }
};