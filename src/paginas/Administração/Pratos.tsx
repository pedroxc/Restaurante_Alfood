import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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
import IPrato from "../../interfaces/IPrato";

export default function PratosAdmin() {
  const [pratos, setPratos] = useState<IPrato[]>([]);
  const deleteRestaurante = async (e: IPrato) => {
    await api.delete(`pratos/${e.id}/`).then(() => {
      const listaPratos = pratos.filter((pratos) => pratos.id !== e.id);
      setPratos([...listaPratos]);
    });
  };
  useEffect(() => {
    api.get("pratos/").then((resposta) => {
      setPratos(resposta.data);
    });
  }, []);
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Nome</TableCell>
            <TableCell>Tag</TableCell>
            <TableCell>Imagem</TableCell>
            <TableCell>Editar</TableCell>
            <TableCell>Excluir</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {pratos.map((e) => {
            return (
              <TableRow key={e.id}>
                <TableCell>{e.nome}</TableCell>
                <TableCell>{e.tag}</TableCell>
                <TableCell>
                  [
                  <a href={e.imagem} target="_blank" rel="noreferrer">
                    Ver Imamge
                  </a>
                  ]
                </TableCell>
                <TableCell>
                  [<Link to={`/admin/pratos/${e.id}`}> Editar </Link>]
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
