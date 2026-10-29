import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Global, ThemeProvider, css } from '@emotion/react';
import App from './App';
import { theme } from './styles/theme';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <Global
        styles={(theme) => css`
          * { box-sizing: border-box; }
          body {
            margin: 0;
            background: ${theme.colors.page};
            color: ${theme.colors.text};
            font-family: system-ui, sans-serif;
            line-height: 1.5;
          }
          button, select { font: inherit; }
          button, select { cursor: pointer; }
          button, select { min-height: 44px; }
          button:focus-visible, select:focus-visible {
            outline: 3px solid ${theme.colors.focus};
            outline-offset: 3px;
          }
        `}
      />
      <App />
    </ThemeProvider>
  </StrictMode>,
);
