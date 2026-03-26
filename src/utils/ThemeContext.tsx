import { createContext, useContext, type ReactNode } from 'react';
import { useDarkMode } from '../hooks/useDarkMode';

interface ThemeContextType {
  dark: boolean;
  toggle: () => void;
}

const ThemeContext = createContext<ThemeContextType>({ dark: false, toggle: () => {} });

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const { dark, toggle } = useDarkMode();
  return <ThemeContext.Provider value={{ dark, toggle }}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => useContext(ThemeContext);
