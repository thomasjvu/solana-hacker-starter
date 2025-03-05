import styled from 'styled-components';
import { motion } from 'framer-motion';
import { theme } from '../../theme';

type CardProps = {
  variant?: 'default' | 'terminal' | 'outlined';
  className?: string;
};

export const Card = styled(motion.div)<CardProps>`
  ${({ variant = 'default' }) => {
    let styles = '';
    
    switch (variant) {
      case 'default':
        styles = `
          background-color: ${theme.colors.cardBackground};
          border: none;
          box-shadow: ${theme.shadows.medium};
        `;
        break;
      case 'terminal':
        styles = `
          background-color: ${theme.colors.backgroundSecondary};
          border: 1px solid ${theme.colors.terminalGreen};
          box-shadow: 0 0 10px rgba(0, 255, 65, 0.2);
          
          &::before {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 28px;
            background: linear-gradient(to right, ${theme.colors.terminalGreenDark}, ${theme.colors.terminalGreen});
            border-top-left-radius: ${theme.sizes.borderRadius};
            border-top-right-radius: ${theme.sizes.borderRadius};
            z-index: 1;
          }
          
          &::after {
            content: "";
            position: absolute;
            top: 8px;
            right: 10px;
            width: 12px;
            height: 12px;
            background-color: ${theme.colors.terminalRed};
            border-radius: 50%;
            z-index: 2;
            box-shadow: -20px 0 0 ${theme.colors.terminalYellow}, -40px 0 0 ${theme.colors.terminalGreen};
          }
        `;
        break;
      case 'outlined':
        styles = `
          background-color: transparent;
          border: 1px solid ${theme.colors.terminalGreen};
          box-shadow: none;
        `;
        break;
      default:
        styles = `
          background-color: ${theme.colors.cardBackground};
          border: none;
          box-shadow: ${theme.shadows.medium};
        `;
    }
    
    return `
      position: relative;
      padding: ${variant === 'terminal' ? '40px 20px 20px' : '20px'};
      border-radius: ${theme.sizes.borderRadius};
      overflow: hidden;
      ${styles}
    `;
  }}
`;

export const CardHeader = styled.div`
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  
  h2, h3, h4 {
    margin-bottom: 0;
  }
`;

export const CardBody = styled.div``;

export const CardFooter = styled.div`
  margin-top: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 1rem;
`;

export default Card; 