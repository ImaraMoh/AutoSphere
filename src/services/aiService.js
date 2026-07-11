import axios from "axios";

const GEMINI_API_KEY = process.env.EXPO_PUBLIC_GEMINI_API_KEY;
const GEMINI_MODEL = "gemini-flash-latest";

export async function askVehicleAI(message, context, onUpdate) {
  if (!GEMINI_API_KEY) {
    const envError = "Configuration Error: EXPO_PUBLIC_GEMINI_API_KEY is undefined.";
    console.error(envError);
    if (typeof onUpdate === "function") onUpdate(envError);
    return envError;
  }

  try {
    // Appending the key strictly here forces Google to bypass OAuth checks
    const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`;

    const prompt = `
You are AutoSphere AI, a professional vehicle assistant.

Vehicle Details:
${JSON.stringify(context, null, 2)}

User Question:
${message}

Answer format:

🔍 Diagnosis
Possible Causes:
- 

🛠 Recommendation:
-

⚠ Safety Advice:
-

Keep answers simple and practical.
`;

    const response = await fetch(GEMINI_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: prompt,
              },
            ],
          },
        ],
      }),
    });

    const data = await response.json();
    console.log("Gemini Response Log:", JSON.stringify(data));

    let fullText = "";

    if (data?.candidates?.[0]?.content?.parts?.[0]?.text) {
      fullText = data.candidates[0].content.parts[0].text;
    } else if (data?.error?.message) {
      fullText = `Google API Error: ${data.error.message}`;
    } else {
      fullText = "Could not parse response structure. Check terminal logs.";
    }

    if (typeof onUpdate === "function") {
      onUpdate(fullText);
    }

    return fullText;
  } catch (error) {
    console.log("Gemini Connection Error:", error);
    return "AI service unavailable. Please check your network connection.";
  }
}