import { useState, useEffect } from "react";
import { Container, Box, Typography, TextField, Button, Grid } from '@mui/material';
import { collection, getDocs, query, where } from "firebase/firestore";
import db from "../../firebaseConfig";
import { useAuth } from "../../context/authContext";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import Navbar from "../navbar";
import './style.css'

const Usuarios = () => {

  const { user } = useAuth();
  const [ users, setUsers] = useState([]);
  const [ me, setMe] = useState({});

  const getUsuarios = async () => {
    const usuarios = await getDocs(collection(db, 'usuarios'));
    let usersTemp = [];
    usuarios.forEach((doc) => {
      usersTemp.push(doc.data())
    });
    //console.log(usersTemp);
    setUsers(usersTemp);
  };

  const getMe = async () => {
    const q = query(collection(db, "usuarios"), where("correo", "==", user.email));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      //console.log(doc.data());
      setMe(doc.data());
    });
  }

  useEffect(() => {
    getUsuarios();
    getMe();
  }, []);

  // useEffect(() => {
  //   console.log(me);
  // }, [me])

  return (
    <>
      <Navbar/> 
      <Container maxWidth='xlg'>
        <Typography component="h1" variant="h2" sx={{mt: 10, mb: 2}}>
          Bienvenido {me.nombre} !
        </Typography>
        <Typography component="h1" variant="h3" color='secondary' sx={{mt: 2, mb: 2}}>
          Estos son tus compañeros :
        </Typography>
        <Grid container spacing={{ xs: 2, md: 3 }} sx={{mb: 2}}> 
          {
            users.map((usuario) => 
            {
              if (usuario.correo !== me.correo) {
                return (
                <Grid item xs={12} sm={6} md={4} key={usuario.correo}>
                  <div className="box-card">
                    <Typography component="p">Hola, me llamo <b>{usuario.nombre}</b></Typography>
                    <Typography component="p">Me dicen <b>{usuario.apodo}</b></Typography>
                    <Typography component="p">Tengo <b>{usuario.edad} años</b></Typography>
                    <Typography component="p">Si quieres escribirme, mi correo es <b>{usuario.correo}</b></Typography>
                  </div>
                </Grid>
                );
              }
            }
            )
          }
        </Grid>
      </Container>
    </>
  );

};

export default Usuarios;