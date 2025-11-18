export interface UrlCheckResult {
  isValid: boolean;
  exists?: boolean;
  type?: 'file' | 'folder' | 'unknown';
  error?: string;
}

export interface UrlValidationState {
  url: string;
  isLoading: boolean;
  result: UrlCheckResult | null;
}