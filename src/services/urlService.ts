import type { UrlCheckResult } from "../types/url";


// Mock service to simulate API call
export const checkUrlExistence = async (url: string): Promise<UrlCheckResult> => {
  await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 700));
  

  const urlParts = new URL(url);
  const path = urlParts.pathname;
  

  const exists = Math.random() > 0.3; // 70% chance URL "exists"
  
  if (!exists) {
    return {
      isValid: true,
      exists: false,
      error: 'URL does not exist or is not accessible',
    };
  }
  
  // Determine if it's a file or folder based on path extension
  const hasExtension = path.includes('.') && !path.endsWith('/');
  const type = hasExtension ? 'file' : 'folder';
  
  return {
    isValid: true,
    exists: true,
    type,
  };
};