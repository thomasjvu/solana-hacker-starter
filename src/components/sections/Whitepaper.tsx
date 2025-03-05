import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { theme } from '../../theme';
import Container from '../ui/Container';
import { Card } from '../ui/Card';
import Button from '../ui/Button';
import TerminalText from '../ui/TerminalText';
import { 
  FilePdf, 
  Download, 
  ChartLine, 
  LockKey, 
  Lightbulb, 
  ChartBar,
  Eye
} from '@phosphor-icons/react';

const WhitepaperSection = styled.section`
  position: relative;
  padding: 120px 0;
  background-color: ${theme.colors.backgroundSecondary};
  overflow: hidden;
`;

const SectionHeading = styled(motion.h2)`
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 1rem;
  
  @media (max-width: ${theme.breakpoints.md}) {
    font-size: 2rem;
  }
`;

const SubHeading = styled.h3`
  font-size: 1.25rem;
  text-align: center;
  margin-bottom: 3rem;
  color: ${theme.colors.foreground};
  opacity: 0.8;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
`;

const WhitepaperContent = styled.div`
  display: flex;
  gap: 3rem;
  align-items: stretch;
  
  @media (max-width: ${theme.breakpoints.lg}) {
    flex-direction: column;
  }
`;

const DownloadSection = styled(motion.div)`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const DocumentPreview = styled(Card)`
  width: 100%;
  aspect-ratio: 0.7;
  margin-bottom: 2rem;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: ${theme.shadows.medium};
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(
      circle at center,
      rgba(0, 255, 65, 0.05) 0%,
      rgba(0, 0, 0, 0) 70%
    );
    z-index: 1;
  }
`;

const DocumentIcon = styled.div`
  font-size: 4rem;
  color: ${theme.colors.terminalGreen};
  margin-bottom: 1rem;
  animation: glow 3s ease-in-out infinite;
`;

const DocumentTitle = styled.h4`
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
`;

const DocumentMeta = styled.div`
  margin-bottom: 2rem;
  color: ${theme.colors.foreground};
  opacity: 0.7;
  font-size: 0.9rem;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  
  @media (max-width: ${theme.breakpoints.sm}) {
    flex-direction: column;
  }
`;

const ContentContainer = styled(motion.div)`
  flex: 2;
`;

const WhitepaperTabs = styled.div`
  display: flex;
  margin-bottom: 1.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  overflow-x: auto;
  
  /* Hide scrollbar */
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

const TabButton = styled.button<{ active: boolean }>`
  background: ${props => props.active ? 'rgba(0, 255, 65, 0.1)' : 'transparent'};
  border: none;
  color: ${props => props.active ? theme.colors.terminalGreen : theme.colors.foreground};
  padding: 0.75rem 1.5rem;
  cursor: pointer;
  font-family: ${theme.fonts.primary};
  font-size: 0.9rem;
  position: relative;
  white-space: nowrap;
  
  &:hover {
    color: ${theme.colors.terminalGreen};
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: -1px;
    left: 0;
    width: ${props => props.active ? '100%' : '0'};
    height: 2px;
    background-color: ${theme.colors.terminalGreen};
    transition: width ${theme.transitions.default};
  }
`;

const TabContent = styled(Card)`
  padding: 2rem;
`;

const TabSection = styled.div`
  margin-bottom: 2rem;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const TabSectionTitle = styled.h4`
  font-size: 1.25rem;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  
  svg {
    color: ${theme.colors.terminalGreen};
  }
`;

const TabParagraph = styled.p`
  margin-bottom: 1rem;
  line-height: 1.6;
  opacity: 0.9;
`;

const ContentList = styled.ul`
  padding-left: 1.5rem;
  margin-bottom: 1.5rem;
`;

const ContentListItem = styled.li`
  margin-bottom: 0.5rem;
  position: relative;
  line-height: 1.5;
  
  &::before {
    content: '›';
    position: absolute;
    left: -1.5rem;
    color: ${theme.colors.terminalGreen};
  }
`;

const CodeBlock = styled.div`
  background-color: ${theme.colors.background};
  border: 1px solid ${theme.colors.terminalGreen};
  border-radius: ${theme.sizes.borderRadius};
  padding: 1rem;
  font-family: ${theme.fonts.primary};
  font-size: 0.85rem;
  overflow-x: auto;
  margin: 1.5rem 0;
  
  code {
    color: ${theme.colors.foreground};
  }
  
  .keyword {
    color: ${theme.colors.terminalGreen};
  }
  
  .string {
    color: ${theme.colors.terminalRed};
  }
  
  .comment {
    color: #555;
  }
`;

const TableContainer = styled.div`
  overflow-x: auto;
  margin: 1.5rem 0;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  
  th, td {
    padding: 0.75rem 1rem;
    text-align: left;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }
  
  th {
    color: ${theme.colors.terminalGreen};
    font-weight: 600;
  }
  
  tr:last-child td {
    border-bottom: none;
  }
