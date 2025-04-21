import { createContext, useState, useContext, useEffect } from 'react';
import { extractColorPalette } from '../utils/themUtils';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [colorTheme, setColorTheme] = useState('blue');
  const [palette, setPalette] = useState(extractColorPalette('blue'));

  // Update palette whenever theme changes
  useEffect(() => {
    setPalette(extractColorPalette(colorTheme));
  }, [colorTheme]);

  return (
    <ThemeContext.Provider value={{ colorTheme, setColorTheme, palette }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}