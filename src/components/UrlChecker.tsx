import React from 'react';
import {
  Box,
  TextField,
  Paper,
  Typography,
  Alert,
} from '@mui/material';
import {
  Link as LinkIcon,
} from '@mui/icons-material';
import { useUrlValidation } from '../hooks/useUrlValidation';
import { validateUrlFormat } from '../utils/urlUtils';
import { getUrlStatus } from '../utils/statusUtils';

export const UrlChecker: React.FC = () => {
  const { url, isLoading, result, handleUrlChange } = useUrlValidation();

  const inputValidation = validateUrlFormat(url);


  return (
    <Box sx={{ maxWidth: 600, margin: '0 auto', p: 3, py: 4 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom align="center" color="primary">
          URL Checker
        </Typography>
        
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }} align="center">
          Enter a URL to validate its format and check if it exists
        </Typography>

        <Box sx={{ position: 'relative', mb: 3 }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="https://example.com"
            value={url}
            onChange={(e) => handleUrlChange(e.target.value)}
            error={inputValidation.isValid === false}
            color={inputValidation.isValid ? 'success' : 'primary'}
            InputProps={{
              startAdornment: <LinkIcon sx={{ mr: 1, color: 'text.secondary' }} />,
            }}
          />
          
          <Typography
            variant="caption"
            sx={{
              display: 'block',
              mt: 1,
              height: '20px',
              color: inputValidation.isValid === false ? 'error.main' : 
                     inputValidation.isValid ? 'success.main' : 'text.secondary',
            }}
          >
            {getUrlStatus(isLoading, inputValidation, result)}
          </Typography>
        </Box>

        {result?.error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {result.error}
          </Alert>
        )}

        {result?.exists && result.type && (
          <Alert 
            severity="success" 
            sx={{ mb: 2 }}
          >
            {`This URL points to a ${result.type} and is accessible.`}
          </Alert>
        )}
      </Paper>
    </Box>
  );
};