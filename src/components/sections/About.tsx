import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { theme } from '../../theme';
import Container from '../ui/Container';
import { Card, CardBody } from '../ui/Card';
import TerminalText from '../ui/TerminalText';
import { Code, Rocket, LockKey, Lightning, Trophy } from '@phosphor-icons/react';

const AboutSection = styled.section`
  position: relative;
  padding: 120px 0;
  background-color: ${theme.colors.backgroundSecondary};
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

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
`;

const FeatureCard = styled(Card)`
  height: 100%;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: ${theme.shadows.large};
  }
`;

const FeatureIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: rgba(0, 255, 65, 0.1);
  margin-bottom: 1.5rem;
  color: ${theme.colors.terminalGreen};
  font-size: 1.5rem;
`;

const FeatureTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;

const FeatureDescription = styled.p`
  color: ${theme.colors.foreground};
  opacity: 0.8;
`;

const CodeBlock = styled.div`
  background-color: ${theme.colors.background};
  border: 1px solid ${theme.colors.terminalGreen};
  border-radius: ${theme.sizes.borderRadius};
  padding: 1.5rem;
  margin: 2rem 0;
  overflow-x: auto;
  position: relative;
  
  &::before {
    content: "// Solana Contract";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    padding: 5px 15px;
    background-color: ${theme.colors.terminalGreenDark};
    color: ${theme.colors.foreground};
    font-size: 0.875rem;
  }
  
  pre {
    margin-top: 1.5rem;
    color: ${theme.colors.foreground};
    font-family: ${theme.fonts.primary};
    font-size: 0.9rem;
    line-height: 1.5;
  }
  
  .comment {
    color: #555;
  }
  
  .keyword {
    color: ${theme.colors.terminalGreen};
  }
  
  .string {
    color: ${theme.colors.terminalRed};
  }
  
  .function {
    color: #659AD2;
  }
  
  .variable {
    color: ${theme.colors.foreground};
  }
`;

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
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

const codeSnippet = `
<span class="comment">// Hyper Token - A revolutionary Solana project</span>
<span class="keyword">async</span> <span class="function">function</span> <span class="function">createHyperToken</span>() {
  <span class="keyword">const</span> <span class="variable">connection</span> = <span class="keyword">new</span> <span class="function">Connection</span>(<span class="string">'https://api.mainnet-beta.solana.com'</span>);
  <span class="keyword">const</span> <span class="variable">wallet</span> = <span class="keyword">new</span> <span class="function">Wallet</span>(<span class="string">'...'</span>);
  
  <span class="comment">// Create mint account with custom parameters</span>
  <span class="keyword">const</span> <span class="variable">tokenParams</span> = {
    <span class="variable">name</span>: <span class="string">'HYPER TOKEN'</span>,
    <span class="variable">symbol</span>: <span class="string">'HYPR'</span>,
    <span class="variable">decimals</span>: <span class="number">9</span>,
    <span class="variable">supply</span>: <span class="string">'1,000,000,000'</span>
  };
  
  <span class="keyword">const</span> <span class="variable">token</span> = <span class="keyword">await</span> <span class="function">createToken</span>(<span class="variable">connection</span>, <span class="variable">wallet</span>, <span class="variable">tokenParams</span>);
  <span class="keyword">return</span> <span class="variable">token</span>;
}
`;

const features = [
  {
    icon: <Rocket size={32} />,
    title: 'Blazing Fast Transactions',
    description: 'Execute transactions with lightning speed on Solana\'s high-performance blockchain.',
  },
  {
    icon: <LockKey size={32} />,
    title: 'Military-Grade Security',
    description: 'Rest easy knowing your assets are protected by advanced cryptographic security.',
  },
  {
    icon: <Lightning size={32} />,
    title: 'Ultra-Low Fees',
    description: 'Enjoy minimal transaction costs thanks to Solana\'s efficient architecture.',
  },
  {
    icon: <Trophy size={32} />,
    title: 'Exclusive Rewards',
    description: 'Early adopters and holders receive special benefits and governance rights.',
  },
];

const About: React.FC = () => {
  return (
    <AboutSection id="about">
      <Container fluid>
        <TerminalText 
          text="ABOUT HYPER TOKEN" 
          as={SectionHeading}
          typingSpeed={30}
          highlight
          prefix="$ "
        />
        
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
        >
          <motion.p variants={itemVariants} style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto', fontSize: '1.1rem' }}>
            HYPER TOKEN is not just another cryptocurrency—it's a revolutionary leap in blockchain technology. 
            Built on the lightning-fast Solana network, our token combines unprecedented speed with 
            military-grade security and innovative tokenomics designed to reward early adopters and long-term holders.
          </motion.p>
          
          <CodeBlock>
            <pre dangerouslySetInnerHTML={{ __html: codeSnippet }} />
          </CodeBlock>
          
          <FeaturesGrid>
            {features.map((feature, index) => (
              <motion.div key={index} variants={itemVariants}>
                <FeatureCard>
                  <CardBody>
                    <FeatureIcon>{feature.icon}</FeatureIcon>
                    <FeatureTitle>{feature.title}</FeatureTitle>
                    <FeatureDescription>{feature.description}</FeatureDescription>
                  </CardBody>
                </FeatureCard>
              </motion.div>
            ))}
          </FeaturesGrid>
        </motion.div>
      </Container>
      
      {/* Animated background elements */}
      {Array.from({ length: 5 }).map((_, i) => (
        <motion.div
          key={i}
          style={{
            position: 'absolute',
            width: `${Math.random() * 200 + 50}px`,
            height: `${Math.random() * 200 + 50}px`,
            borderRadius: '50%',
            background: `radial-gradient(circle at center, rgba(0, 255, 65, ${Math.random() * 0.1}) 0%, rgba(0, 0, 0, 0) 70%)`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            zIndex: -1,
          }}
          animate={{
            x: [0, Math.random() * 50 - 25],
            y: [0, Math.random() * 50 - 25],
            transition: {
              x: {
                duration: Math.random() * 10 + 10,
                repeat: Infinity,
                repeatType: 'reverse'
              },
              y: {
                duration: Math.random() * 10 + 10,
                repeat: Infinity,
                repeatType: 'reverse'
              }
            }
          }}
        />
      ))}
    </AboutSection>
  );
};

export default About; 