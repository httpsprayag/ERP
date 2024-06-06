import { ThemeProvider } from '@mui/material';
import { useRoutes } from 'react-router-dom';
import { Routes } from './routes/routes';
import customTheme from './utils/theme';
import './index.css';

const App = () => <ThemeProvider theme={customTheme}>{useRoutes(Routes())}</ThemeProvider>;

export default App;
