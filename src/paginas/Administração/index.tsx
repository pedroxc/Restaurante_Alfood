import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import IRestaurante from "../../interfaces/IRestaurante";
import api from "../../services";

import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

export default function Admin() {
  const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([]);
  const deleteRestaurante = async (deletedRestaurante: IRestaurante) => {
    await api.delete(`restaurantes/${deletedRestaurante.id}/`).then(() => {
      const listaRestaurante = restaurantes.filter(
        (restaurante) => restaurante.id !== deletedRestaurante.id
      );
      setRestaurantes([...listaRestaurante]);
    });
  };
  useEffect(() => {
    api.get("restaurantes/").then((resposta) => {
      setRestaurantes(resposta.data);
      console.log(resposta.data);
    });
  }, []);
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Nome</TableCell>
            <TableCell>Editar</TableCell>
            <TableCell>Excluir</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {restaurantes.map((e) => {
            return (
              <TableRow key={e.id}>
                <TableCell>{e.nome}</TableCell>
                <TableCell>
                  [<Link to={`/admin/${e.id}`}> Editar </Link>]
                </TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => deleteRestaurante(e)}
                  >
                    Excluir
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
