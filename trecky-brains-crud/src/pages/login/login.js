import { useState, useEffect } from 'react';
import { Container, Box, Typography, TextField, Button } from '@mui/material';
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from '../../context/authContext';
import './style.css'

const Login = () => {

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const { login, resetPassword } = useAuth();

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    console.log(user);
    try {
      await login(user.email, user.password);
      navigate("/Usuarios");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Container component='div' maxWidth='false'>
      <div className='box-login-container'>
        <Typography component="h1" variant="h1" className='plain-text'>
          Bienvenid@ a Tecky Brains !
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} className='box-login'>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Correo Electronico"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Contraseña"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />
          <Typography component="div" variant="body2" sx={{mt: 1, color: 'red'}}>
            (*) Los campos con este simbolo son obligatorios !!!
          </Typography>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2}}
            className='button-iniciar-sesion'
          >
            Ingresar :)
          </Button>
          <div style={{textAlign: 'center'}}>O</div>
          <Button
            fullWidth
            variant="contained"
            color='secondary'
            sx={{ mt: 2, mb: 1}}
            className='button-crear-cuenta'
          >
            Crear Cuenta :o
          </Button>
        </Box>
      </div>
    </Container>
  );
};

export default Login;