import { useState, useEffect } from 'react';
import { Container, Box, Typography, TextField, Button, Grid } from '@mui/material';
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from '../../context/authContext';
import { collection, setDoc, doc } from "firebase/firestore";
import db from "../../firebaseConfig";
import './style.css';

const Register = () => {

  const { signup } = useAuth();

  const [user, setUser] = useState({
    email: "",
    password: "",
    name: "",
    apodo: "",
    edad: 0,
    about: ""
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    console.log(user);
    try {
      await signup(user.email, user.password);
      console.log("Registrado con exito");
      const citiesRef = collection(db, "usuarios");
      await setDoc(doc(citiesRef), {
        correo: user.email,
        nombre: user.name,
        apodo: user.apodo,
        edad: user.edad,
        descripcion: user.about
      });
      navigate("/Usuarios");
    } catch (error) {
      console.log(error.message)
      setError(error.message);
    }
  };

  return (
    <Container component="main" maxWidth="sm">
      <Box
        sx={{
          marginTop: 4,
          marginBottom: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center', 
        }}
        >
        <Typography component="h1" variant="h1" className='plain-text'>
          Se parte de la familia de Tecky Brains !
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} className='box-register'>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography component="h1" variant="h2" color='primary'>
                Datos principales de tu cuenta
              </Typography>
            </Grid>
            <Grid item xs={12}>
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
            </Grid>
            <Grid item xs={12}>
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
            </Grid>
            <Grid item xs={12}>
              <hr className='horizontal-strong-line'/>
            </Grid>
            <Grid item xs={12}>
              <Typography component="h1" variant="h2" color='secondary'>
                Datos personales
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="name"
                label="Nombre Completo"
                name="name"
                onChange={(e) => setUser({ ...user, name: e.target.value })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                margin="normal"
                fullWidth
                id="name-pref"
                label="Nombre preferido (Opcional)"
                name="name"
                onChange={(e) => setUser({ ...user, apodo: e.target.value })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                margin="normal"
                fullWidth
                id="edad"
                label="Edad (Opcional)"
                name="edad"
                onChange={(e) => setUser({ ...user, edad: parseInt(e.target.value) })}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2}}
            className='button-register'
          >
            Registrarme :)
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Register;