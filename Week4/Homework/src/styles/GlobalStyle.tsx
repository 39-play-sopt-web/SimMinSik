import { Global, useTheme } from '@emotion/react';

export function GlobalStyle() {
  const theme = useTheme();

  return (
    <Global
      styles={{
        ':root': {
          colorScheme: 'dark',
          '--board-surface': theme.colors.surface,
          '--board-accent': theme.colors.primary,
          '--board-muted': theme.colors.muted,
          '--board-border': theme.colors.border,
        },
        body: {
          margin: 0,
          minWidth: 320,
          backgroundColor: theme.colors.background,
          color: theme.colors.text,
          fontFamily: 'system-ui, sans-serif',
          lineHeight: 1.6,
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
