import styled from 'styled-components';
import { theme } from '../../theme';

type ContainerProps = {
  fluid?: boolean;
  className?: string;
};

const Container = styled.div<ContainerProps>`
  width: 100%;
  margin-right: auto;
  margin-left: auto;
  padding-right: 1rem;
  padding-left: 1rem;
  
  max-width: ${props => props.fluid ? '100%' : theme.sizes.maxWidth};
  
  @media (min-width: ${theme.breakpoints.sm}) {
    padding-right: 2rem;
    padding-left: 2rem;
  }
`;

export default Container; 