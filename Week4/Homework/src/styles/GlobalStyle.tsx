import { Global, useTheme } from '@emotion/react';

export function GlobalStyle() {
  const theme = useTheme();

  return (
    <Global
      styles={{
        body: {
          margin: 0,
          minWidth: 320,
          backgroundColor: theme.colors.background,
          color: theme.colors.text,
          fontFamily: 'system-ui, sans-serif',
        },
        'button, input, textarea, select': {
          font: 'inherit',
        },
        'button:not(:disabled), select': {
          cursor: 'pointer',
        },
        ':focus-visible': {
          outline: `2px solid ${theme.colors.primary}`,
          outlineOffset: 4,
        },
      }}
    />
  );
}
