import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { theme } from '../../theme';
import Container from '../ui/Container';
import Button from '../ui/Button';
import { List, X } from '@phosphor-icons/react';

const NavbarWrapper = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: ${theme.zIndices.navbar};
  backdrop-filter: blur(10px);
  background-color: rgba(13, 13, 13, 0.8);
  border-bottom: 1px solid ${theme.colors.terminalGreen};
  height: ${theme.sizes.navHeight};
  display: flex;
  align-items: center;
`;

const NavbarContainer = styled(Container)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
`;

const NavBrand = styled(motion.div)`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${theme.colors.terminalGreen};
  display: flex;
  align-items: center;
  cursor: pointer;
  
  span {
    background: linear-gradient(to right, ${theme.colors.terminalGreen}, ${theme.colors.terminalGreenDark});
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: glow 3s ease-in-out infinite;
  }
`;

const NavMenu = styled.nav`
  display: flex;
  align-items: center;
  
  @media (max-width: ${theme.breakpoints.md}) {
    display: none;
  }
`;

const NavLink = styled.a`
  margin-left: 2rem;
  font-weight: 500;
  color: ${theme.colors.foreground};
  position: relative;
  
  &:hover {
    color: ${theme.colors.terminalGreen};
    
    &::after {
      width: 100%;
    }
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 0;
    height: 2px;
    background-color: ${theme.colors.terminalGreen};
    transition: width ${theme.transitions.default};
  }
`;

const MobileMenuButton = styled.button`
  background: none;
  border: none;
  color: ${theme.colors.foreground};
  font-size: 1.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    color: ${theme.colors.terminalGreen};
  }
  
  @media (min-width: ${theme.breakpoints.md}) {
    display: none;
  }
`;

const MobileMenu = styled(motion.div)`
  position: fixed;
  top: ${theme.sizes.navHeight};
  left: 0;
  width: 100%;
  height: calc(100vh - ${theme.sizes.navHeight});
  background-color: ${theme.colors.background};
  border-top: 1px solid ${theme.colors.terminalGreen};
  z-index: ${theme.zIndices.navbar};
  display: flex;
  flex-direction: column;
  padding: 2rem;
`;

const MobileNavLink = styled.a`
  margin-bottom: 1.5rem;
  font-size: 1.25rem;
  font-weight: 500;
  color: ${theme.colors.foreground};
  
  &:hover {
    color: ${theme.colors.terminalGreen};
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 1rem;
`;

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  
  return (
    <NavbarWrapper style={{ 
      boxShadow: isScrolled ? theme.shadows.medium : 'none'
    }}>
      <NavbarContainer fluid>
        <NavBrand
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span>&lt;HYPER/TOKEN&gt;</span>
        </NavBrand>
        
        <NavMenu>
          <NavLink href="#about">ABOUT</NavLink>
          <NavLink href="#tokenomics">TOKENOMICS</NavLink>
          <NavLink href="#roadmap">ROADMAP</NavLink>
          <NavLink href="#whitepaper">WHITEPAPER</NavLink>
          <NavLink href="#team">TEAM</NavLink>
          <ButtonWrapper>
            <Button size="small" as="a" href="#whitepaper">WHITEPAPER</Button>
            <Button size="small" variant="danger">BUY TOKEN</Button>
          </ButtonWrapper>
        </NavMenu>
        
        <MobileMenuButton onClick={toggleMobileMenu}>
          {isMobileMenuOpen ? <X size={24} /> : <List size={24} />}
        </MobileMenuButton>
        
        <AnimatePresence>
          {isMobileMenuOpen && (
            <MobileMenu
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <MobileNavLink href="#about">ABOUT</MobileNavLink>
              <MobileNavLink href="#tokenomics">TOKENOMICS</MobileNavLink>
              <MobileNavLink href="#roadmap">ROADMAP</MobileNavLink>
              <MobileNavLink href="#whitepaper">WHITEPAPER</MobileNavLink>
              <MobileNavLink href="#team">TEAM</MobileNavLink>
              <Button fullWidth as="a" href="#whitepaper">WHITEPAPER</Button>
              <div style={{ height: '1rem' }} />
              <Button fullWidth variant="danger">BUY TOKEN</Button>
            </MobileMenu>
          )}
        </AnimatePresence>
      </NavbarContainer>
    </NavbarWrapper>
  );
};

export default Navbar; 