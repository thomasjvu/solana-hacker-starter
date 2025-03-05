import { createGlobalStyle } from 'styled-components';
import { theme } from './theme';

export const GlobalStyles = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    background-color: ${theme.colors.background};
    color: ${theme.colors.foreground};
    font-family: ${theme.fonts.primary};
    overflow-x: hidden;
    line-height: 1.5;
    position: relative;
    
    /* Terminal scanline effect */
    &::before {
      content: "";
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background: linear-gradient(
        to bottom,
        rgba(0, 0, 0, 0) 50%,
        rgba(0, 0, 0, 0.02) 50%
      );
      background-size: 100% 4px;
      z-index: 999;
      pointer-events: none;
      opacity: 0.3;
    }
    
    /* CRT flicker animation */
    &::after {
      content: "";
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background: rgba(18, 16, 16, 0);
      z-index: 998;
      pointer-events: none;
      animation: flicker 0.3s infinite;
      opacity: 0.02;
    }
  }

  /* Scrollbar styling */
  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: ${theme.colors.backgroundSecondary};
  }

  ::-webkit-scrollbar-thumb {
    background: ${theme.colors.terminalGreenDark};
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: ${theme.colors.terminalGreen};
  }

  h1, h2, h3, h4, h5, h6 {
    font-weight: 700;
    line-height: 1.2;
    margin-bottom: 1rem;
    color: ${theme.colors.terminalGreen};
  }

  p {
    margin-bottom: 1rem;
  }

  a {
    color: ${theme.colors.terminalGreen};
    text-decoration: none;
    transition: color ${theme.transitions.fast};

    &:hover {
      color: ${theme.colors.terminalGreenDark};
    }
  }

  button {
    cursor: pointer;
    font-family: ${theme.fonts.primary};
  }

  /* Terminal blinking cursor effect */
  .cursor {
    display: inline-block;
    width: 10px;
    height: 1.2em;
    background-color: ${theme.colors.terminalGreen};
    animation: blink 1s step-end infinite;
    vertical-align: middle;
    margin-left: 5px;
  }

  /* CRT flicker animation */
  @keyframes flicker {
    0% {
      background: rgba(18, 16, 16, 0);
    }
    100% {
      background: rgba(18, 16, 16, 0.1);
    }
  }

  /* Blinking cursor animation */
  @keyframes blink {
    from, to {
      opacity: 1;
    }
    50% {
      opacity: 0;
    }
  }

  /* Terminal text typing animation */
  @keyframes typing {
    from {
      width: 0;
    }
    to {
      width: 100%;
    }
  }

  /* Terminal text appear animation */
  @keyframes appear {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  /* Glow animation */
  @keyframes glow {
    0%, 100% {
      text-shadow: 0 0 10px rgba(0, 255, 65, 0.5);
    }
    50% {
      text-shadow: 0 0 20px rgba(0, 255, 65, 0.8);
    }
  }
`;

export default GlobalStyles; 