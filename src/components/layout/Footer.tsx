import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { theme } from '../../theme';
import Container from '../ui/Container';
import { 
  DiscordLogo, 
  TwitterLogo, 
  TelegramLogo, 
  GithubLogo, 
  MediumLogo,
  CaretRight
} from '@phosphor-icons/react';

const FooterWrapper = styled.footer`
  position: relative;
  padding: 80px 0 40px;
  background-color: ${theme.colors.backgroundSecondary};
  border-top: 1px solid ${theme.colors.terminalGreen};
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 1px;
    background: linear-gradient(to right, transparent, ${theme.colors.terminalGreen}, transparent);
    opacity: 0.5;
  }
`;

const FooterGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: 2rem;
  
  @media (max-width: ${theme.breakpoints.md}) {
    grid-template-columns: 1fr 1fr;
  }
  
  @media (max-width: ${theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`;

const LogoColumn = styled.div`
  display: flex;
  flex-direction: column;
`;

const FooterLogo = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${theme.colors.terminalGreen};
  margin-bottom: 1rem;
  
  span {
    background: linear-gradient(to right, ${theme.colors.terminalGreen}, ${theme.colors.terminalGreenDark});
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;

const FooterDescription = styled.p`
  color: ${theme.colors.foreground};
  opacity: 0.7;
  margin-bottom: 1.5rem;
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

const SocialLink = styled(motion.a)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: rgba(0, 255, 65, 0.1);
  color: ${theme.colors.terminalGreen};
  transition: all ${theme.transitions.default};
  
  &:hover {
    background-color: ${theme.colors.terminalGreen};
    color: ${theme.colors.background};
    box-shadow: 0 0 10px rgba(0, 255, 65, 0.5);
  }
`;

const FooterColumn = styled.div`
  display: flex;
  flex-direction: column;
`;

const ColumnTitle = styled.h3`
  font-size: 1.25rem;
  margin-bottom: 1.5rem;
  color: ${theme.colors.terminalGreen};
  position: relative;
  padding-bottom: 0.5rem;
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 30px;
    height: 2px;
    background-color: ${theme.colors.terminalGreen};
  }
`;

const FooterLink = styled.a`
  color: ${theme.colors.foreground};
  margin-bottom: 0.75rem;
  opacity: 0.7;
  transition: all ${theme.transitions.default};
  display: flex;
  align-items: center;
  
  &:hover {
    color: ${theme.colors.terminalGreen};
    opacity: 1;
    padding-left: 5px;
  }
  
  svg {
    margin-right: 5px;
    opacity: 0;
    transition: opacity ${theme.transitions.default};
  }
  
  &:hover svg {
    opacity: 1;
  }
`;

const Copyright = styled.div`
  margin-top: 3rem;
  padding-top: 1.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  text-align: center;
  color: ${theme.colors.foreground};
  opacity: 0.5;
  font-size: 0.9rem;
`;

const Footer: React.FC = () => {
  return (
    <FooterWrapper>
      <Container fluid>
        <FooterGrid>
          <LogoColumn>
            <FooterLogo>
              <span>&lt;HYPER/TOKEN&gt;</span>
            </FooterLogo>
            <FooterDescription>
              A revolutionary Solana token project designed to transform the crypto landscape with cutting-edge technology and community-driven development.
            </FooterDescription>
            <SocialLinks>
              <SocialLink 
                href="#" 
                target="_blank" 
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <DiscordLogo size={20} weight="fill" />
              </SocialLink>
              <SocialLink 
                href="#" 
                target="_blank" 
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <TwitterLogo size={20} weight="fill" />
              </SocialLink>
              <SocialLink 
                href="#" 
                target="_blank" 
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <TelegramLogo size={20} weight="fill" />
              </SocialLink>
              <SocialLink 
                href="#" 
                target="_blank" 
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <GithubLogo size={20} weight="fill" />
              </SocialLink>
              <SocialLink 
                href="#" 
                target="_blank" 
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <MediumLogo size={20} weight="fill" />
              </SocialLink>
            </SocialLinks>
          </LogoColumn>
          
          <FooterColumn>
            <ColumnTitle>Quick Links</ColumnTitle>
            <FooterLink href="#"><CaretRight size={14} weight="bold" />About</FooterLink>
            <FooterLink href="#"><CaretRight size={14} weight="bold" />Tokenomics</FooterLink>
            <FooterLink href="#"><CaretRight size={14} weight="bold" />Roadmap</FooterLink>
            <FooterLink href="#"><CaretRight size={14} weight="bold" />Team</FooterLink>
            <FooterLink href="#"><CaretRight size={14} weight="bold" />FAQ</FooterLink>
          </FooterColumn>
          
          <FooterColumn>
            <ColumnTitle>Resources</ColumnTitle>
            <FooterLink href="#"><CaretRight size={14} weight="bold" />Whitepaper</FooterLink>
            <FooterLink href="#"><CaretRight size={14} weight="bold" />Documentation</FooterLink>
            <FooterLink href="#"><CaretRight size={14} weight="bold" />Github</FooterLink>
            <FooterLink href="#"><CaretRight size={14} weight="bold" />Press Kit</FooterLink>
            <FooterLink href="#"><CaretRight size={14} weight="bold" />Brand Assets</FooterLink>
          </FooterColumn>
          
          <FooterColumn>
            <ColumnTitle>Legal</ColumnTitle>
            <FooterLink href="#"><CaretRight size={14} weight="bold" />Privacy Policy</FooterLink>
            <FooterLink href="#"><CaretRight size={14} weight="bold" />Terms of Service</FooterLink>
            <FooterLink href="#"><CaretRight size={14} weight="bold" />Disclaimer</FooterLink>
            <FooterLink href="#"><CaretRight size={14} weight="bold" />Cookie Policy</FooterLink>
          </FooterColumn>
        </FooterGrid>
        
        <Copyright>
          &copy; {new Date().getFullYear()} HYPER TOKEN. All rights reserved.
        </Copyright>
      </Container>
      
      {/* Terminal code line effect */}
      {Array.from({ length: 3 }).map((_, i) => (
        <motion.div
          key={i}
          style={{
            position: 'absolute',
            bottom: `${i * 30}px`,
            left: 0,
            width: '100%',
            height: '1px',
            background: `linear-gradient(90deg, 
              rgba(0,255,65,0) 0%, 
              rgba(0,255,65,${0.05 + i * 0.02}) ${10 + i * 5}%, 
              rgba(0,255,65,${0.1 + i * 0.03}) 50%, 
              rgba(0,255,65,${0.05 + i * 0.02}) ${90 - i * 5}%, 
              rgba(0,255,65,0) 100%)`,
            zIndex: 1,
          }}
          animate={{
            opacity: [0.3, 1, 0.3],
            transition: {
              duration: 3 + i,
              repeat: Infinity,
              ease: 'easeInOut'
            }
          }}
        />
      ))}
    </FooterWrapper>
  );
};

export default Footer; 