import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import './App.css';
import Login from './pages/login/login';
import Usuarios from './pages/users/users';
import { AuthProvider } from './context/authContext';
import Register from './pages/register/register';

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
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={ <Login /> }></Route>
            <Route path="/Usuarios" element={ <Usuarios /> }></Route>
            <Route path="/Registrarse" element={ <Register /> }></Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
