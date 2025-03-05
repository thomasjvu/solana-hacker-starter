import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { theme } from '../../theme';
import Container from '../ui/Container';
import { Card, CardBody } from '../ui/Card';
import TerminalText from '../ui/TerminalText';
import Button from '../ui/Button';

const TokenomicsSection = styled.section`
  position: relative;
  padding: 120px 0;
  overflow: hidden;
`;

const SectionHeading = styled(motion.h2)`
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 3rem;
  
  @media (max-width: ${theme.breakpoints.md}) {
    font-size: 2rem;
  }
`;

const TokenomicsContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  
  @media (max-width: ${theme.breakpoints.md}) {
    grid-template-columns: 1fr;
  }
`;

const ChartContainer = styled(motion.div)`
  position: relative;
  border: 1px solid ${theme.colors.terminalGreen};
  border-radius: ${theme.sizes.borderRadius};
  padding: 2rem;
  background: ${theme.colors.backgroundSecondary};
  box-shadow: ${theme.shadows.medium};
  height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const PieChart = styled(motion.div)`
  position: relative;
  width: 250px;
  height: 250px;
  border-radius: 50%;
  background: conic-gradient(
    ${theme.colors.terminalGreen} 0% 30%,
    ${theme.colors.terminalGreenDark} 30% 50%,
    ${theme.colors.terminalRed} 50% 60%,
    ${theme.colors.terminalRedDark} 60% 75%,
    ${theme.colors.terminalYellow} 75% 100%
  );
  margin: 0 auto;
  box-shadow: 0 0 20px rgba(0, 255, 65, 0.2);
  
  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100px;
    height: 100px;
    background: ${theme.colors.backgroundSecondary};
    border-radius: 50%;
    box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.5);
  }
`;

const TokenomicsDetails = styled(motion.div)`
  display: flex;
  flex-direction: column;
`;

const TokenomicsTable = styled.div`
  width: 100%;
  margin-bottom: 2rem;
`;

const TokenomicsRow = styled(motion.div)<{ highlighted?: boolean }>`
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  border-bottom: 1px solid ${props => props.highlighted ? theme.colors.terminalGreen : 'rgba(255, 255, 255, 0.1)'};
  background: ${props => props.highlighted ? 'rgba(0, 255, 65, 0.05)' : 'transparent'};
  
  &:last-child {
    border-bottom: none;
  }
`;

const AllocationLabel = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  .color-indicator {
    width: 12px;
    height: 12px;
    border-radius: 50%;
  }
`;

const AllocationValue = styled.div`
  font-weight: 600;
`;

const TokenomicsCard = styled(Card)`
  margin-top: 1.5rem;
`;

const SwitchContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
`;

const Switch = styled.div`
  display: flex;
  background: ${theme.colors.background};
  border-radius: 30px;
  border: 1px solid ${theme.colors.terminalGreen};
  overflow: hidden;
`;

const SwitchOption = styled.button<{ active: boolean }>`
  padding: 0.5rem 1.5rem;
  border: none;
  background: ${props => props.active ? theme.colors.terminalGreen : 'transparent'};
  color: ${props => props.active ? theme.colors.background : theme.colors.foreground};
  cursor: pointer;
  transition: all ${theme.transitions.default};
  font-family: ${theme.fonts.primary};
  font-weight: 500;
  
  &:hover {
    background: ${props => props.active ? theme.colors.terminalGreen : 'rgba(0, 255, 65, 0.1)'};
  }
`;

const TokenStatRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0.75rem 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  
  &:last-child {
    border-bottom: none;
  }
`;

const StatLabel = styled.div`
  color: ${theme.colors.foreground};
  opacity: 0.8;
`;

const StatValue = styled.div`
  font-weight: 600;
  color: ${theme.colors.terminalGreen};
