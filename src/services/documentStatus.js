
/**
 * Calculates and returns the expiration status of a document or policy based on a target date.
 * Enhanced with robust date parsing and standard safety guards.
 * 
 * @param {string|Date} date - The expiry date string or Date object
 * @returns {string} - Status string: "No Expiry", "Expired", "Expiring Soon", or "Valid"
 */
export function getExpiryStatus(date) {
  if (!date) {
    return "No Expiry";
  }

  const today = new Date();
  const expiry = new Date(date);

  // Check for invalid date formatting
  if (isNaN(expiry.getTime())) {
    return "Invalid Date";
  }

  // Strip time components to compare calendar days accurately
  today.setHours(0, 0, 0, 0);
  expiry.setHours(0, 0, 0, 0);

  const diffTime = expiry - today;
  const days = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (days < 0) {
    return "Expired";
  }

  if (days <= 30) {
    return "Expiring Soon";
  }

  return "Valid";
}