import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Registro } from "./register";
import CrudPage from "./CrudPage";

function App() {
  const { email } = useSelector((state) => state.auth);

  return (
    <>
      <Routes>
        {!email ? (
          <>
            <Route path="/register" element={<Registro />} />
            <Route path="/*" element={<Navigate to="/register" />} />
          </>
        ) : (
          <>
            <Route path="/crud" element={<CrudPage />} />
            <Route path="/*" element={<Navigate to="/crud" />} />
          </>
        )}
      </Routes>
    </>
  );
}

export default App;
