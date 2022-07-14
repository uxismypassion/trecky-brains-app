import { useState, useEffect } from 'react';
import { Container, Box, Typography, TextField, Button } from '@mui/material';
import './style.css'

const Login = () => {
  return (
    <Container component='div' maxWidth='false'>
      <div className='box-login-container'>
        <Typography component="h1" variant="h1" className='plain-text'>
          Bienvenid@ a Tecky Brains !
        </Typography>
        <div className='box-login'>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Correo Electronico"
            name="email"
            autoComplete="email"
            autoFocus
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
            type="submit"
            fullWidth
            variant="contained"
            color='secondary'
            sx={{ mt: 2, mb: 1}}
            className='button-crear-cuenta'
          >
            Crear Cuenta :o
          </Button>
        </div>
      </div>
    </Container>
  );
};

export default Login;