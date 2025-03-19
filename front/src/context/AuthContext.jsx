import { createContext, useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import URL from "../constant/api";

//creation du contexte d'authentification
export const AuthContext = createContext(null);

export const useAuth = () => {
    return useContext(AuthContext);
}

//creation du provider
export const AuthProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false);
    //state pour stocker les infos du user connecté
    const [auth, setAuth] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        isLoggedIN();
    }, [])

    const login = async (dataForm) => {

        setIsLoading(true);

        try {
            const response= await fetch(URL.SIGNIN, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dataForm)
            });

            // const data = await response.json();
            if (response.status === 200) {
                const data = await response.json();
                localStorage.setItem("auth", JSON.stringify(data))
                setAuth(data)
                navigate("/")
                setIsLoading(false)
            }
            else {
                const errordata = await response.json().catch(() =>({message: 'erreur de connexion'}))
                throw new Error(errordata.message || "Connexion echouée");
            }
            
        } catch (error) {
            console.log(error)
            setIsLoading(false)
        }
    }

    const isLoggedIN = async () => {
        setIsLoading(true);
        try {
            const savedAuth = await localStorage.getItem("auth")
            setAuth(savedAuth ? JSON.parse(savedAuth) : null)
            setIsLoading(false)
        } catch (error) {
            console.error("Erreur lors du parsing", error)
            setIsLoading(false)
        }
    }
    const logout = () => {
        setIsLoading(true);
        localStorage.removeItem("auth")
        setAuth(null)
        navigate("/login")
        setIsLoading(false);
    }

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














