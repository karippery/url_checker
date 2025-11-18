import { useState, useEffect, useCallback } from 'react';
import { isValidUrlFormat } from '../utils/urlUtils';
import { checkUrlExistence } from '../services/urlService';
import { useDebounce } from './useDebounce';
import type { UrlValidationState } from '../types/url';

export const useUrlValidation = () => {
  const [state, setState] = useState<UrlValidationState>({
    url: '',
    isLoading: false,
    result: null,
  });

  const debouncedUrl = useDebounce(state.url, 500);

  const validateUrl = useCallback(async (url: string) => {
    const isValid = isValidUrlFormat(url);
    
    if (!isValid) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        result: { isValid: false, error: 'Invalid URL format' },
      }));
      return;
    }

    setState(prev => ({ ...prev, isLoading: true }));

    try {
      const result = await checkUrlExistence(url);
      setState(prev => ({ ...prev, isLoading: false, result }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        result: {
          isValid: true,
          exists: false,
          error: 'Failed to check URL existence',
        },
      }));
    }
  }, []);

  useEffect(() => {
    if (!debouncedUrl.trim()) {
      setState(prev => ({ ...prev, isLoading: false, result: null }));
      return;
    }

    validateUrl(debouncedUrl);
  }, [debouncedUrl, validateUrl]);

  const handleUrlChange = (url: string) => {
    setState(prev => ({ ...prev, url, result: null }));
  };

  return {
    url: state.url,
    isLoading: state.isLoading,
    result: state.result,
    handleUrlChange,
  };
};