import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';

import * as ACTIONS from '../../redux/reducers/article.reducer';
import * as ORDER_ACTIONS from '../../redux/reducers/commande.reducer';
import * as USER_ACTIONS from '../../redux/reducers/user.reducer';

import URL from '../../constant/api';
import style from './Dashboard.module.css';

const Dashboard = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const store = useSelector((state) => state.article.data);
    const storeOrder = useSelector((state) => state.commande.data);
    const storeUser = useSelector((state) => state.user.data);

    const [loading, setLoading] = React.useState(true);
    const [articleLoading, setArticleLoading] = React.useState(true);
    const [orderLoading, setOrderLoading] = React.useState(true);
    const [usersLoading, setUsersLoading] = React.useState(true);
    const [error, setError] = React.useState(null);
    const [successMessage, setSuccessMessage] = React.useState(null);
    const { id } = useParams();

    useEffect(() => {
        fetchArticles();
        fetchOrders();
        fetchUsers();
    }, []);

    // Affiche un message de succu00e8s pendant 3 secondes
    const showSuccessMessage = (message) => {
        setSuccessMessage(message);
        setTimeout(() => {
            setSuccessMessage(null);
        }, 3000);
    };

    const fetchArticles = async () => {
        try {
            const response = await fetch(URL.GETALL_ARTICLES, {
                headers: {
                    'Content-Type': "application/json"
                }
            });
            console.log(response);

            if (!response.ok) {
                throw new Error("Erreur lors de la récupération des articles");
            }

            const data = await response.json();
            dispatch(ACTIONS.FETCH_ARTICLE_SUCCESS(data.articles));
            setError(null);
            setArticleLoading(false);
            updateLoadingState();

        } catch (error) {
            console.error("Erreur lors de la récupération des articles:", error);
            setError(error.message || "Erreur lors de la récupération des articles");
            setArticleLoading(false);
            updateLoadingState();
        }
    };

    const fetchOrders = async () => {
        try {
            const response = await fetch(URL.GET_ALL_COMMANDES, {
                headers: {
                    'Content-Type': "application/json"
                }
            });
            console.log("reponse commande:", response);

            if (!response.ok) {
                throw new Error("Erreur lors de la récupération des commandes");
            }

            const data = await response.json();
            console.log("data commande:", data);
            dispatch(ORDER_ACTIONS.FETCH_ORDER_SUCCESS(data.commandes));

            console.log(data);
            setError(null);

            setOrderLoading(false);
            updateLoadingState();

            console.log(storeOrder);
            console.log(store);

        } catch (error) {
            console.error("Erreur lors de la récupération des commandes:", error);
            setError(error.message || "Erreur lors de la récupération des commandes");
            setOrderLoading(false);
            updateLoadingState();
        }
    };

    const fetchUsers = async () => {
        try {
            // Dispatch l'action de du00e9but de chargement
            dispatch(USER_ACTIONS.FETCH_USER_START());

            const response = await fetch(URL.GET_ALL_USERS, {
                headers: {
                    'Content-Type': "application/json"
                }
            });
            console.log("reponse user:", response);

            if (!response.ok) {
                throw new Error("Erreur lors de la récupération des utilisateurs");
            }

            const data = await response.json();
            console.log("data user:", data);

            dispatch(USER_ACTIONS.FETCH_USER_SUCCESS(data));

            console.log(data);
            setError(null);

            setUsersLoading(false);
            updateLoadingState();

            console.log(store);
        } catch (error) {
            console.error("Erreur lors de la récupération des utilisateurs:", error);
            dispatch(USER_ACTIONS.FETCH_USER_ERROR(error.message));
            setError(error.message || "Erreur lors de la récupération des utilisateurs");
            setUsersLoading(false);
            updateLoadingState();
        }
    };

    // LES CONST DELETE
    const deleteUser = async (id) => {
        try {
            const response = await fetch(`${URL.DELETE_USER}/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': "application/json"
                }
            });

            if (response.status === 200) {
                // Mise à jour locale de l'état Redux
                dispatch(USER_ACTIONS.setUsers(storeUser.filter(user => user._id !== id)));
                showSuccessMessage('Utilisateur supprimé avec succès!');
            }

        } catch (error) {
            console.error("Erreur lors de la suppression de l'utilisateur:", error);
            setError(error.message || "Erreur lors de la suppression de l'utilisateur");
        }
    };

    const deleteArticle = async (id) => {
        try {
            const response = await fetch(`${URL.DELETE_ARTICLE}/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': "application/json"
                }
            });

            if (response.status === 200) {
                // Mise à jour locale de l'état Redux
                dispatch(ACTIONS.setArticles(store.filter(article => article._id !== id)));
                showSuccessMessage('Article supprimé avec succès!');
            }

        } catch (error) {
            console.error("Erreur lors de la suppression de l'article:", error);
            setError(error.message || "Erreur lors de la suppression de l'article");
        }
    };

    const deleteOrder = async (id) => {
        try {
            console.log("Tentative de suppression de la commande ID:", id);
            console.log("URL utilisée:", `${URL.DELETE_COMMANDE}/${id}`);

            const response = await fetch(`${URL.DELETE_COMMANDE}/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': "application/json"
                }
            });

            if (response.status === 200) {
                // Mise à jour locale de l'état Redux
                dispatch(ORDER_ACTIONS.setOrders(storeOrder.filter(order => order._id !== id)));
                showSuccessMessage('Commande supprimé avec succès!');
            }

        } catch (error) {
            console.error("Erreur lors de la suppression de la commande:", error);
            setError(error.message || "Erreur lors de la suppression de la commande");
        }
    };

    // LES CONST UPDATE
    const updateUser = async (id) => {
        try {
            // Rediriger vers la page de mise à jour avec l'ID
            navigate(`/update-profil/${id}`);
        } catch (error) {
            console.error("Erreur lors de la mise à jour de l'utilisateur:", error);
            setError(error.message || "Erreur lors de la mise à jour de l'utilisateur");
        }
    };

    const updateArticle = async (id) => {
        try {
            // Rediriger vers la page de mise à jour avec l'ID
            navigate(`/update/${id}`);
        } catch (error) {
            console.error("Erreur lors de la mise à jour de l'article:", error);
            setError(error.message || "Erreur lors de la mise à jour de l'article");
        }
    };

    const updateOrder = async (id) => {
        try {
            // Rediriger vers la page de mise à jour avec l'ID
            navigate(`/update-order/${id}`);
        } catch (error) {
            console.error("Erreur lors de la mise à jour de la commande:", error);
            setError(error.message || "Erreur lors de la mise à jour de la commande");
        }
    };

    const updateLoadingState = () => {
        console.log('état de chargement:', { articleLoading, orderLoading, usersLoading });
        if (!articleLoading && !orderLoading && !usersLoading) {
            setLoading(false);
        }
    };

    // Fonction pour trouver le prix d'un article dans le store
    const findArticlePrice = (articleId) => {
        if (!Array.isArray(store)) return 'N/A';

        const article = store.find(art => art._id === articleId);
        return article ? `${article.prix} €` : 'N/A';
    };



    if (loading) return (
        <div className={style.loadingContainer}>
            <img src="/Logo/LogoMarque.jpg" alt="loading" />
            <p>Chargement...</p>
        </div>
    );

    if (error) return <div className={style.errorMessage}>{error}</div>;

    return (
        <div className={style.dashboardContainer}>
            {successMessage && (
                <div className={style.successMessage}>
                    {successMessage}
                </div>
            )}
            <h1 className={style.dashboardHeading}>Dashboard</h1>
            <div className={style.cardContainer}>
                <div className={style.dashboardCard}>
                    <h2>Article</h2>
                    <button>Article</button>
                </div>
                <div className={style.dashboardCard}>
                    <h2>Commande</h2>
                    <button>Commande</button>
                </div>
                <div className={style.dashboardCard}>
                    <h2>Utilisateur</h2>
                    <button>Utilisateur</button>
                </div>
            </div>

            <div className={style.tableSection}>
                <h2>Tableau Article</h2>
                <div className={style.tableContainer}>
                    <table className={style.dashboardTable}>
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Nom</th>
                                <th scope="col">Categorie</th>
                                <th scope="col">Prix</th>
                                <th scope="col">Image</th>
                                <th scope="col">Stock</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Array.isArray(store) && store.length > 0 ? (
                                store.map((article, index) => (
                                    <tr key={index}>
                                        <th scope="row">{index + 1}</th>
                                        <td>{article.nom}</td>
                                        <td>{article.categorie}</td>
                                        <td>{article.prix} €</td>
                                        <td><img src={article.photo[0]} alt='article' width={30} height={30} /></td>
                                        <td>{article.stock}</td>
                                        <td>
                                            <button className={`${style.actionBtn} ${style.editBtn}`} onClick={() => updateArticle(article._id)}><i className="bi bi-pen-fill"></i></button>
                                            <button className={`${style.actionBtn} ${style.deleteBtn}`} onClick={() => deleteArticle(article._id)}><i className="bi bi-trash-fill"></i></button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="7" className="text-center">Aucun article trouvé</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                <Link to="/add" className={style.addBtn}>
                    Ajouter un article
                </Link>
            </div>

            <div className={style.tableSection}>
                <h2>Tableau Commande</h2>
                <div className={style.tableContainer}>
                    <table className={style.dashboardTable}>
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Commande</th>
                                <th scope="col">Date</th>
                                <th scope="col">Client</th>
                                <th scope="col">Article</th>
                                <th scope="col">Mode de paiement</th>
                                <th scope="col">Statut</th>
                                <th scope="col">Total</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Array.isArray(storeOrder) && storeOrder.length > 0 ? (
                                storeOrder.map((commande, index) => (
                                    <tr key={index}>
                                        <th scope="row">{index + 1}</th>
                                        <td>{commande._id}</td>
                                        <td>{new Date(commande.date).toLocaleDateString('fr-FR')}</td>
                                        <td>{commande.user}</td>
                                        <td>{commande.articles && commande.articles.length > 0 ? (
                                            commande.articles.map((item, index) => (
                                                <div key={index} className="border-bottom pb-1 mb-1">
                                                    <strong>Article ID:</strong> {item.article}<br />
                                                    <strong>Quantité:</strong> {item.quantite}<br />
                                                    <strong>Prix Unitaire:</strong> {findArticlePrice(item.article)}
                                                </div>
                                            ))
                                        ) : 'Aucun article'}</td>
                                        <td>{commande.mode_de_paiement}</td>
                                        <td>{commande.statut}</td>
                                        <td>{commande.total} €</td>
                                        <td>
                                            <button className={`${style.actionBtn} ${style.editBtn}`} onClick={() => updateOrder(commande._id)}><i className="bi bi-pen-fill"></i></button>
                                            <button className={`${style.actionBtn} ${style.deleteBtn}`} onClick={() => deleteOrder(commande._id)}><i className="bi bi-trash-fill"></i></button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="9" className="text-center">Aucune commande trouvée</td>
                                </tr>
                            )}
                        </tbody>
                    </table>

                </div>
                <Link to="/order" className={`${style.actionBtn} ${style.addBtn}`}>
                    Ajouter une commande
                </Link>
            </div>

            <div className={style.tableSection}>
                <h2>Tableau Utilisateur</h2>
                <div className={style.tableContainer}>
                    <table className={style.dashboardTable}>
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Nom</th>
                                <th scope="col">Prenom</th>
                                <th scope="col">Date de naissance</th>
                                <th scope="col">Tu00e9lu00e9phone</th>
                                <th scope="col">Email</th>
                                <th scope="col">Adresse</th>
                                <th scope="col">Ville</th>
                                <th scope="col">Code Postal</th>
                                <th scope="col">Role</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Array.isArray(storeUser) && storeUser.length > 0 ? (
                                storeUser.map((user, index) => (
                                    <tr key={index}>
                                        <th scope="row">{index + 1}</th>
                                        <td>{user.nom || 'Non Communiqué'}</td>
                                        <td>{user.prenom || 'Non Communiqué'}</td>
                                        <td>{user.date_naissance ? new Date(user.date_naissance).toLocaleDateString('fr-FR') : 'Non Communiqué'}</td>
                                        <td>{user.telephone || 'Non Communiqué'}</td>
                                        <td>{user.email || 'Non Communiqué'}</td>
                                        <td>{user.adresse || 'Non Communiqué'}</td>
                                        <td>{user.ville || 'Non Communiqué'}</td>
                                        <td>{user.code_postal || 'Non Communiqué'}</td>
                                        <td>{user.role || 'Non Communiqué'}</td>
                                        <td>
                                            <button className={`${style.actionBtn} ${style.editBtn}`} onClick={() => updateUser(user._id)}><i className="bi bi-pen-fill"></i></button>
                                            <button className={`${style.actionBtn} ${style.deleteBtn}`} onClick={() => deleteUser(user._id)}><i className="bi bi-trash-fill"></i></button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="11" className="text-center">Aucun utilisateur trouvé</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                    <Link to="/register" className={style.addBtn}>
                        Ajouter un utilisateur
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Dashboard