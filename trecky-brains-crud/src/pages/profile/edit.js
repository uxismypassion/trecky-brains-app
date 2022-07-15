import React, { useState, useEffect } from 'react';
import { collection, getDocs, query, where, doc, setDoc } from "firebase/firestore";
import { Container, Box, Snackbar, TextField, Button, Grid } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useAuth } from "../../context/authContext";
import db from "../../firebaseConfig";
import { useNavigate } from 'react-router-dom';
import Navbar from '../navbar';
import './style.css';

const Editar = () => {

  const { user } = useAuth();
  const [ me, setMe] = useState();
  const [ loading, setLoading ] = useState(true);
  const [ id, setId] = useState();

  const [open, setOpen] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const [usuario, setUsuario] = useState({
    name: "",
    apodo: "",
    edad: 0,
    about: ""
  });

  const getMe = async () => {
    const q = query(collection(db, "usuarios"), where("correo", "==", user.email));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      setId(doc.id);
      //console.log(doc.data());
      setMe(doc.data());
    });
  }

  useEffect(() => {
    //console.log(user);
    getMe();
  }, []);

  useEffect(() => {
    if (me !== undefined) {
      setUsuario({
        name: me.nombre,
        apodo: me.apodo,
        edad: me.edad,
        about: me.descripcion
      })
      setLoading(false);
    }   
    //console.log(me);
  }, [me]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    //console.log(usuario);
    try {
      await setDoc(doc(db, 'usuarios', id), {
        correo: user.email,
        nombre: usuario.name,
        apodo: usuario.apodo,
        edad: usuario.edad,
        descripcion: usuario.about
      });
      setOpen(true);
    } catch (error) {
      console.log(error.message);
    }
  };

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <>
      <Navbar/>
      <Container component="main" maxWidth="md">
        <Box
          sx={{
            marginTop: 5,
            marginBottom: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center', 
          }}
        >
          {loading === false && 
            <Box component="form" onSubmit={handleSubmit} className='box-profile'>
              <Box sx={{display: 'flex', justifyContent: 'center'}}>
                <img src="../../avatar.jpg" alt="Avatar" className="avatar-kid"/>
              </Box>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    margin="normal"
                    fullWidth
                    id="name"
                    label="Nombre Completo"
                    name="name"
                    defaultValue={me.nombre}
                    onChange={(e) => setUsuario({ ...usuario, name: e.target.value })}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    margin="normal"
                    fullWidth
                    id="apodo"
                    label="Nombre Preferido"
                    name="apodo"
                    defaultValue={me.apodo}
                    onChange={(e) => setUsuario({ ...usuario, apodo: e.target.value })}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    margin="normal"
                    fullWidth
                    id="edad"
                    label="Edad"
                    name="edad"
                    defaultValue={me.edad}
                    onChange={(e) => setUsuario({ ...usuario, edad: parseInt(e.target.value) })}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="standard-multiline-flexible"
                    label="Sobre mi"
                    multiline
                    fullWidth
                    maxRows={8}
                    defaultValue={me.descripcion}
                    onChange={(e) => setUsuario({ ...usuario, about: e.target.value })}
                  />
                </Grid>               
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2}}
                className='button-edit'
              >
                Guardar cambios 
              </Button>           
            </Box>
          }
          <Snackbar
            open={open}
            autoHideDuration={6000}
            onClose={handleClose}
            message="Se han guardado los cambios :D"
            action={action}
            sx={{mb: 1}}
          />
        </Box>
      </Container>
    </>
  );
};

export default Editar;