import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { theme } from '../../theme';
import Container from '../ui/Container';
import { Card } from '../ui/Card';
import TerminalText from '../ui/TerminalText';
import { 
  LinkedinLogo, 
  TwitterLogo, 
  GithubLogo, 
  Globe, 
  X,
  User,
  Briefcase,
  Star,
  PresentationChart,
  CurrencyCircleDollar
} from '@phosphor-icons/react';

const TeamSection = styled.section`
  position: relative;
  padding: 120px 0;
  background-color: ${theme.colors.background};
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

const TeamGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
`;

const MemberCard = styled(Card)`
  cursor: pointer;
  overflow: hidden;
  transition: transform ${theme.transitions.default}, box-shadow ${theme.transitions.default};
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: ${theme.shadows.large};
  }
`;

const MemberImageContainer = styled.div`
  position: relative;
  height: 280px;
  width: 100%;
  overflow: hidden;
  background-color: ${theme.colors.backgroundSecondary};
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0) 0%,
      rgba(0, 0, 0, 0.7) 100%
    );
    z-index: 1;
  }
`;

const MemberImage = styled.div<{ image: string }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(${props => props.image});
  background-size: cover;
  background-position: center;
  transition: transform ${theme.transitions.slow};
  
  ${MemberCard}:hover & {
    transform: scale(1.05);
  }
`;

const MemberInfo = styled.div`
  padding: 1.5rem;
  position: relative;
`;

const MemberRole = styled.div`
  position: absolute;
  top: -40px;
  right: 1.5rem;
  background-color: ${theme.colors.terminalGreen};
  color: ${theme.colors.background};
  padding: 0.5rem 1rem;
  font-size: 0.8rem;
  font-weight: 600;
  border-radius: ${theme.sizes.borderRadius};
  z-index: 2;
  box-shadow: ${theme.shadows.small};
`;

const MemberName = styled.h4`
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
`;

const MemberTitle = styled.p`
  color: ${theme.colors.foreground};
  opacity: 0.7;
  margin-bottom: 1rem;
  font-size: 0.9rem;
`;

const MemberSocial = styled.div`
  display: flex;
  gap: 1rem;
`;

const SocialLink = styled.a`
  color: ${theme.colors.foreground};
  opacity: 0.5;
  transition: opacity ${theme.transitions.fast}, color ${theme.transitions.fast};
  
  &:hover {
    opacity: 1;
    color: ${theme.colors.terminalGreen};
  }
`;

const TeamCategories = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 3rem;
  flex-wrap: wrap;
`;

const CategoryButton = styled.button<{ active: boolean }>`
  background: ${props => props.active ? theme.colors.terminalGreen : 'transparent'};
  color: ${props => props.active ? theme.colors.background : theme.colors.foreground};
  border: 2px solid ${props => props.active ? theme.colors.terminalGreen : 'rgba(255, 255, 255, 0.1)'};
  border-radius: 30px;
  padding: 0.5rem 1.25rem;
  font-family: ${theme.fonts.primary};
  font-size: 0.9rem;
  cursor: pointer;
  transition: all ${theme.transitions.default};
  
  &:hover {
    border-color: ${theme.colors.terminalGreen};
    color: ${props => props.active ? theme.colors.background : theme.colors.terminalGreen};
  }
`;

const ModalOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${theme.colors.overlayBackground};
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: ${theme.zIndices.modal};
  padding: 2rem;
  
  @media (max-width: ${theme.breakpoints.sm}) {
    padding: 1rem;
  }
`;

const ModalContent = styled(motion(Card))`
  position: relative;
  width: 100%;
  max-width: 800px;
  max-height: 90vh;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  
  @media (min-width: ${theme.breakpoints.md}) {
    flex-direction: row;
  }
`;

const ModalCloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: rgba(0, 0, 0, 0.5);
  border: none;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${theme.colors.foreground};
  cursor: pointer;
  z-index: 10;
  
  &:hover {
    background: rgba(0, 0, 0, 0.7);
  }
`;

const ModalImageContainer = styled.div`
  position: relative;
  flex: 1;
  min-height: 300px;
  
  @media (min-width: ${theme.breakpoints.md}) {
    max-width: 40%;
  }
`;

