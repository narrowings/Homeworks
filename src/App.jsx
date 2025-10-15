import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Registro } from "./register";
import CrudPage from "./CrudPage";
import ChatPage from "./chatPage";

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
        <Route path="/chat" element={<ChatPage />} />

      </Routes>
    </>
  );
}

export default App;
