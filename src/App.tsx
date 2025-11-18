import React from 'react';
import { ThemeProvider, CssBaseline, Container } from '@mui/material';
import { UrlChecker } from './components/UrlChecker';
import { appTheme } from './theme/theme';

const App: React.FC = () => {
  return (
    <ThemeProvider theme={appTheme}>
      <CssBaseline />
      <Container>
        <UrlChecker />
      </Container>
    </ThemeProvider>
  );
};

export default App;