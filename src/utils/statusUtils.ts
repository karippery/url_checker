import type { UrlCheckResult } from "../types/url";
import type { ValidationResult } from "./urlUtils";

export const getUrlStatus = (
  isLoading: boolean, 
  validation: ValidationResult, 
  result: UrlCheckResult | null
): string => {
  if (validation.isValid === false) return validation.message || 'Invalid URL format';
  if (isLoading) return 'Checking URL...';
  if (!result) return validation.message;
  if (!result.isValid) return 'Invalid URL format';
  if (!result.exists) return 'URL not found';
  return `URL exists (${result.type})`;
};