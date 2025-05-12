import React, { useState, useEffect } from 'react';
import styles from './UserProfil.module.css';
import { useNavigate} from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import URL from '../../constant/api';
import { ToastContainer, toast } from 'react-toastify';

const UserProfil = () => {
    const { auth, authLoading } = useAuth();
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [avis, setAvis] = useState([]);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [avisToDelete, setAvisToDelete] = useState(null);

    useEffect(() => {
        // Attendre que l'authentification soit chargée
        if (authLoading) {
            return;
        }

        // Vérifier si l'utilisateur est connecté
        if (!auth && !authLoading) {
            navigate('/login');
            return;
        }

        // Continuer seulement si auth est défini
        if (!auth) return;

        // Vérifier qu'on a bien un ID utilisateur
        const userId = auth.data?._id;
        if (!userId) {
            setError("ID utilisateur non trouvé dans les données d'authentification");
            setLoading(false);
            return;
        }

        const fetchUserData = async () => {
            try {
                setLoading(true);
                const response = await fetch(`${URL.GET_USER_BY_ID}/${userId}`, {
                    headers: {
                        Authorization: `Bearer ${auth.token}`
                    }
                });

                if (!response.ok) {
                    throw new Error("Erreur lors de la récupération des données utilisateur");
                }

                const userData = await response.json();
                console.log('Données utilisateur complètes:', userData);

                if (userData && userData.data) {
                    setUser(userData.data);

                    // Récupérer toutes les commandes
                    try {
                        const allOrdersResponse = await fetch(`${URL.GET_ALL_COMMANDES}`, {
                            headers: {
                                Authorization: `Bearer ${auth.token}`
                            }
                        });

                        if (allOrdersResponse.ok) {
                            const allOrdersData = await allOrdersResponse.json();
                            console.log('Réponse API commandes:', allOrdersData);

                            const commandesList = allOrdersData.commandes || [];

                            // Filtrer les commandes de l'utilisateur
                            const userOrders = commandesList.filter(commande => {
                                return (
                                    commande.user === userData.data._id ||
                                    (commande.user && commande.user._id === userData.data._id)
                                );
                            });

                            console.log("Commandes de l'utilisateur:", userOrders);
                            setOrders(userOrders);
                        }
                    } catch (err) {
                        console.error("Erreur lors de la récupération des commandes:", err);
                    }
                } else {
                    setUser(userData);
                }

                setError(null);
            } catch (err) {
                console.error("Erreur:", err);
                setError("Une erreur est survenue lors du chargement de vos informations.");
            } finally {
                setLoading(false);
            }
        };

        const fetchAvis = async () => {
            try {
                const response = await fetch(`${URL.GET_ALL_AVIS}`);
                const responseData = await response.json();
                console.log('Response api:', responseData);

                if (!response.ok) {
                    throw new Error("Erreur lors de la récupération des avis");
                }

                if (responseData.avis && Array.isArray(responseData.avis)) {
                    setAvis(responseData.avis);

                    // Filtrer les avis pour l'utilisateur connecté
                    const userAvis = responseData.avis.filter(avis => 
                        avis.user === auth.data._id ||
                        (avis.user && avis.user._id === auth.data._id)
                    );
                    console.log("Avis de l'utilisateur:", userAvis);
                    setAvis(userAvis);
                } else {
                    setAvis([]);
                    console.log('Les avis reçus ne sont pas dans le format attendu:', responseData);
                }
            } catch (err) {
                console.error("Erreur lors de la récupération des avis:", err);
                setAvis([]);
            }
        };
        
        fetchUserData();
        fetchAvis();
    }, [auth, navigate, authLoading]);

    const handleLogout = () => {
        // Supprimer les informations d'authentification du localStorage
        localStorage.removeItem('auth');
        // Rafraîchir la page pour mettre à jour l'état d'authentification
        window.location.reload();
    };

    const handleEditProfile = () => {
        if (user) {
            navigate(`/update-profil/${user._id}`);
        }
    };

    const handleDeleteAvis = async (avisId) => {
        try{
           
            const response = await fetch(`${URL.DELETE_AVIS}/${avisId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${auth.token}`
                }
            });
            
            console.log('Réponse de suppression:', response);
            
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Erreur lors de la suppression de l'avis");
            }
            
            const data = await response.json();
            console.log("Avis supprimé:", data);
            
            // Mettre à jour la liste des avis
            setAvis(avis.filter(avis => avis._id !== avisId));
            setShowDeleteModal(false);
            
            // Afficher un message de succès
            toast.success("Avis supprimé avec succès");
            
        } catch (error) {
            console.error("Erreur lors de la suppression de l'avis:", error);
            toast.error(error.message || "Erreur lors de la suppression de l'avis");
            setError(error.message);
            setShowDeleteModal(false);
        }
    }
       // Fonction pour ouvrir la modale de confirmation
       const openDeleteModal = (avisId) => {
        setAvisToDelete(avisId);
        setShowDeleteModal(true);
    };

    // Fonction pour fermer la modale de confirmation
    const closeDeleteModal = () => {
        setAvisToDelete(null);
        setShowDeleteModal(false);
    };

    if (loading) {
        return (
            <div className={styles.loading}>
                <img src="/Logo/LogoMarque.jpg" alt="loading" />
                <p className={styles.loadingTest}>Chargement...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="alert alert-danger" role="alert">
                {error}
            </div>
        );
    }

    if (!user) {
        return (
            <div className="alert alert-warning" role="alert">
                Vous devez être connecté pour accéder à cette page.
            </div>
        );
    }

    return (
        <div className={styles.profileContainer}>
            <h1 className={styles.profileHeading}>Votre Profil</h1>

            <div className={styles.avatarContainer}>
                <img
                    className={styles.profileImage}
                    src={user.photo ? user.photo : "/photoIcon/photoProfilUser.jpg"}
                    alt="emplacement de l'avatar du profil"
                />
                <button
                    className="btn btn-primary w-100"
                    onClick={handleEditProfile}
                >
                    Modifier Avatar
                </button>
            </div>

            <div className={styles.infoContainer}>
                <div className={styles.userInfoCard}>
                    <div className={styles.sectionTitle}>
                        <h2>Vos informations</h2>
                    </div>

                    <div className={styles.infoItem}>
                        <h5 className={styles.infoLabel}>Nom</h5>
                        <p className={styles.infoValue}>{user.nom || 'Non renseigné'}</p>
                    </div>

                    <div className={styles.infoItem}>
                        <h5 className={styles.infoLabel}>Prénom</h5>
                        <p className={styles.infoValue}>{user.prenom || 'Non renseigné'}</p>
                    </div>

                    <div className={styles.infoItem}>
                        <h5 className={styles.infoLabel}>Date de naissance</h5>
                        <p className={styles.infoValue}>
                            {user.date_naissance
                                ? new Date(user.date_naissance).toLocaleDateString()
                                : 'Non renseigné'}
                        </p>
                    </div>

                    <div className={styles.infoItem}>
                        <h5 className={styles.infoLabel}>Sexe</h5>
                        <p className={styles.infoValue}>{user.sexe || 'Non renseigné'}</p>
                    </div>

                    <div className={styles.infoItem}>
                        <h5 className={styles.infoLabel}>Email</h5>
                        <p className={styles.infoValue}>{user.email || 'Non renseigné'}</p>
                    </div>

                    <div className={styles.infoItem}>
                        <h5 className={styles.infoLabel}>Téléphone</h5>
                        <p className={styles.infoValue}>{user.telephone || 'Non renseigné'}</p>
                    </div>

                    <div className={styles.infoItem}>
                        <h5 className={styles.infoLabel}>Adresse</h5>
                        <p className={styles.infoValue}>{user.adresse || 'Non renseigné'}</p>
                    </div>

                    <div className={styles.infoItem}>
                        <h5 className={styles.infoLabel}>Code postal</h5>
                        <p className={styles.infoValue}>{user.code_postal || 'Non renseigné'}</p>
                    </div>

                    <div className={styles.infoItem}>
                        <h5 className={styles.infoLabel}>Ville</h5>
                        <p className={styles.infoValue}>{user.ville || 'Non renseigné'}</p>
                    </div>

                    <button
                        className="btn btn-primary w-100"
                        onClick={handleEditProfile}
                    >
                        Modifier
                    </button>
                </div>

                <div className={styles.userInfoCard}>
                    <div className={styles.sectionTitle}>
                        <h5>Commandes et Avis</h5>
                    </div>
                    
                    {/* Commandes */}
                    <div className={styles.cardSection}>
                        <h6 className={styles.subTitle}>Commandes</h6>
                        <button
                            className="btn btn-primary w-100"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#collapseExample"
                            aria-expanded="false"
                            aria-controls="collapseExample"
                        >
                            Vos commandes
                        </button>

                        <div className="collapse" id="collapseExample">
                            <div className="card card-body">
                                {orders.length > 0 ? (
                                    <div className={styles['card-body']}>
                                        <table className={styles.ordersTable}>
                                            <thead>
                                                <tr>
                                                    <th scope="col">#</th>
                                                    <th scope="col">Commande</th>
                                                    <th scope="col">Date</th>
                                                    <th scope="col">Total</th>
                                                    <th scope="col">Statut</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {orders.map((order, index) => (
                                                    <tr key={order._id || index}>
                                                        <th scope="row">{index + 1}</th>
                                                        <td title={order._id}>{order.order_number || order._id.substring(0, 8) + '...'}</td>
                                                        <td>
                                                            {order.createdAt
                                                                ? new Date(order.createdAt).toLocaleDateString()
                                                                : order.date
                                                                    ? new Date(order.date).toLocaleDateString()
                                                                    : 'N/A'}
                                                        </td>
                                                        <td>{order.total ? `${order.total} €` : 'N/A'}</td>
                                                        <td>
                                                            <span className={`badge ${order.statut === 'Terminé' ? 'bg-success' : order.statut === 'Annulé' ? 'bg-danger' : 'bg-warning'}`}>
                                                                {order.statut || 'En attente'}
                                                            </span>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                ) : (
                                    <p className="text-center">Vous n'avez pas encore de commandes.</p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Avis */}
                    <div className={styles.cardSection}>
                        <h6 className={styles.subTitle}>Avis</h6>
                        <button
                            className="btn btn-primary w-100"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#collapseAvisExample"
                            aria-expanded="false"
                            aria-controls="collapseAvisExample"
                        >
                            Vos avis
                        </button>

                        <div className="collapse" id="collapseAvisExample">
                            <div className="card card-body">
                                <table className={styles.ordersTable}>
                                    <thead>
                                        <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">Article</th>
                                            <th scope="col">Date</th>
                                            <th scope="col">Note</th>
                                            <th scope="col">Commentaire</th>
                                            <th scope="col">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {Array.isArray(avis) && avis.map((avisItem, index) => (
                                            <tr key={avisItem._id || index}>
                                                <td>{index + 1}</td>
                                                <td>{avisItem.article?.nom || 'Article inconnu'}</td>
                                                <td>{new Date(avisItem.createdAt).toLocaleDateString()}</td>
                                                <td>{avisItem.note}</td>
                                                <td>{avisItem.commentaire}</td>
                                                <td>
                                                    {/* Modale de confirmation de suppression */}
                                                            {showDeleteModal && avisToDelete === avisItem._id && (
                                                                <div className={styles.modalOverlay}>
                                                                    <div className={styles.modal}>
                                                                        <div className={styles.modalHeader}>
                                                                            <h2>Confirmation de suppression</h2>
                                                                            <button className={styles.closeButton} onClick={closeDeleteModal}>&times;</button>
                                                                        </div>
                                                                        <div className={styles.modalBody}>
                                                                        <p>Vous voulez supprimer l'avis pour <strong>{avisItem.article?.nom || 'cet article'}</strong> ?</p>
                                                                            <p>Cette action est irréversible.</p>
                                                                        </div>
                                                                        <div className={styles.modalFooter}>
                                                                            <button className={styles.cancelButton} onClick={closeDeleteModal}>Annuler</button>
                                                                            <button className={styles.confirmButton} onClick={() => handleDeleteAvis(avisItem._id)}>Confirmer</button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            )}
                                                    <button className="btn btn-danger btn-sm" onClick={() => openDeleteModal(avisItem._id)}>
                                                        <i className="fa fa-trash"></i>
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                    
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <button
                className="btn btn-danger w-50"
                onClick={handleLogout}
            >
                Déconnexion
            </button>
        </div>
    );
};

export default UserProfil;