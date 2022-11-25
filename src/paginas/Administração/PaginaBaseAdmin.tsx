import { Link as RouterLink, Outlet } from "react-router-dom";
import {
  Button,
  Typography,
  AppBar,
  Container,
  Toolbar,
  Link,
  Box,
  Paper,
} from "@mui/material";
import Rodape from "../../componentes/Rodape/index";
export default function PaginaBaseAdmin() {
  return (
    <>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar>
            <Typography variant="h6">Administração</Typography>
            <Box sx={{ display: "flex", flexGrow: 1 }}>
              <Link component={RouterLink} to={"/admin/"}>
                <Button sx={{ my: 2, color: "white" }}>Restaurantes</Button>
              </Link>
              <Link component={RouterLink} to={"/admin/pratos"}>
                <Button sx={{ my: 2, color: "white" }}>Pratos</Button>
              </Link>
              <Link component={RouterLink} to={"/admin/novo"}>
                <Button sx={{ my: 2, color: "white" }}>Novo Restaurante</Button>
              </Link>
              <Link component={RouterLink} to={"/admin/pratos/novo"}>
                <Button sx={{ my: 2, color: "white" }}>Novo Prato</Button>
              </Link>{" "}
              <Link component={RouterLink} to={"/"}>
                <Button sx={{ my: 2, color: "white" }}>Voltar</Button>
              </Link>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Box>
        <Container maxWidth="lg" sx={{ mt: 1 }}>
          <Paper sx={{ p: 2 }}>
            <Outlet />
          </Paper>
        </Container>
      </Box>
      <div style={{ position: "fixed", bottom: 0, width: "100vw" }}>
        <Rodape />
      </div>
    </>
  );
}
