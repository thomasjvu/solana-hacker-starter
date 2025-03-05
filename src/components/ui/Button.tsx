import styled from 'styled-components';
import { motion } from 'framer-motion';
import { theme } from '../../theme';

type ButtonProps = {
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'small' | 'medium' | 'large';
  fullWidth?: boolean;
  className?: string;
};

const getButtonColors = (variant: string) => {
  switch (variant) {
    case 'primary':
      return {
        background: 'transparent',
        border: theme.colors.terminalGreen,
        color: theme.colors.terminalGreen,
        hoverBackground: theme.colors.terminalGreenDark,
        hoverColor: theme.colors.foreground
      };
    case 'secondary':
      return {
        background: 'transparent',
        border: theme.colors.foreground,
        color: theme.colors.foreground,
        hoverBackground: 'rgba(248, 248, 248, 0.1)',
        hoverColor: theme.colors.foreground
      };
    case 'danger':
      return {
        background: 'transparent',
        border: theme.colors.terminalRed,
        color: theme.colors.terminalRed,
        hoverBackground: theme.colors.terminalRedDark,
        hoverColor: theme.colors.foreground
      };
    default:
      return {
        background: 'transparent',
        border: theme.colors.terminalGreen,
        color: theme.colors.terminalGreen,
        hoverBackground: theme.colors.terminalGreenDark,
        hoverColor: theme.colors.foreground
      };
  }
};

const getButtonSize = (size: string) => {
  switch (size) {
    case 'small':
      return {
        padding: '8px 16px',
        fontSize: '0.875rem'
      };
    case 'medium':
      return {
        padding: '12px 24px',
        fontSize: '1rem'
      };
    case 'large':
      return {
        padding: '16px 32px',
        fontSize: '1.125rem'
      };
    default:
      return {
        padding: '12px 24px',
        fontSize: '1rem'
      };
  }
};

export const Button = styled(motion.button)<ButtonProps>`
  ${({ variant = 'primary', size = 'medium', fullWidth }) => {
    const colors = getButtonColors(variant);
    const dimensions = getButtonSize(size);

    return `
      background: ${colors.background};
      color: ${colors.color};
      border: 2px solid ${colors.border};
      padding: ${dimensions.padding};
      font-size: ${dimensions.fontSize};
      width: ${fullWidth ? '100%' : 'auto'};
      font-family: ${theme.fonts.primary};
      font-weight: 500;
      letter-spacing: 0.5px;
      cursor: pointer;
      transition: all ${theme.transitions.default};
      border-radius: ${theme.sizes.borderRadius};
      position: relative;
      overflow: hidden;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      text-transform: uppercase;
      
      &:hover {
        background: ${colors.hoverBackground};
        color: ${colors.hoverColor};
        box-shadow: 0 0 10px ${colors.border}80;
      }
      
      &:focus {
        outline: none;
      }
      
      &:active {
        transform: translateY(1px);
      }
      
      &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
        
        &:hover {
          background: ${colors.background};
          color: ${colors.color};
          box-shadow: none;
        }
      }
    `;
  }}
`;

export default Button; 