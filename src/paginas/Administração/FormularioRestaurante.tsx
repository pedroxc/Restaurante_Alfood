import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import IRestaurante from "../../interfaces/IRestaurante";
import api from "../../services";
import { TextField, Button, Typography, Box } from "@mui/material";

export default function FormularioRestaurante() {
  const [nomeRestaurante, setNomeRestaurante] = useState("");
  const params = useParams();

  useEffect(() => {
    if (params.id) {
      api
        .get<IRestaurante>(`restaurantes/${params.id}/`)
        .then((res) => setNomeRestaurante(res.data.nome))
        .catch((e) => console.log(e));
    }
  }, [params]);

  const handleSubmmitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (params.id) {
      api
        .put(`restaurantes/${params.id}/`, {
          nome: nomeRestaurante,
        })
        .then(() => {
          alert("Restaurante atualizado com sucesso!");
        });
    } else {
      api
        .post("restaurantes/", {
          nome: nomeRestaurante,
        })
        .then(() => {
          alert("Restaurante cadastrado com sucesso!");
        });
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        flexGrow: 1,
      }}
    >
      <Typography component="h1" variant="h6">
        Formulário de Restaurantes
      </Typography>
      <Box component="form" sx={{ width: "100%" }} onSubmit={handleSubmmitForm}>
        <TextField
          id="standard-basic"
          label="Nome do Restaurante"
          variant="standard"
          value={nomeRestaurante}
          fullWidth
          onChange={(e) => setNomeRestaurante(e.target.value)}
          required
        />
        <Button
          type="submit"
          variant="outlined"
          fullWidth
          sx={{ marginTop: 1 }}
        >
          Enviar
        </Button>
      </Box>
    </Box>
  );
}
