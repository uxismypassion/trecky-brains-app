import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import './App.css';
import Login from './pages/login/login';
import Usuarios from './pages/users/users';
import { AuthProvider } from './context/authContext';
import Register from './pages/register/register';
import ProtectedRoutes from './pages/protectedRoutes';

const theme = createTheme({
  palette: {
    primary: {
      main: 'hsl(248, 100%, 60.4%)'
    },
    secondary: {
      main: 'hsla(221.21,83.19%,53.33%,90%)'
    },
  },
  typography: {
    fontFamily: [
      'Karla',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    subtitle1: {
      fontSize: 12,
    },
    body1: {
      fontSize: 14,
      fontWeight: 400,
      '@media (min-width:600px)': {
        fontSize: 16,
      },
    },
    body2: {
      fontSize: 12,
      fontWeight: 400,
      '@media (min-width:600px)': {
        fontSize: 10,
      },
    },
    h1: {
      fontWeight: 700,
      fontSize: '2.6rem',
      '@media (min-width:600px)': {
        fontSize: '3.2rem',
      },
    },
    h2: {
      fontWeight: 600,
      fontSize: '1.6rem',
      '@media (min-width:600px)': {
        fontSize: '2rem',
      },
    },
    h3: {
      fontWeight: 500,
      fontSize: '1.5rem',
      '@media (min-width:600px)': {
        fontSize: '1.8rem',
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={ <Login /> }></Route>
            <Route path="/Usuarios" element={ <ProtectedRoutes> <Usuarios /> </ProtectedRoutes>}></Route>
            <Route path="/Registrarse" element={ <Register /> }></Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
