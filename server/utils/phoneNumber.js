/**
 * Phone number utility functions for Kenyan phone numbers
 * Compliant with Daraja API requirements
 */

/**
 * Validates and formats a Kenyan phone number for Daraja API
 * @param {string} phoneNumber - The phone number to format
 * @returns {string} - Formatted phone number in 254XXXXXXXXX format
 * @throws {Error} - If phone number format is invalid
 */
function formatKenyanPhoneNumber(phoneNumber) {
  if (!phoneNumber || typeof phoneNumber !== 'string') {
    throw new Error('Phone number must be a non-empty string');
  }

  // Remove any non-digit characters first
  let formattedPhone = phoneNumber.replace(/\D/g, '');
  
  // Handle different input formats
  if (formattedPhone.startsWith("0")) {
    // Convert 07XXXXXXXX to 2547XXXXXXXX
    formattedPhone = `254${formattedPhone.slice(1)}`;
  } else if (formattedPhone.startsWith("254")) {
    // Already in correct format
    formattedPhone = formattedPhone;
  } else if (formattedPhone.startsWith("7")) {
    // Convert 7XXXXXXXX to 2547XXXXXXXX
    formattedPhone = `254${formattedPhone}`;
  } else {
    // If it's already 9 digits, assume it's missing country code
    if (formattedPhone.length === 9) {
      formattedPhone = `254${formattedPhone}`;
    }
  }
  
  // Validate final format - Kenyan numbers start with 254 followed by 9 digits
  if (!formattedPhone.match(/^254\d{9}$/)) {
    throw new Error(`Invalid phone number format. Expected: 254XXXXXXXXX, Got: ${formattedPhone}`);
  }

  return formattedPhone;
}

/**
 * Validates if a phone number is a valid Kenyan format
 * @param {string} phoneNumber - The phone number to validate
 * @returns {boolean} - True if valid, false otherwise
 */
function isValidKenyanPhoneNumber(phoneNumber) {
  try {
    formatKenyanPhoneNumber(phoneNumber);
    return true;
  } catch (error) {
    return false;
  }
}

module.exports = {
  formatKenyanPhoneNumber,
  isValidKenyanPhoneNumber
};
