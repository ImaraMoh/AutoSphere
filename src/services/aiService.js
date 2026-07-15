// aiService.js

const GEMINI_API_KEY = process.env.EXPO_PUBLIC_GEMINI_API_KEY;
// Correct production model identifier
const GEMINI_MODEL = "gemini-flash-latest";

/**
 * Communicates with the Gemini API to retrieve AI vehicle diagnostics and assistant insights.
 * 
 * @param {string} message - The user question or message prompt
 * @param {Object|string|null} [context=null] - Dynamic vehicle and user context data
 * @param {Function} [onUpdate] - Optional callback function for streaming or state updates
 * @returns {Promise<string>} - The generated AI response text
 */
export async function askVehicleAI(message, context = null, onUpdate) {
  if (!GEMINI_API_KEY) {
    const envError = "Configuration Error: EXPO_PUBLIC_GEMINI_API_KEY is undefined.";
    console.error(envError);
    if (typeof onUpdate === "function") onUpdate(envError);
    return envError;
  }

  try {
    const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`;

    const contextString = context ? JSON.stringify(context, null, 2) : "No specific vehicle context provided.";

    const prompt = `
You are AutoSphere AI, an expert professional vehicle assistant and senior automotive diagnostic specialist.

Active Vehicle & User Context:
${contextString}

User Question / Request:
${message}

Instructions:
Provide a precise, practical response. If diagnosing an issue or responding to a query, format your answer clearly using structure similar to:

🔍 Diagnosis
Possible Causes:
- 

🛠 Recommendation:
-

⚠ Safety Advice:
-

Keep answers clear, highly practical, and tailored directly to the vehicle specs supplied in the context.
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

    // Safely parse or handle error payloads gracefully without crashing JSON boundaries
    if (data?.error) {
      const errorMsg = data.error.message || "Unknown server error.";
      fullText = `AI Service Error (${data.error.code || 503}): ${errorMsg}.`;
    } else if (data?.candidates?.[0]?.content?.parts?.[0]?.text) {
      fullText = data.candidates[0].content.parts[0].text;
    } else {
      fullText = "Could not parse response structure. Check terminal logs.";
    }

    if (typeof onUpdate === "function") {
      onUpdate(fullText);
    }

    return fullText;
  } catch (error) {
    console.log("Gemini Connection Error:", error);
    const fallbackMessage = "AI service unavailable. Please check your network connection.";
    if (typeof onUpdate === "function") {
      onUpdate(fallbackMessage);
    }
    return fallbackMessage;
  }
}