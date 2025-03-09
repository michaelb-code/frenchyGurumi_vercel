import { createContext, useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import URL from "../constant/api";

//creation du contexte d'authentification
const AuthContext = createContext(null);

export const useAuth = () => {
    return useContext(AuthContext)
};

//provider du contexte 

export const AuthProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false);
    //state pour stocker les infos du user connecté
    const [auth, setAuth] = useState(null);
    const navigate = useNavigate();

    const login = async (dataForm) => {

        setIsLoading(true);

        try {
            const response = await fetch(URL.SIGNIN, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dataForm)
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
        setIsLoading(true);
        localStorage.removeItem("auth")
        setAuth(null)
        navigate("/")
        setIsLoading(false);
    };

    useEffect(() => {
        const savedAuth = localStorage.getItem("auth")
        if (savedAuth) {
            try {
                setAuth(JSON.parse(savedAuth))
                setIsLoading(false)
            } catch (error) {
                console.error("Erreur lors du parsing", error)
                setIsLoading(false)
            }
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
};

export { AuthContext }












