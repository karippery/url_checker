export interface ValidationResult {
  isValid: boolean | null;
  message: string;
}

const VALID_PROTOCOLS = ['http:', 'https:'] as const;

export const validateUrlFormat = (url: string): ValidationResult => {
  const trimmed = url.trim();

  if (!trimmed) {
    return { isValid: null, message: 'Enter a URL to validate' };
  }

  try {
    const urlObj = new URL(trimmed);

    const hasValidProtocol = VALID_PROTOCOLS.includes(urlObj.protocol as any);
    const hasHostname = urlObj.hostname.length > 0;
    const hasProperProtocol = trimmed.includes('://');

    const isValid = hasValidProtocol && hasHostname && hasProperProtocol;

    return {
      isValid,
      message: isValid ? 'Valid URL format' : 'Invalid URL format',
    };
  } catch {
    return { isValid: false, message: 'Invalid URL format' };
  }
};

export const isValidUrlFormat = (url: string): boolean =>
  validateUrlFormat(url).isValid === true;