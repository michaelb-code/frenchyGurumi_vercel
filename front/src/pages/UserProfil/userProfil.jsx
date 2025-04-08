import React, { useState, useEffect } from 'react';
import styles from './UserProfil.module.css';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import URL from '../../constant/api';

const UserProfil = () => {
    const { auth, authLoading } = useAuth();
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [avis, setAvis] = useState([]);

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