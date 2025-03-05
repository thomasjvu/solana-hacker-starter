import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';
import { theme } from '../../theme';

interface TerminalTextProps {
  text: string;
  typingSpeed?: number;
  delay?: number;
  color?: string;
  blinkCursor?: boolean;
  className?: string;
  onComplete?: () => void;
  as?: React.ElementType;
  prefix?: string;
  highlight?: boolean;
  style?: React.CSSProperties;
}

const StyledTerminalText = styled(motion.div)<{ highlight?: boolean; color?: string }>`
  display: flex;
  align-items: center;
  font-family: ${theme.fonts.primary};
  color: ${props => props.color || props.highlight ? theme.colors.terminalGreen : theme.colors.foreground};
  position: relative;
  ${props => props.highlight && css`
    text-shadow: 0 0 10px rgba(0, 255, 65, 0.7);
  `}
`;

const Prefix = styled.span`
  color: ${theme.colors.terminalGreen};
  margin-right: 8px;
`;

const Cursor = styled.span<{ blink?: boolean }>`
  display: inline-block;
  width: 10px;
  height: 1.2em;
  background-color: ${theme.colors.terminalGreen};
  margin-left: 5px;
  ${props => props.blink && css`
    animation: blink 1s step-end infinite;
  `}
`;

const TerminalText: React.FC<TerminalTextProps> = ({
  text,
  typingSpeed = 50,
  delay = 0,
  color,
  blinkCursor = true,
  className,
  onComplete,
  as = 'div',
  prefix = '',
  highlight = false,
  style,
}) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    setDisplayedText('');
    setIsComplete(false);
    
    const startTyping = setTimeout(() => {
      setIsTyping(true);
      
      let currentIndex = 0;
      const typingInterval = setInterval(() => {
        if (currentIndex < text.length) {
          setDisplayedText(prev => prev + text.charAt(currentIndex));
          currentIndex++;
        } else {
          clearInterval(typingInterval);
          setIsTyping(false);
          setIsComplete(true);
          if (onComplete) onComplete();
        }
      }, typingSpeed);
      
      return () => clearInterval(typingInterval);
    }, delay);
    
    return () => clearTimeout(startTyping);
  }, [text, typingSpeed, delay, onComplete]);

  return (
    <StyledTerminalText 
      as={as} 
      className={className} 
      highlight={highlight} 
      color={color}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      style={style}
    >
      {prefix && <Prefix>{prefix}</Prefix>}
      {displayedText}
      {!isComplete && <Cursor blink={blinkCursor} />}
    </StyledTerminalText>
  );
};

export default TerminalText; 