`;

const tabs = [
  { id: 'abstract', label: 'Abstract' },
  { id: 'tokenomics', label: 'Tokenomics' },
  { id: 'technology', label: 'Technology' },
  { id: 'usecases', label: 'Use Cases' },
];

const Whitepaper: React.FC = () => {
  const [activeTab, setActiveTab] = useState('abstract');
  
  return (
    <WhitepaperSection id="whitepaper">
      <Container fluid>
        <TerminalText 
          text="WHITEPAPER" 
          as={SectionHeading}
          typingSpeed={30}
          highlight
          prefix="$ "
        />
        
        <SubHeading>
          Our comprehensive technical document outlining HYPER TOKEN's technology, economics, and vision.
        </SubHeading>
        
        <WhitepaperContent>
          <DownloadSection
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <DocumentPreview variant="terminal">
              <div>
                <DocumentIcon>
                  <FilePdf size={96} weight="thin" />
                </DocumentIcon>
                <DocumentTitle>HYPER TOKEN Whitepaper</DocumentTitle>
                <DocumentMeta>Version 1.2 • 45 pages • Last updated: June 2024</DocumentMeta>
              </div>
            </DocumentPreview>
            
            <ButtonGroup>
              <Button size="large">
                <Download size={20} weight="bold" style={{ marginRight: '0.5rem' }} />
                Download PDF
              </Button>
              <Button 
                size="large" 
                variant="secondary"
                as="a" 
                href="https://example.com/hyper-token-whitepaper" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <Eye size={20} weight="bold" style={{ marginRight: '0.5rem' }} />
                View Online
              </Button>
            </ButtonGroup>
          </DownloadSection>
          
          <ContentContainer
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <WhitepaperTabs>
              {tabs.map(tab => (
                <TabButton 
                  key={tab.id}
                  active={activeTab === tab.id}
                  onClick={() => setActiveTab(tab.id)}
                >
                  {tab.label}
                </TabButton>
              ))}
            </WhitepaperTabs>
            
            <TabContent variant="terminal">
              {activeTab === 'abstract' && (
                <>
                  <TabSection>
                    <TabSectionTitle>
                      <Lightbulb size={24} weight="fill" />
                      Introduction
                    </TabSectionTitle>
                    <TabParagraph>
                      HYPER TOKEN is a next-generation cryptocurrency built on the Solana blockchain, designed to revolutionize decentralized finance through lightning-fast transactions, minimal fees, and innovative tokenomics that reward long-term holders while ensuring sustainable growth.
                    </TabParagraph>
                    <TabParagraph>
                      In an increasingly digital world, the need for efficient, secure, and accessible financial systems has never been more apparent. HYPER TOKEN addresses these needs by leveraging the power of blockchain technology to create a decentralized ecosystem that empowers users and removes traditional financial barriers.
                    </TabParagraph>
                  </TabSection>
                  
                  <TabSection>
                    <TabSectionTitle>
                      <ChartLine size={24} weight="fill" />
                      Vision & Mission
                    </TabSectionTitle>
                    <TabParagraph>
                      Our vision is to create a global financial ecosystem where transactions are seamless, secure, and accessible to everyone, regardless of geographical location or economic status.
                    </TabParagraph>
                    <ContentList>
                      <ContentListItem>
                        <strong>Accessibility:</strong> Remove barriers to financial services for the unbanked and underbanked populations worldwide.
                      </ContentListItem>
                      <ContentListItem>
                        <strong>Efficiency:</strong> Leverage Solana's high-performance blockchain to provide near-instantaneous transactions with minimal fees.
                      </ContentListItem>
                      <ContentListItem>
                        <strong>Innovation:</strong> Continuously develop and integrate cutting-edge blockchain technologies to stay at the forefront of the crypto revolution.
                      </ContentListItem>
                      <ContentListItem>
                        <strong>Community:</strong> Foster a strong, engaged community that participates in governance and helps shape the future of the project.
                      </ContentListItem>
                    </ContentList>
                  </TabSection>
                </>
              )}
              
              {activeTab === 'tokenomics' && (
                <>
                  <TabSection>
                    <TabSectionTitle>
                      <ChartBar size={24} weight="fill" />
                      Token Distribution
                    </TabSectionTitle>
                    <TabParagraph>
                      HYPER TOKEN has a fixed supply of 1,000,000,000 (1 billion) tokens, distributed strategically to ensure long-term project sustainability and fair allocation.
                    </TabParagraph>
                    <TableContainer>
                      <Table>
                        <thead>
                          <tr>
                            <th>Allocation</th>
                            <th>Percentage</th>
                            <th>Amount (HYPR)</th>
                            <th>Vesting Period</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>Public Sale</td>
                            <td>30%</td>
                            <td>300,000,000</td>
                            <td>No lock</td>
                          </tr>
                          <tr>
                            <td>Team & Advisors</td>
                            <td>20%</td>
                            <td>200,000,000</td>
                            <td>2-year linear vesting</td>
                          </tr>
                          <tr>
                            <td>Marketing</td>
                            <td>10%</td>
                            <td>100,000,000</td>
                            <td>1-year linear vesting</td>
                          </tr>
                          <tr>
                            <td>Development</td>
                            <td>15%</td>
                            <td>150,000,000</td>
                            <td>2-year linear vesting</td>
                          </tr>
                          <tr>
                            <td>Ecosystem Growth</td>
                            <td>25%</td>
                            <td>250,000,000</td>
                            <td>3-year linear vesting</td>
                          </tr>
                        </tbody>
                      </Table>
                    </TableContainer>
                  </TabSection>
                </>
              )}
              
              {activeTab === 'technology' && (
                <>
                  <TabSection>
                    <TabSectionTitle>
                      <LockKey size={24} weight="fill" />
                      Blockchain Architecture
                    </TabSectionTitle>
                    <TabParagraph>
                      HYPER TOKEN is built on the Solana blockchain, utilizing its Proof-of-History consensus mechanism to achieve industry-leading transaction speeds and minimal gas fees.
                    </TabParagraph>
                    <CodeBlock>
                      <code>
                        <span className="comment">// Example of HYPER TOKEN smart contract function</span><br />
                        <span className="keyword">async</span> <span className="keyword">function</span> <span>initializeHyperToken</span>() {'{'}<br />
                        &nbsp;&nbsp;<span className="keyword">const</span> <span>tokenMint</span> = <span className="keyword">await</span> <span>Token.createMint</span>(<br />
                        &nbsp;&nbsp;&nbsp;&nbsp;connection,<br />
                        &nbsp;&nbsp;&nbsp;&nbsp;payer,<br />
                        &nbsp;&nbsp;&nbsp;&nbsp;mintAuthority.publicKey,<br />
                        &nbsp;&nbsp;&nbsp;&nbsp;freezeAuthority.publicKey,<br />
                        &nbsp;&nbsp;&nbsp;&nbsp;9, <span className="comment">// 9 decimals</span><br />
                        &nbsp;&nbsp;&nbsp;&nbsp;TOKEN_PROGRAM_ID<br />
                        &nbsp;&nbsp;);<br />
                        &nbsp;&nbsp;<span className="keyword">return</span> tokenMint;<br />
                        {'}'}
                      </code>
                    </CodeBlock>
                    <TabParagraph>
                      Key technical features of our implementation include:
                    </TabParagraph>
                    <ContentList>
                      <ContentListItem>
                        <strong>SPL Token Standard:</strong> Compliant with Solana's native token standard for maximum compatibility with the ecosystem.
                      </ContentListItem>
                      <ContentListItem>
                        <strong>Atomic Transactions:</strong> All transfers and swaps are atomic, ensuring they either complete fully or fail without partial execution.
                      </ContentListItem>
                      <ContentListItem>
                        <strong>Program Upgradability:</strong> Smart contract architecture designed for secure, transparent upgrades through governance approval.
                      </ContentListItem>
                    </ContentList>
                  </TabSection>
                </>
              )}
              
              {activeTab === 'usecases' && (
                <>
                  <TabSection>
                    <TabSectionTitle>
                      <Lightbulb size={24} weight="fill" />
                      Practical Applications
                    </TabSectionTitle>
                    <TabParagraph>
                      HYPER TOKEN is designed with versatility in mind, enabling a wide range of applications across various sectors of the digital economy.
                    </TabParagraph>
                    <ContentList>
                      <ContentListItem>
                        <strong>Decentralized Finance (DeFi):</strong> Lending, borrowing, yield farming, and liquidity provision with minimal fees and rapid settlement.
                      </ContentListItem>
                      <ContentListItem>
                        <strong>Cross-Border Payments:</strong> Instant, low-cost international transfers without the delays and fees associated with traditional banking systems.
                      </ContentListItem>
                      <ContentListItem>
                        <strong>NFT Marketplace:</strong> Seamless integration with digital collectibles and virtual real estate platforms.
                      </ContentListItem>
                      <ContentListItem>
                        <strong>Governance:</strong> Community participation in protocol decisions through proposal and voting mechanisms.
                      </ContentListItem>
                      <ContentListItem>
                        <strong>Staking Rewards:</strong> Passive income generation through participation in network security and transaction validation.
                      </ContentListItem>
                    </ContentList>
                  </TabSection>
                </>
              )}
            </TabContent>
          </ContentContainer>
        </WhitepaperContent>
      </Container>
      
      {/* Background elements */}
      {Array.from({ length: 10 }).map((_, i) => (
        <motion.div
          key={i}
          style={{
            position: 'absolute',
            background: `radial-gradient(circle at center, rgba(0, 255, 65, ${Math.random() * 0.1 + 0.05}) 0%, rgba(0, 0, 0, 0) 70%)`,
            width: `${Math.random() * 300 + 100}px`,
            height: `${Math.random() * 300 + 100}px`,
            borderRadius: '50%',
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            zIndex: -1,
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
            transition: { 
              duration: Math.random() * 8 + 4, 
              repeat: Infinity,
              repeatType: 'mirror'
            }
          }}
        />
      ))}
    </WhitepaperSection>
  );
};

export default Whitepaper; 