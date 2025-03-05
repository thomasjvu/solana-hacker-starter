import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { theme } from '../../theme';
import Container from '../ui/Container';
import { Card, CardBody } from '../ui/Card';
import TerminalText from '../ui/TerminalText';
import { Check, Clock, CalendarBlank, Rocket } from '@phosphor-icons/react';

const RoadmapSection = styled.section`
  position: relative;
  padding: 120px 0;
  background-color: ${theme.colors.background};
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

const TimelineContainer = styled.div`
  position: relative;
  max-width: 1000px;
  margin: 0 auto;
  padding: 2rem 0;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 50%;
    width: 4px;
    background: linear-gradient(to bottom, 
      ${theme.colors.terminalGreenDark} 0%, 
      ${theme.colors.terminalGreen} 50%, 
      ${theme.colors.terminalGreenDark} 100%);
    transform: translateX(-50%);
    
    @media (max-width: ${theme.breakpoints.md}) {
      left: 30px;
    }
  }
`;

const PhaseWrapper = styled(motion.div)<{ isEven: boolean }>`
  display: flex;
  justify-content: ${props => props.isEven ? 'flex-start' : 'flex-end'};
  padding: 1.5rem 0;
  position: relative;
  width: 100%;
  
  @media (max-width: ${theme.breakpoints.md}) {
    justify-content: flex-start;
    padding-left: 80px;
  }
`;

const PhaseCard = styled(Card)`
  width: 45%;
  cursor: pointer;
  position: relative;
  
  @media (max-width: ${theme.breakpoints.md}) {
    width: 100%;
  }
`;

const PhaseMarker = styled.div<{ status: 'completed' | 'active' | 'upcoming' }>`
  position: absolute;
  width: 30px;
  height: 30px;
  background-color: ${props => {
    switch(props.status) {
      case 'completed': return theme.colors.terminalGreen;
      case 'active': return theme.colors.terminalYellow;
      case 'upcoming': return theme.colors.terminalRedDark;
      default: return theme.colors.terminalGreen;
    }
  }};
  border-radius: 50%;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${theme.colors.background};
  z-index: 2;
  box-shadow: 0 0 15px ${props => {
    switch(props.status) {
      case 'completed': return 'rgba(0, 255, 65, 0.6)';
      case 'active': return 'rgba(244, 208, 63, 0.6)';
      case 'upcoming': return 'rgba(204, 0, 0, 0.3)';
      default: return 'rgba(0, 255, 65, 0.6)';
    }
  }};
  
  @media (max-width: ${theme.breakpoints.md}) {
    left: 30px;
  }
`;

const PhaseDateLabel = styled.div<{ isEven: boolean }>`
  position: absolute;
  ${props => props.isEven ? 'right: 55%;' : 'left: 55%;'}
  top: 50%;
  transform: translateY(-50%);
  background-color: ${theme.colors.backgroundSecondary};
  border: 1px solid ${theme.colors.terminalGreen};
  padding: 0.5rem 1rem;
  border-radius: ${theme.sizes.borderRadius};
  font-size: 0.9rem;
  color: ${theme.colors.terminalGreen};
  white-space: nowrap;
  
  @media (max-width: ${theme.breakpoints.md}) {
    display: none;
  }
`;

const PhaseHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const PhaseTitle = styled.h3`
  font-size: 1.3rem;
  margin: 0;
`;

const PhaseStatus = styled.div<{ status: 'completed' | 'active' | 'upcoming' }>`
  font-size: 0.8rem;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: ${props => {
    switch(props.status) {
      case 'completed': return 'rgba(0, 255, 65, 0.1)';
      case 'active': return 'rgba(244, 208, 63, 0.1)';
      case 'upcoming': return 'rgba(204, 0, 0, 0.1)';
      default: return 'rgba(0, 255, 65, 0.1)';
    }
  }};
  color: ${props => {
    switch(props.status) {
      case 'completed': return theme.colors.terminalGreen;
      case 'active': return theme.colors.terminalYellow;
      case 'upcoming': return theme.colors.terminalRed;
      default: return theme.colors.terminalGreen;
    }
  }};
`;

const PhaseDate = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 1rem;
  font-size: 0.9rem;
  color: ${theme.colors.foreground};
  opacity: 0.7;
  
  @media (min-width: ${theme.breakpoints.md}) {
    display: none;
  }
`;

const TaskList = styled.ul`
  padding-left: 1.5rem;
  margin: 1rem 0;
`;

const TaskItem = styled.li<{ completed?: boolean }>`
  margin-bottom: 0.5rem;
  color: ${props => props.completed ? theme.colors.terminalGreen : theme.colors.foreground};
  opacity: ${props => props.completed ? 1 : 0.7};
  position: relative;
  
  &::before {
    content: '${props => props.completed ? '✓' : '›'}';
    position: absolute;
    left: -1.5rem;
    color: ${props => props.completed ? theme.colors.terminalGreen : theme.colors.foreground};
  }
`;

const Legend = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
`;

const LegendItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
`;

const LegendMarker = styled.div<{ status: 'completed' | 'active' | 'upcoming' }>`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: ${props => {
    switch(props.status) {
      case 'completed': return theme.colors.terminalGreen;
      case 'active': return theme.colors.terminalYellow;
      case 'upcoming': return theme.colors.terminalRedDark;
      default: return theme.colors.terminalGreen;
    }
  }};
`;

