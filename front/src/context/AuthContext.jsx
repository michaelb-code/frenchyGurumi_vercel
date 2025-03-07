import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import URL from "../constant/api";
import { useContext } from "react";

//creation du contexte d'authentification
export const AuthContext = createContext();


export const useAuth = () => {
    return useContext(AuthContext)
};

//provider du contexte 

export const AuthProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false);
    //state pour stocker les infos du user connecté
    const [auth, setAuth] = useState(null);
    const navigate = useNavigate();

    const login = async (email, password) => {

        setIsLoading(true);

        try {
            const response = await fetch(URL.SIGNIN, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem("auth", JSON.stringify(data))
                setAuth(data)
                navigate("/")
                setIsLoading(false)
            }
            else {
                throw new Error(data.message || "Connexion echouée");
            }
        } catch (error) {
            console.log(error)
            setIsLoading(false)
        }
    }

    const logout = () => {
        localStorage.removeItem("auth")
        setAuth(null)
        navigate("/")
    };

    useEffect(() => {
        const savedAuth = localStorage.getItem("auth")
        if (savedAuth) {
            setAuth(JSON.parse(savedAuth))
        }
    }, [])

    return (
        <AuthContext.Provider value={{
            isLoading,
            auth,
            login,
            logout
        }}>
            {children}
        </AuthContext.Provider>
    )
}







