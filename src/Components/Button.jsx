import styled from 'styled-components';

export const Button = styled.button`
  padding: 0;
  background-color: var(--colors-bg);
  box-shadox: var(--shadow);
  line-height: 2.5;
  border-radius: var(--radii);

  border: none;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: var(--color-text);
  cursor: pointer;
`;
