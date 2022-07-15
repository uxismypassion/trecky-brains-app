import React, { useState, useEffect } from 'react';
import { Container, Box, Typography, TextField, Button } from '@mui/material';
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from '../../context/authContext';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import './style.css';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Login = () => {

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const { login, resetPassword } = useAuth();

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (user.email === "") {
      setMessage("Debes ingresar tu correo !");
      setOpen(true);
    } else if (user.password === "") {
      setMessage("Debes ingresar tu contraseña !");
      setOpen(true);
    } else {
      try {
        await login(user.email, user.password);
        navigate("/Usuarios");
      } catch (error) {
        setError(error.message);
        setMessage("Los datos que ingresaste no son correctos :(");
      }
    }
    //console.log(user);
  };

  const handleRegister = () => {
    navigate("/Registrarse");
  }

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
            id="password"
            autoComplete="current-password"
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />
          <Typography component="div" variant="body2" sx={{mt: 1, color: 'red'}}>
            (*) Los campos con este simbolo son obligatorios
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
            onClick={handleRegister}
          >
            Crear Cuenta :o
          </Button>
        </Box>
      </div>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} sx={{mb: 1}}>
        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Login;