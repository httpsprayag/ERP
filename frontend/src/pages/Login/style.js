import { styled, Box } from '@mui/material';
import { pixelToRem } from '../../utils';

export const LoginContainer = styled(Box)`
  height: 100vh;
  width: 100%;
  display: grid;
  place-items: center;
  font-family: 'Inter', sans-serif;
`;

export const Login = styled(Box)`
  background-color: #fff;
  padding: 2.5rem;
  box-shadow: 0px 4px 20px 0px #00000040;
  border-radius: 0.5rem;
  width: ${pixelToRem(350)};
  height: ${pixelToRem(411)};
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  font-family: 'Inter', sans-serif;
  @media screen and (max-width: 575px) {
    width: auto;
    height: auto;
  }
`;

export const LoginForm = styled('form')`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  font-family: 'Inter', sans-serif;
`;