`;

const tokenAllocations = [
  { name: 'Public Sale', percentage: '30%', color: theme.colors.terminalGreen },
  { name: 'Team & Advisors', percentage: '20%', color: theme.colors.terminalGreenDark },
  { name: 'Marketing', percentage: '10%', color: theme.colors.terminalRed },
  { name: 'Development', percentage: '15%', color: theme.colors.terminalRedDark },
  { name: 'Ecosystem Growth', percentage: '25%', color: theme.colors.terminalYellow },
];

const tokenStats = {
  token: {
    name: 'HYPER Token',
    symbol: 'HYPR',
    blockchain: 'Solana',
    type: 'SPL Token',
    totalSupply: '1,000,000,000',
    initialPrice: '$0.00001',
    expectedLaunch: 'Q3 2023'
  },
  sale: {
    presalePrice: '$0.000005',
    publicPrice: '$0.00001',
    softCap: '$500,000',
    hardCap: '$2,000,000',
    minContribution: '0.1 SOL',
    maxContribution: '100 SOL',
    acceptedPayment: 'SOL, USDC'
  }
};

const tokenomicsVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 }
  },
};

const Tokenomics: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'token' | 'sale'>('token');
  
  return (
    <TokenomicsSection id="tokenomics">
      <Container fluid>
        <TerminalText 
          text="TOKENOMICS" 
          as={SectionHeading}
          typingSpeed={30}
          highlight
          prefix="$ "
        />
        
        <TokenomicsContent>
          <ChartContainer
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <PieChart 
              initial={{ rotate: -90 }}
              whileInView={{ rotate: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              viewport={{ once: true }}
            />
            <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
              <h3>Token Allocation</h3>
              <p style={{ opacity: 0.7 }}>Total Supply: 1,000,000,000 HYPR</p>
            </div>
          </ChartContainer>
          
          <TokenomicsDetails
            variants={tokenomicsVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <TokenomicsTable>
              {tokenAllocations.map((allocation, index) => (
                <TokenomicsRow 
                  key={index} 
                  highlighted={index === 0}
                  variants={itemVariants}
                >
                  <AllocationLabel>
                    <span 
                      className="color-indicator" 
                      style={{ background: allocation.color }}
                    />
                    {allocation.name}
                  </AllocationLabel>
                  <AllocationValue>{allocation.percentage}</AllocationValue>
                </TokenomicsRow>
              ))}
            </TokenomicsTable>
            
            <SwitchContainer>
              <Switch>
                <SwitchOption 
                  active={activeTab === 'token'} 
                  onClick={() => setActiveTab('token')}
                >
                  Token Details
                </SwitchOption>
                <SwitchOption 
                  active={activeTab === 'sale'} 
                  onClick={() => setActiveTab('sale')}
                >
                  Token Sale
                </SwitchOption>
              </Switch>
            </SwitchContainer>
            
            <TokenomicsCard variant="terminal">
              <CardBody>
                {activeTab === 'token' && (
                  <>
                    {Object.entries(tokenStats.token).map(([key, value], index) => (
                      <TokenStatRow key={index}>
                        <StatLabel>{key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}</StatLabel>
                        <StatValue>{value}</StatValue>
                      </TokenStatRow>
                    ))}
                  </>
                )}
                
                {activeTab === 'sale' && (
                  <>
                    {Object.entries(tokenStats.sale).map(([key, value], index) => (
                      <TokenStatRow key={index}>
                        <StatLabel>{key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}</StatLabel>
                        <StatValue>{value}</StatValue>
                      </TokenStatRow>
                    ))}
                  </>
                )}
                
                <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
                  <Button>Buy Tokens Now</Button>
                </div>
              </CardBody>
            </TokenomicsCard>
          </TokenomicsDetails>
        </TokenomicsContent>
      </Container>
      
      {/* Matrix code background effect */}
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={i}
          style={{
            position: 'absolute',
            color: `rgba(0, 255, 65, ${Math.random() * 0.2 + 0.05})`,
            fontSize: `${Math.random() * 0.8 + 0.7}rem`,
            fontFamily: theme.fonts.primary,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            zIndex: -1,
            transform: 'rotate(90deg)',
          }}
          initial={{ opacity: 0, y: -50 }}
          animate={{ 
            opacity: [0, Math.random() * 0.3 + 0.1, 0], 
            y: window.innerHeight,
            transition: { 
              duration: Math.random() * 15 + 10, 
              repeat: Infinity,
              repeatType: 'loop',
              times: [0, 0.1, 1],
              delay: Math.random() * 5
            }
          }}
        >
          {Math.random() > 0.5 ? '1' : '0'}
        </motion.div>
      ))}
    </TokenomicsSection>
  );
};

export default Tokenomics; 