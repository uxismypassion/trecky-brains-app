import { useState, useEffect } from "react";
import { Container, Box, Typography, TextField, Button } from '@mui/material';
import { collection, getDocs } from "firebase/firestore";
import db from "../../firebaseConfig";
import { useAuth } from "../../context/authContext";

const Usuarios = () => {

  const { user } = useAuth();

  const getUsuarios = async () => {
    const usuarios = await getDocs(collection(db, 'usuarios'));
    usuarios.forEach((doc) => {
      console.log(doc.data());
    });
  };

  console.log(user);

  useEffect(() => {
    getUsuarios();
  }, []);

  return (
    <Container>

    </Container>
  );

};

export default Usuarios;