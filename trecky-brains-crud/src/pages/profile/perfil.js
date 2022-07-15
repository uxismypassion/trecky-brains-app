import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { Container, Box, Typography, TextField, Button, Grid } from '@mui/material';
import { useAuth } from "../../context/authContext";
import db from "../../firebaseConfig";
import { useNavigate } from 'react-router-dom';
import Navbar from "../navbar";
import './style.css'

const Perfil = () => {

  const { user } = useAuth();
  const [ me, setMe] = useState({});
  const navigate = useNavigate();

  const getMe = async () => {
    const q = query(collection(db, "usuarios"), where("correo", "==", user.email));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      //console.log(doc.data());
      setMe(doc.data());
    });
  }

  useEffect(() => {
    //console.log(user);
    getMe();
  }, []);

  const handleClick = () => {
    navigate("/Editar");
  }

  return (
    <>
      <Navbar/>
      <Container component="main" maxWidth="sm">
        <Box
          sx={{
            marginTop: 5,
            marginBottom: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center', 
          }}
        >
          <Box component="div" className='box-profile'>
            <Box sx={{display: 'flex', justifyContent: 'center'}}>
              <img src="../../avatar.jpg" alt="Avatar" className="avatar-kid"/>
            </Box>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography component="p">Nombre Completo: <b>{me.nombre}</b></Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography component="p">Nombre preferido: <b>{me.apodo}</b></Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography component="p">Correo Electronico: <b>{me.correo}</b></Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography component="p">Sobre mi: <b>{me.descripcion}</b></Typography>
              </Grid>
            </Grid>
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2}}
              className='button-profile'
              onClick={handleClick}
            >
              Editar mi Perfil
          </Button>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default Perfil;