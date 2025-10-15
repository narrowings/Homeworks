import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"; // ✅ IMPORT NECESARIO
import { registerAuth, startGoogleLogin, startLogout } from "./thunks";

export const Registro = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate(); // ✅ DEFINIR
    const { email, status } = useSelector((state) => state.auth); // ✅ TOMAR EMAIL DEL STORE

    const [formState, setFormState] = useState({
        email: "",
        password: ""
    });

    useEffect(() => {
        // ✅ Navegar cuando esté autenticado
        if (status === "authenticated") {
            navigate("/crud");
        }
    }, [status]);

    const onInputChange = (evt) => {
        const { name, value } = evt.target;
        setFormState({
            ...formState,
            [name]: value
        });
    };

    const onSubmit = (event) => {
        event.preventDefault();
        dispatch(registerAuth(formState.email, formState.password));
    };

    const handleGoogleLogin = () => {
        dispatch(startGoogleLogin());
    };

    const handleLogout = () => {
        dispatch(startLogout());
    };

    return (
        <>
            <h1>Registro</h1>
            <hr />
            <form onSubmit={onSubmit}>
                <input name="email" type="email" onChange={onInputChange} value={formState.email} />
                <input name="password" type="password" onChange={onInputChange} value={formState.password} />
                <button type="submit"> Registro </button>
                <button type="button" onClick={handleGoogleLogin}>
                    Entrar con Google 🚀
                </button>
                <button type="button" onClick={handleLogout}>
                    Cerrar sesión 🚪
                </button>
            </form>
        </>
    );
};
