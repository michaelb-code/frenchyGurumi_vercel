import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

// Composant qui protège les routes pour les utilisateurs authentifiés uniquement
const ProtectedRoute = () => {
    const { auth } = useAuth();

    // Si l'utilisateur n'est pas connecté, je redirige vers la page de connexion
    if (!auth || !auth.data) {
        return <Navigate to="/login" replace />;
    }

    // Si l'utilisateur est connecté, j'affiche le contenu de la route
    return <Outlet />;
};
export default ProtectedRoute;