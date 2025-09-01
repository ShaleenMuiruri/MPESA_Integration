const { 
  formatKenyanPhoneNumber, 
  isValidKenyanPhoneNumber
} = require('../utils/phoneNumber');

describe('Phone Number Utility Tests', () => {
  describe('formatKenyanPhoneNumber', () => {
    test('should format 07XXXXXXXX to 2547XXXXXXXX', () => {
      expect(formatKenyanPhoneNumber('0712345678')).toBe('254712345678');
    });

    test('should format +2547XXXXXXXX to 2547XXXXXXXX', () => {
      expect(formatKenyanPhoneNumber('+254712345678')).toBe('254712345678');
    });

    test('should format 712345678 to 254712345678', () => {
      expect(formatKenyanPhoneNumber('712345678')).toBe('254712345678');
    });

    test('should keep 2547XXXXXXXX as is', () => {
      expect(formatKenyanPhoneNumber('254712345678')).toBe('254712345678');
    });

    test('should handle 9-digit numbers by adding 254 prefix', () => {
      expect(formatKenyanPhoneNumber('123456789')).toBe('254123456789');
    });

    test('should remove non-digit characters', () => {
      expect(formatKenyanPhoneNumber('+254-712-345-678')).toBe('254712345678');
    });

    test('should throw error for invalid formats', () => {
      expect(() => formatKenyanPhoneNumber('123')).toThrow('Invalid phone number format');
      expect(() => formatKenyanPhoneNumber('254123')).toThrow('Invalid phone number format');
    });
  });

  describe('isValidKenyanPhoneNumber', () => {
    test('should return true for valid formats', () => {
      expect(isValidKenyanPhoneNumber('0712345678')).toBe(true);
      expect(isValidKenyanPhoneNumber('+254712345678')).toBe(true);
      expect(isValidKenyanPhoneNumber('254712345678')).toBe(true);
    });

    test('should return false for invalid formats', () => {
      expect(isValidKenyanPhoneNumber('123')).toBe(false);
      expect(isValidKenyanPhoneNumber('254123')).toBe(false);
      expect(isValidKenyanPhoneNumber('')).toBe(false);
    });
  });


});
