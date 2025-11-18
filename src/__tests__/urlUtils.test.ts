import { isValidUrlFormat, validateUrlFormat } from "../utils/urlUtils";


describe('URL Validation', () => {
  describe('Valid URLs', () => {
    test('https://www.google.com', () => {
      const result = validateUrlFormat('https://www.google.com');
      expect(result.isValid).toBe(true);
      expect(result.message).toBe('Valid URL format');
    });

    test('http://example.org', () => {
      const result = validateUrlFormat('http://example.org');
      expect(result.isValid).toBe(true);
      expect(result.message).toBe('Valid URL format');
    });

    test('https://subdomain.example.com/path/to/page', () => {
      const result = validateUrlFormat('https://subdomain.example.com/path/to/page');
      expect(result.isValid).toBe(true);
      expect(result.message).toBe('Valid URL format');
    });

    test('https://example.com?query=test', () => {
      const result = validateUrlFormat('https://example.com?query=test');
      expect(result.isValid).toBe(true);
      expect(result.message).toBe('Valid URL format');
    });
  });

  describe('Invalid URLs', () => {
    test('www.google.com - missing protocol', () => {
      const result = validateUrlFormat('www.google.com');
      expect(result.isValid).toBe(false);
      expect(result.message).toBe('Invalid URL format');
    });

    test('http:/example.com - malformed protocol', () => {
      const result = validateUrlFormat('http:/example.com');
      expect(result.isValid).toBe(false);
      expect(result.message).toBe('Invalid URL format');
    });

    test('https:// - missing hostname', () => {
      const result = validateUrlFormat('https://');
      expect(result.isValid).toBe(false);
      expect(result.message).toBe('Invalid URL format');
    });

    test('ftp://files.com - unsupported protocol', () => {
      const result = validateUrlFormat('ftp://files.com');
      expect(result.isValid).toBe(false);
      expect(result.message).toBe('Invalid URL format');
    });

    test('not-a-url - not a URL at all', () => {
      const result = validateUrlFormat('not-a-url');
      expect(result.isValid).toBe(false);
      expect(result.message).toBe('Invalid URL format');
    });
  });

  describe('isValidUrlFormat helper', () => {
    test('returns true for valid URLs', () => {
      expect(isValidUrlFormat('https://example.com')).toBe(true);
    });

    test('returns false for invalid URLs', () => {
      expect(isValidUrlFormat('invalid-url')).toBe(false);
    });
  });
});