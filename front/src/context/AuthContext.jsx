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
            const {data, status } = await fetch(URL.SIGNIN, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dataForm)
            });

            if (status === 200) {
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
            try {
                setAuth(JSON.parse(savedAuth))

            } catch (error) {
                console.error("Erreur lors du parsing", error)
                localStorage.removeItem("auth")
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
}

export default AuthContext