const ModalImage = styled.div<{ image: string }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(${props => props.image});
  background-size: cover;
  background-position: center;
`;

const ModalDetails = styled.div`
  flex: 2;
  padding: 2rem;
`;

const ModalName = styled.h3`
  font-size: 1.75rem;
  margin-bottom: 0.5rem;
  color: ${theme.colors.terminalGreen};
`;

const ModalTitle = styled.h4`
  font-size: 1.1rem;
  opacity: 0.8;
  margin-bottom: 1rem;
  font-weight: normal;
`;

const ModalSocial = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const ModalDivider = styled.div`
  height: 1px;
  width: 100%;
  background: linear-gradient(
    to right,
    rgba(0, 255, 65, 0.1) 0%,
    rgba(0, 255, 65, 0.5) 50%,
    rgba(0, 255, 65, 0.1) 100%
  );
  margin: 1.5rem 0;
`;

const BioSection = styled.div`
  margin-bottom: 1.5rem;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const BioSectionTitle = styled.h5`
  font-size: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
  
  svg {
    color: ${theme.colors.terminalGreen};
  }
`;

const BioText = styled.p`
  margin-bottom: 1rem;
  line-height: 1.6;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const Achievement = styled.div`
  margin-bottom: 0.75rem;
  padding-left: 1.5rem;
  position: relative;
  
  &::before {
    content: '›';
    position: absolute;
    left: 0;
    color: ${theme.colors.terminalGreen};
  }
