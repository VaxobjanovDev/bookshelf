import { createContext, useContext } from 'react'

interface ThemeContextProps {
  toggleColorMode: () => void;
}

export const ThemeContext = createContext<ThemeContextProps>({
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  toggleColorMode: () => {}
})

export const useThemeContext = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}
