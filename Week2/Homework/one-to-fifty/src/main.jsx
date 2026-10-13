import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Global, css } from '@emotion/react';
import App from './App';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Global styles={css`
      * { box-sizing: border-box; }
      body {
        margin: 0;
        background: #f6f5f9;
        color: #292433;
        font-family: system-ui, sans-serif;
      }
      button, select { font: inherit; }
      button, select { cursor: pointer; }
      button:focus-visible, select:focus-visible {
        outline: 3px solid #8565b3;
        outline-offset: 3px;
      }
    `} />
    <App />
  </StrictMode>,
);
