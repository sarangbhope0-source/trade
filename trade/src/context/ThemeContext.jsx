import React, { createContext, useState, useMemo, useContext } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';

const ColorModeContext = createContext({ toggleColorMode: () => {} });

export const useColorMode = () => useContext(ColorModeContext);

export default function ThemeContextComponent({ children }) {
  const [mode, setMode] = useState('dark');

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
      mode,
    }),
    [mode],
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: {
            main: '#6366f1',
          },
          background: {
            default: mode === 'dark' ? '#0b0e14' : '#f8fafc',
            paper: mode === 'dark' ? '#0f121a' : '#ffffff',
          },
          text: {
            primary: mode === 'dark' ? '#ffffff' : '#0f172a',
            secondary: mode === 'dark' ? 'rgba(255, 255, 255, 0.7)' : '#64748b',
          },
        },
        typography: {
          fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
        },
        shape: {
          borderRadius: 12,
        },
        components: {
          MuiPaper: {
            styleOverrides: {
              root: {
                backgroundImage: 'none',
              },
            },
          },
        },
      }),
    [mode],
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
