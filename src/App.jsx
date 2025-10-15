import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import  { Registro } from "./register";
import CrudPage from "./CrudPage";

function App() {
  const { email } = useSelector((state) => state.auth);

  return (
    <BrowserRouter>
      <Routes>
        {/* Si NO está logueado -> redirige a register */}
        {!email ? (
          <>
            <Route path="/register" element={<Registro />} />
            <Route path="/*" element={<Navigate to="/register" />} />
          </>
        ) : (
          <>
            {/* Si está logueado -> redirige al CRUD */}
            <Route path="/crud" element={<CrudPage />} />
            <Route path="/*" element={<Navigate to="/crud" />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
