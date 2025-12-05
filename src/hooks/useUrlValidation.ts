import { useState, useEffect, useCallback, useRef } from 'react';
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
  const abortControllerRef = useRef<AbortController | null>(null);

  const validateUrl = useCallback(async (url: string) => {
     // Cancel previous request if it exists
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    const controller = new AbortController();
    abortControllerRef.current = controller;
    const signal = controller.signal;

    const isValid = isValidUrlFormat(url);
    
    if (!isValid) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        result: { isValid: false, error: 'Invalid URL format', exists: false },
      }));
      return;
    }

    setState(prev => ({ 
      ...prev, 
      isLoading: true,
      result: null
    }));

    try {
      const result = await checkUrlExistence(url, signal);
      if (signal.aborted) return; 
      setState(prev => ({ ...prev, isLoading: false, result }));
    } catch (error) {
      if (signal.aborted) return;
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

  // Trigger validation on debounced input
  useEffect(() => {
    if (!debouncedUrl.trim()) {
      setState(prev => ({ ...prev, isLoading: false, result: null }));
      return;
    }
    validateUrl(debouncedUrl);
  }, [debouncedUrl, validateUrl]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

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