`;

// Team members data
const teamMembers = [
  {
    id: 1,
    name: "Alex Chen",
    title: "Founder & CEO",
    role: "Leadership",
    image: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1050&q=80",
    social: {
      twitter: "https://twitter.com/",
      linkedin: "https://linkedin.com/",
      github: "https://github.com/"
    },
    bio: "Alex is a serial entrepreneur with over 15 years of experience in fintech and blockchain technology. Before founding HYPER TOKEN, he led product development at several successful startups.",
    achievements: [
      "Former CTO at BlockFin Technologies",
      "Early contributor to multiple Layer 1 blockchains",
      "Speaker at Consensus, Devcon, and other major blockchain conferences",
      "Computer Science degree from MIT"
    ],
    vision: "Alex believes that blockchain technology will fundamentally reshape financial systems worldwide, creating more equitable access to services regardless of geographical or socioeconomic status."
  },
  {
    id: 2,
    name: "Sarah Johnson",
    title: "Chief Technology Officer",
    role: "Development",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1050&q=80",
    social: {
      twitter: "https://twitter.com/",
      linkedin: "https://linkedin.com/",
      github: "https://github.com/"
    },
    bio: "Sarah is a blockchain architect with expertise in cryptography and distributed systems. She previously worked at Solana Labs, where she contributed to core protocol development.",
    achievements: [
      "Lead developer on Solana's validator optimization team",
      "Created open-source libraries used by multiple Solana projects",
      "Published research on zero-knowledge proof implementation",
      "Ph.D. in Computer Science from Stanford University"
    ],
    vision: "Sarah is passionate about creating scalable blockchain solutions that maintain security without compromising on decentralization."
  },
  {
    id: 3,
    name: "Marcus Wong",
    title: "Chief Security Officer",
    role: "Development",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1050&q=80",
    social: {
      twitter: "https://twitter.com/",
      linkedin: "https://linkedin.com/",
      github: "https://github.com/"
    },
    bio: "Marcus specializes in blockchain security and smart contract auditing. He has identified and helped fix critical vulnerabilities in multiple high-profile DeFi protocols.",
    achievements: [
      "Security consultant for major DeFi projects",
      "Discovered vulnerabilities that prevented potential losses of over $50M",
      "Created automated security analysis tools for Solana smart contracts",
      "Regular contributor to blockchain security communities"
    ],
    vision: "Marcus believes that security should be the foundation of any blockchain project, and is dedicated to making HYPER TOKEN the most secure token on Solana."
  },
  {
    id: 4,
    name: "Elena Rodriguez",
    title: "Chief Marketing Officer",
    role: "Marketing",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1050&q=80",
    social: {
      twitter: "https://twitter.com/",
      linkedin: "https://linkedin.com/",
      website: "https://example.com/"
    },
    bio: "Elena brings extensive experience in crypto marketing and community building. Her strategic campaigns have helped multiple token projects achieve massive adoption.",
    achievements: [
      "Led growth strategy for a top 50 cryptocurrency by market cap",
      "Built communities of over 500,000 members across various platforms",
      "Developed innovative token incentive programs for user acquisition",
      "MBA from London Business School with focus on digital marketing"
    ],
    vision: "Elena is focused on creating genuine community engagement rather than short-term hype, believing that strong communities are what ensure a project's long-term success."
  },
  {
    id: 5,
    name: "David Park",
    title: "Head of Business Development",
    role: "Business",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1050&q=80",
    social: {
      twitter: "https://twitter.com/",
      linkedin: "https://linkedin.com/"
    },
    bio: "David has a strong background in traditional finance and was one of the early movers to bridge TradFi with DeFi. He specializes in strategic partnerships and institutional adoption.",
    achievements: [
      "Formed partnerships with major financial institutions for blockchain integration",
      "Raised over $30M for various blockchain ventures",
      "Former investment banker at Goldman Sachs",
      "Named in Forbes 30 Under 30 in Finance"
    ],
    vision: "David sees HYPER TOKEN as a bridge between traditional financial systems and the emerging decentralized ecosystem, aiming to bring institutional adoption to the project."
  },
  {
    id: 6,
    name: "Olivia Chen",
    title: "Lead Blockchain Developer",
    role: "Development",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1050&q=80",
    social: {
      github: "https://github.com/",
      linkedin: "https://linkedin.com/"
    },
    bio: "Olivia is a Rust specialist with deep expertise in Solana program development. She previously contributed to multiple SPL token implementations and DeFi protocols.",
    achievements: [
      "Core developer for a major Solana DEX",
      "Created several widely-used Solana developer tools",
      "Regular speaker at Solana Breakpoint conferences",
      "Master's degree in Distributed Systems"
    ],
    vision: "Olivia is committed to pushing the boundaries of what's possible on Solana, focusing on optimizations that make HYPER TOKEN faster and more efficient than competitors."
  }
];

const categories = [
  { id: "all", label: "All Team" },
  { id: "Leadership", label: "Leadership" },
  { id: "Development", label: "Development" },
  { id: "Marketing", label: "Marketing" },
  { id: "Business", label: "Business" }
];

const Team: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedMember, setSelectedMember] = useState<typeof teamMembers[0] | null>(null);
  
  const filteredMembers = teamMembers.filter(member => 
    activeCategory === "all" || member.role === activeCategory
  );
  
  return (
    <TeamSection id="team">
      <Container fluid>
        <TerminalText 
          text="OUR TEAM" 
          as={SectionHeading}
          typingSpeed={30}
          highlight
          prefix="$ "
        />
        
        <SubHeading>
          Meet the visionaries and tech experts behind HYPER TOKEN&apos;s groundbreaking development
        </SubHeading>
        
        <TeamCategories>
          {categories.map(category => (
            <CategoryButton 
              key={category.id}
              active={activeCategory === category.id}
              onClick={() => setActiveCategory(category.id)}
            >
              {category.label}
            </CategoryButton>
          ))}
        </TeamCategories>
        
        <TeamGrid>
          {filteredMembers.map(member => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true, margin: "0px 0px -100px 0px" }}
            >
              <MemberCard 
                variant="terminal"
                onClick={() => setSelectedMember(member)}
              >
                <MemberImageContainer>
                  <MemberImage image={member.image} />
                  <MemberRole>{member.role}</MemberRole>
                </MemberImageContainer>
                <MemberInfo>
                  <MemberName>{member.name}</MemberName>
                  <MemberTitle>{member.title}</MemberTitle>
                  <MemberSocial>
                    {member.social.twitter && (
                      <SocialLink href={member.social.twitter} target="_blank" rel="noopener noreferrer">
                        <TwitterLogo size={20} weight="fill" />
                      </SocialLink>
                    )}
                    {member.social.linkedin && (
                      <SocialLink href={member.social.linkedin} target="_blank" rel="noopener noreferrer">
                        <LinkedinLogo size={20} weight="fill" />
                      </SocialLink>
                    )}
                    {member.social.github && (
                      <SocialLink href={member.social.github} target="_blank" rel="noopener noreferrer">
                        <GithubLogo size={20} weight="fill" />
                      </SocialLink>
                    )}
                    {member.social.website && (
                      <SocialLink href={member.social.website} target="_blank" rel="noopener noreferrer">
                        <Globe size={20} weight="fill" />
                      </SocialLink>
                    )}
                  </MemberSocial>
                </MemberInfo>
              </MemberCard>
            </motion.div>
          ))}
        </TeamGrid>
      </Container>
      
      <AnimatePresence>
        {selectedMember && (
          <ModalOverlay
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedMember(null)}
          >
            <ModalContent
              variant="terminal"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
              onClick={(e) => e.stopPropagation()}
            >
              <ModalCloseButton onClick={() => setSelectedMember(null)}>
                <X size={18} weight="bold" />
              </ModalCloseButton>
              
              <ModalImageContainer>
                <ModalImage image={selectedMember.image} />
              </ModalImageContainer>
              
              <ModalDetails>
                <ModalName>{selectedMember.name}</ModalName>
                <ModalTitle>{selectedMember.title}</ModalTitle>
                
                <ModalSocial>
                  {selectedMember.social.twitter && (
                    <SocialLink href={selectedMember.social.twitter} target="_blank" rel="noopener noreferrer">
                      <TwitterLogo size={24} weight="fill" />
                    </SocialLink>
                  )}
                  {selectedMember.social.linkedin && (
                    <SocialLink href={selectedMember.social.linkedin} target="_blank" rel="noopener noreferrer">
                      <LinkedinLogo size={24} weight="fill" />
                    </SocialLink>
                  )}
                  {selectedMember.social.github && (
                    <SocialLink href={selectedMember.social.github} target="_blank" rel="noopener noreferrer">
                      <GithubLogo size={24} weight="fill" />
                    </SocialLink>
                  )}
                  {selectedMember.social.website && (
                    <SocialLink href={selectedMember.social.website} target="_blank" rel="noopener noreferrer">
                      <Globe size={24} weight="fill" />
                    </SocialLink>
                  )}
                </ModalSocial>
                
                <BioSection>
                  <BioSectionTitle>
                    <User size={18} weight="fill" />
                    Biography
                  </BioSectionTitle>
                  <BioText>{selectedMember.bio}</BioText>
                </BioSection>
                
                <ModalDivider />
                
                <BioSection>
                  <BioSectionTitle>
                    <Briefcase size={18} weight="fill" />
                    Achievements
                  </BioSectionTitle>
                  {selectedMember.achievements.map((achievement, index) => (
                    <Achievement key={index}>{achievement}</Achievement>
                  ))}
                </BioSection>
                
                <ModalDivider />
                
                <BioSection>
                  <BioSectionTitle>
                    <Star size={18} weight="fill" />
                    Vision
                  </BioSectionTitle>
                  <BioText>{selectedMember.vision}</BioText>
                </BioSection>
              </ModalDetails>
            </ModalContent>
          </ModalOverlay>
        )}
      </AnimatePresence>
      
      {/* Background matrix effect - subtle */}
      {Array.from({ length: 30 }).map((_, i) => (
        <motion.div
          key={i}
          style={{
            position: "absolute",
            color: `rgba(0, 255, 65, ${0.05 + 0.05 * Math.random()})`,
            fontSize: `${0.6 + 0.8 * Math.random()}rem`,
            fontFamily: theme.fonts.primary,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            zIndex: -1,
          }}
          animate={{
            opacity: [0.1, 0.2, 0.1],
            transition: {
              duration: 2 + Math.random() * 4,
              repeat: Infinity
            }
          }}
        >
          {Math.random() > 0.5 ? "0" : "1"}
        </motion.div>
      ))}
    </TeamSection>
  );
};

export default Team; 