// aiMemoryService.js

import { askVehicleAI } from "./aiService";
import { buildAIContext } from "../utils/aiContextBuilder";

/**
 * Enhanced AutoSphere AI memory & assistant service that injects 
 * real-time user profile, garage details, and active vehicle context 
 * (including subcollections like maintenance and expenses) directly into queries.
 * 
 * @param {string} question - The user prompt or question text
 * @param {string|null} [targetVehicleId=null] - Optional specific vehicle ID if querying outside the current primary view
 * @returns {Promise<string>} - AI response output
 */
export async function askAutoSphereAI(question, targetVehicleId = null) {
  try {
    // Build context dynamically pulling active profile and selected vehicle metrics
    const context = await buildAIContext(targetVehicleId);

    const response = await askVehicleAI(
      question,
      context
    );

    return response;
  } catch (error) {
    console.log("AutoSphere AI Memory Service Error:", error);
    return "I'm sorry, I'm having trouble fetching your vehicle memory and data right now. Please try again later.";
  }
}