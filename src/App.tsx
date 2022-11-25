import { Routes, Route } from "react-router-dom";
import Home from "./paginas/Home";
import VitrineRestaurantes from "./paginas/VitrineRestaurantes";
import Admin from "./paginas/Administração";
import FormularioRestaurante from "./paginas/Administração/FormularioRestaurante";
import PaginaBaseAdmin from "./paginas/Administração/PaginaBaseAdmin";
import PratosAdmin from "./paginas/Administração/Pratos";
import FormulariodePratos from "./paginas/Administração/FormulariodePratos";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/restaurantes" element={<VitrineRestaurantes />} />
        <Route path="/admin" element={<PaginaBaseAdmin />}>
          <Route path="" element={<Admin />} />
          <Route path="novo" element={<FormularioRestaurante />} />
          <Route path=":id" element={<FormularioRestaurante />} />
          <Route path="pratos" element={<PratosAdmin />} />
          <Route path="pratos/novo" element={<FormulariodePratos />} />
          <Route path="pratos/:id" element={<FormulariodePratos />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
