import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { theme } from '../../theme';
import Container from '../ui/Container';
import Button from '../ui/Button';
import TerminalText from '../ui/TerminalText';

const HeroSection = styled.section`
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  padding: 100px 0;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(circle at center, rgba(0, 255, 65, 0.1) 0%, rgba(0, 0, 0, 0) 70%);
    z-index: -1;
  }
`;

const HeroContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
  
  @media (max-width: ${theme.breakpoints.lg}) {
    flex-direction: column-reverse;
    text-align: center;
  }
`;

const HeroTextContent = styled(motion.div)`
  flex: 1;
`;

const HeroHeading = styled(motion.h1)`
  font-size: 3.5rem;
  margin-bottom: 1.5rem;
  line-height: 1.2;
  
  @media (max-width: ${theme.breakpoints.md}) {
    font-size: 2.5rem;
  }
`;

const HeroSubheading = styled(motion.h2)`
  font-size: 1.5rem;
  margin-bottom: 2rem;
  color: ${theme.colors.foreground};
  
  @media (max-width: ${theme.breakpoints.md}) {
    font-size: 1.25rem;
  }
`;

const ButtonGroup = styled(motion.div)`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
  
  @media (max-width: ${theme.breakpoints.lg}) {
    justify-content: center;
  }
  
  @media (max-width: ${theme.breakpoints.sm}) {
    flex-direction: column;
  }
`;

const TerminalContainer = styled(motion.div)`
  flex: 1;
  position: relative;
  height: 400px;
  background-color: ${theme.colors.backgroundSecondary};
  border-radius: ${theme.sizes.borderRadius};
  border: 1px solid ${theme.colors.terminalGreen};
  padding: 2rem;
  box-shadow: 0 0 20px rgba(0, 255, 65, 0.2);
  overflow: hidden;
  
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 30px;
    background: linear-gradient(to right, ${theme.colors.terminalGreenDark}, ${theme.colors.terminalGreen});
    border-top-left-radius: ${theme.sizes.borderRadius};
    border-top-right-radius: ${theme.sizes.borderRadius};
    z-index: 1;
  }
  
  &::after {
    content: "";
    position: absolute;
    top: 10px;
    right: 15px;
    width: 12px;
    height: 12px;
    background-color: ${theme.colors.terminalRed};
    border-radius: 50%;
    z-index: 2;
    box-shadow: -25px 0 0 ${theme.colors.terminalYellow}, -50px 0 0 ${theme.colors.terminalGreen};
  }
`;

const TerminalContent = styled.div`
  margin-top: 20px;
  height: calc(100% - 30px);
  overflow-y: auto;
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const CodeLine = styled(TerminalText)`
  font-family: ${theme.fonts.primary};
  font-size: 0.9rem;
`;

const gradualAppearVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.3 * i,
      duration: 0.5,
    },
  }),
};

const tokenData = {
  name: 'HYPER',
  symbol: 'HYPR',
  blockchain: 'Solana',
  totalSupply: '1,000,000,000',
  initialPrice: '$0.00001',
};

const Hero: React.FC = () => {
  const terminalRef = useRef<HTMLDivElement>(null);
  
  // Auto-scroll terminal content when new items appear
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  });
  
  return (
    <HeroSection id="home">
      <Container fluid>
        <HeroContent>
          <HeroTextContent
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            <TerminalText 
              text="THE FUTURE OF FINANCE IS NOW" 
              as="h1" 
              typingSpeed={40} 
              highlight
              prefix="$ "
              style={{ fontSize: '3.5rem', lineHeight: 1.2, marginBottom: '1.5rem' }}
            />
            
            <TerminalText 
              text="A revolutionary Solana token crafted for the crypto elite"
              as="h2"
              typingSpeed={30}
              delay={2000}
              style={{ fontSize: '1.5rem', marginBottom: '2rem', color: theme.colors.foreground }}
            />
            
            <ButtonGroup
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 4, duration: 0.5 }}
            >
              <Button size="large">JOIN PRESALE</Button>
              <Button size="large" variant="secondary">EXPLORE TOKENOMICS</Button>
            </ButtonGroup>
          </HeroTextContent>
          
          <TerminalContainer
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <TerminalContent ref={terminalRef}>
              <CodeLine 
                text="Initializing Hyper Token protocol..." 
                typingSpeed={20} 
                prefix="> "
              />
              <CodeLine 
                text="Connecting to Solana blockchain..." 
                typingSpeed={20} 
                delay={1000} 
                prefix="> "
              />
              <CodeLine 
                text="Connection established." 
                typingSpeed={20} 
                delay={2500} 
                prefix="> "
                highlight
              />
              <CodeLine 
                text="Loading token data..." 
                typingSpeed={20} 
                delay={3000} 
                prefix="> "
              />
              <CodeLine 
                text={`TOKEN_NAME: ${tokenData.name}`} 
                typingSpeed={20} 
                delay={4000} 
                prefix="> "
              />
              <CodeLine 
                text={`TOKEN_SYMBOL: ${tokenData.symbol}`} 
                typingSpeed={20} 
                delay={4500} 
                prefix="> "
              />
              <CodeLine 
                text={`BLOCKCHAIN: ${tokenData.blockchain}`} 
                typingSpeed={20} 
                delay={5000} 
                prefix="> "
              />
              <CodeLine 
                text={`TOTAL_SUPPLY: ${tokenData.totalSupply}`} 
                typingSpeed={20} 
                delay={5500} 
                prefix="> "
              />
              <CodeLine 
                text={`INITIAL_PRICE: ${tokenData.initialPrice}`} 
                typingSpeed={20} 
                delay={6000} 
                prefix="> "
              />
              <CodeLine 
                text="Market analysis complete. Projected growth: EXTREME" 
                typingSpeed={20} 
                delay={7000} 
                prefix="> "
                highlight
              />
              <CodeLine 
                text="Ready for launch. Awaiting investor action..." 
                typingSpeed={20} 
                delay={8000} 
                prefix="> "
              />
            </TerminalContent>
          </TerminalContainer>
        </HeroContent>
      </Container>
      
      {/* Background matrix effect elements */}
      {Array.from({ length: 50 }).map((_, i) => (
        <motion.div
          key={i}
          style={{
            position: 'absolute',
            color: theme.colors.terminalGreen,
            fontSize: `${Math.random() * 1 + 0.5}rem`,
            opacity: Math.random() * 0.3 + 0.1,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            zIndex: -1,
            textShadow: `0 0 5px ${theme.colors.terminalGreen}`,
          }}
          initial={{ opacity: 0, y: -20 }}
          animate={{ 
            opacity: Math.random() * 0.3 + 0.1, 
            y: window.innerHeight,
            transition: { 
              duration: Math.random() * 15 + 10, 
              repeat: Infinity, 
              delay: Math.random() * 5
            }
          }}
        >
          {String.fromCharCode(Math.floor(Math.random() * 74) + 48)}
        </motion.div>
      ))}
    </HeroSection>
  );
};

export default Hero; 