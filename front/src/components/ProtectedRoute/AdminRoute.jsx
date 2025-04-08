import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

// Composant qui protège les routes pour les administrateurs uniquement
const AdminRoute = () => {
    const { auth } = useAuth();

    // Vérifier si l'utilisateur est connecté et est un administrateur
    if (!auth || !auth.data || auth.data.role !== 'admin') {
        return <Navigate to="/" replace />;
    }

    // Si l'utilisateur est un administrateur, j'affiche le contenu de la route
    return <Outlet />;
};
export default AdminRoute;