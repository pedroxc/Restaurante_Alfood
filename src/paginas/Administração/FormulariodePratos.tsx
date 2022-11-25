import React, { useEffect, useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import api from "../../services";
import ITag from "../../interfaces/ITags";
import IRestaurante from "../../interfaces/IRestaurante";
import IPrato from "../../interfaces/IPrato";
import { useParams } from "react-router-dom";

export default function FormulariodePratos() {
  const [nomePrato, setNomePrato] = useState("");
  const [descricao, setDescricao] = useState("");
  const [tag, setTag] = useState("");
  const [tags, setTags] = useState<ITag[]>([]);
  const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([]);
  const [restaurante, setRestaurante] = useState<String | Number>("");
  const [imagem, setImagem] = useState<File | null>(null);
  const params = useParams();

  const handleSubmmitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (params.id) {
      api
        .put(`pratos/${params.id}/`, {
          nome: nomePrato,
          tag,
          descricao,
          restaurante,
        })
        .then(() => {
          alert("Prato Alterado com sucesso!");
        });
    } else {
      const formData = new FormData();
      formData.append("nome", nomePrato);
      formData.append("descricao", descricao);
      formData.append("tag", tag);
      formData.append("restaurante", String(restaurante));
      if (imagem) {
        formData.append("imagem", imagem);
      }

      api
        .request({
          url: "pratos/",
          method: "POST",
          headers: {
            "Content-Type": "multipart/form-data",
          },
          data: formData,
        })
        .then(() => {
          alert("Prato cadastrado com sucesso");
          setDescricao("");
          setNomePrato("");
          setTag("");
          setImagem(null);
          setRestaurante("");
        })
        .catch((error) => console.log(error));
    }
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      setImagem(e.target.files[0]);
    } else {
      setImagem(null);
    }
  };

  useEffect(() => {
    api.get<{ tags: ITag[] }>("tags/").then((e) => setTags(e.data.tags));
    api
      .get<IRestaurante[]>("restaurantes/")
      .then((e) => setRestaurantes(e.data));
  }, []);

  useEffect(() => {
    if (params.id) {
      api
        .get<IPrato>(`pratos/${params.id}/`)
        .then((res) => {
          setDescricao(res.data.descricao);
          setNomePrato(res.data.nome);
          setTag(res.data.tag);
          setRestaurante(res.data.restaurante);
        })
        .catch((e) => console.log(e));
    }
  }, [params]);

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
        Formulário de Pratos
      </Typography>
      <Box component="form" sx={{ width: "100%" }} onSubmit={handleSubmmitForm}>
        <TextField
          id="standard-basic"
          label="Nome do Prato"
          variant="standard"
          value={nomePrato}
          fullWidth
          onChange={(e) => setNomePrato(e.target.value)}
          required
          margin="dense"
        />
        <TextField
          id="standard-basic"
          label="Descrição do Prato"
          variant="standard"
          value={descricao}
          fullWidth
          onChange={(e) => setDescricao(e.target.value)}
          required
          margin="dense"
        />
        <FormControl margin="dense" fullWidth>
          <InputLabel id="select-tag">Tag</InputLabel>
          <Select
            labelId="select-tag"
            value={tag}
            onChange={(e) => setTag(e.target.value)}
          >
            {tags.map((tag) => (
              <MenuItem key={tag.id} value={tag.value}>
                {tag.value}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl margin="dense" fullWidth>
          <InputLabel id="select-Restaurante">Restaurante</InputLabel>
          <Select
            labelId="select-Restaurante"
            value={restaurante}
            onChange={(e) => setRestaurante(e.target.value)}
          >
            {restaurantes.map((e) => (
              <MenuItem key={e.id} value={e.id}>
                {e.nome}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <input type="file" onChange={handleFile} />
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
