import { Global } from '@emotion/react';

export default function GlobalStyle() {
  return (
    <Global
      styles={(theme) => ({
        ':root': {
          '--app-background': theme.colors.background,
          '--app-text': theme.colors.text,
          '--app-muted': theme.colors.muted,
          '--app-accent': theme.colors.accent,
        },
        body: {
          minWidth: 320,
          margin: 0,
          backgroundColor: theme.colors.background,
          color: theme.colors.text,
          fontFamily: '"Apple SD Gothic Neo", "Malgun Gothic", system-ui, sans-serif',
        },
      })}
    />
  );
}