const phasesData = [
  {
    id: 1,
    title: 'Phase 1: Foundation',
    date: 'Q1 2024',
    status: 'completed' as const,
    tasks: [
      { text: 'Project conceptualization and whitepaper', completed: true },
      { text: 'Team formation', completed: true },
      { text: 'Smart contract development', completed: true },
      { text: 'Initial website launch', completed: true },
      { text: 'Community building begins', completed: true }
    ]
  },
  {
    id: 2,
    title: 'Phase 2: Growth',
    date: 'Q2 2024',
    status: 'active' as const,
    tasks: [
      { text: 'Token presale', completed: true },
      { text: 'Security audit completion', completed: true },
      { text: 'DEX listing', completed: false },
      { text: 'Marketing campaign launch', completed: false },
      { text: 'First partnership announcements', completed: false }
    ]
  },
  {
    id: 3,
    title: 'Phase 3: Expansion',
    date: 'Q3 2024',
    status: 'upcoming' as const,
    tasks: [
      { text: 'Major CEX listings', completed: false },
      { text: 'DApp development', completed: false },
      { text: 'Staking program launch', completed: false },
      { text: 'Cross-chain integration', completed: false },
      { text: 'Governance implementation', completed: false }
    ]
  },
  {
    id: 4,
    title: 'Phase 4: Ecosystem',
    date: 'Q4 2024',
    status: 'upcoming' as const,
    tasks: [
      { text: 'Decentralized exchange launch', completed: false },
      { text: 'NFT marketplace integration', completed: false },
      { text: 'Strategic acquisitions', completed: false },
      { text: 'Mobile app release', completed: false },
      { text: 'Enterprise partnerships', completed: false }
    ]
  },
  {
    id: 5,
    title: 'Phase 5: Global Adoption',
    date: 'Q1 2025',
    status: 'upcoming' as const,
    tasks: [
      { text: 'Institutional onboarding', completed: false },
      { text: 'Layer 2 scaling solution', completed: false },
      { text: 'Native blockchain development', completed: false },
      { text: 'DAO voting mechanism', completed: false },
      { text: 'Global marketing expansion', completed: false }
    ]
  }
];

const phaseVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5 }
  }
};

const getStatusIcon = (status: 'completed' | 'active' | 'upcoming') => {
  switch(status) {
    case 'completed': return <Check size={16} weight="bold" />;
    case 'active': return <Clock size={16} weight="bold" />;
    case 'upcoming': return <Rocket size={16} weight="bold" />;
    default: return <Check size={16} weight="bold" />;
  }
};

const Roadmap: React.FC = () => {
  const [expandedPhase, setExpandedPhase] = useState<number | null>(null);

  const togglePhase = (id: number) => {
    if (expandedPhase === id) {
      setExpandedPhase(null);
    } else {
      setExpandedPhase(id);
    }
  };

  return (
    <RoadmapSection id="roadmap">
      <Container fluid>
        <TerminalText 
          text="PROJECT ROADMAP" 
          as={SectionHeading}
          typingSpeed={30}
          highlight
          prefix="$ "
        />
        
        <Legend>
          <LegendItem>
            <LegendMarker status="completed" />
            <span>Completed</span>
          </LegendItem>
          <LegendItem>
            <LegendMarker status="active" />
            <span>In Progress</span>
          </LegendItem>
          <LegendItem>
            <LegendMarker status="upcoming" />
            <span>Upcoming</span>
          </LegendItem>
        </Legend>
        
        <TimelineContainer>
          {phasesData.map((phase, index) => {
            const isEven = index % 2 === 0;
            const isExpanded = expandedPhase === phase.id;
            
            return (
              <PhaseWrapper 
                key={phase.id}
                isEven={isEven}
                variants={phaseVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
              >
                <PhaseMarker status={phase.status}>
                  {getStatusIcon(phase.status)}
                </PhaseMarker>
                
                <PhaseDateLabel isEven={isEven}>
                  {phase.date}
                </PhaseDateLabel>
                
                <PhaseCard 
                  variant="terminal"
                  onClick={() => togglePhase(phase.id)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <CardBody>
                    <PhaseHeader>
                      <PhaseTitle>{phase.title}</PhaseTitle>
                      <PhaseStatus status={phase.status}>
                        {getStatusIcon(phase.status)}
                        {phase.status === 'completed' ? 'Completed' : 
                          phase.status === 'active' ? 'In Progress' : 'Upcoming'}
                      </PhaseStatus>
                    </PhaseHeader>
                    
                    {(isExpanded || phase.status === 'active') && (
                      <TaskList>
                        {phase.tasks.map((task, taskIndex) => (
                          <TaskItem 
                            key={taskIndex} 
                            completed={task.completed}
                          >
                            {task.text}
                          </TaskItem>
                        ))}
                      </TaskList>
                    )}
                    
                    <PhaseDate>
                      <CalendarBlank size={16} />
                      {phase.date}
                    </PhaseDate>
                  </CardBody>
                </PhaseCard>
              </PhaseWrapper>
            );
          })}
        </TimelineContainer>
      </Container>
      
      {/* Matrix code background effect - subtle */}
      {Array.from({ length: 30 }).map((_, i) => (
        <motion.div
          key={i}
          style={{
            position: 'absolute',
            color: `rgba(0, 255, 65, ${Math.random() * 0.15 + 0.05})`,
            fontSize: `${Math.random() * 0.8 + 0.7}rem`,
            fontFamily: theme.fonts.primary,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            zIndex: -1,
            opacity: 0.3,
          }}
          animate={{ 
            opacity: [0.1, 0.3, 0.1],
            transition: {
              duration: Math.random() * 5 + 3,
              repeat: Infinity,
              repeatType: 'mirror'
            }
          }}
        >
          {String.fromCharCode(Math.floor(Math.random() * 94) + 33)}
        </motion.div>
      ))}
    </RoadmapSection>
  );
};

export default Roadmap; 