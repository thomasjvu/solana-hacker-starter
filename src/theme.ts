export const theme = {
  colors: {
    // Terminal-like colors
    background: '#0D0D0D',
    backgroundSecondary: '#151515',
    foreground: '#F8F8F8',
    terminalGreen: '#00FF41', // Terminal green accent
    terminalGreenDark: '#008F11',
    terminalRed: '#FF3E3E', // Terminal red accent
    terminalRedDark: '#CC0000',
    terminalYellow: '#F4D03F',
    accent: '#00FF41',
    accentDark: '#008F11',
    cardBackground: 'rgba(30, 30, 30, 0.5)',
    overlayBackground: 'rgba(0, 0, 0, 0.8)',
    
    // Button colors
    buttonBackground: '#151515',
    buttonBorder: '#00FF41',
    buttonHover: '#008F11',
    
    // Input colors
    inputBackground: '#151515',
    inputBorder: '#333333',
    inputBorderFocus: '#00FF41',
  },
  
  fonts: {
    primary: '"JetBrains Mono", monospace',
  },
  
  shadows: {
    small: '0 2px 8px rgba(0, 255, 65, 0.15)',
    medium: '0 4px 16px rgba(0, 255, 65, 0.2)',
    large: '0 8px 32px rgba(0, 255, 65, 0.25)',
  },
  
  sizes: {
    maxWidth: '1200px',
    navHeight: '80px',
    borderRadius: '4px',
  },
  
  breakpoints: {
    xs: '320px',
    sm: '576px',
    md: '768px',
    lg: '992px',
    xl: '1200px',
  },
  
  transitions: {
    default: '0.3s ease',
    fast: '0.15s ease',
    slow: '0.5s ease',
  },
  
  zIndices: {
    navbar: 100,
    modal: 200,
    tooltip: 300,
  },
}; 