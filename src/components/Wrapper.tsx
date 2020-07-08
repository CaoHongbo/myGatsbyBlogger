import * as React from 'react';
import styled from '@emotion/styled';

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-image: url('https://i.loli.net/2020/07/07/RjS9Lpuk16Gvhqs.png')
`;

interface WrapperProps {
  className?: string;
}

const Wrapper: React.FC<WrapperProps> = ({ children, className }) => (
  <StyledWrapper className={className}>{children}</StyledWrapper>
);

export default Wrapper;
