import React, { useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import * as ACTIONS from '../../redux/reducers/article.reducer';
import * as ORDER_ACTIONS from '../../redux/reducers/commande.reducer';
import * as USER_ACTIONS from '../../redux/reducers/user.reducer';
import * as AVIS_ACTIONS from '../../redux/reducers/avis.reducer';

import URL from '../../constant/api';
import style from './Dashboard.module.css';

const Dashboard = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const store = useSelector((state) => state.article.data);
    const storeOrder = useSelector((state) => state.commande.data);
    const storeUser = useSelector((state) => state.user.data);
    const storeAvis = useSelector((state) => state.avis.data);

    const [articleLoading, setArticleLoading] = React.useState(true);
    const [orderLoading, setOrderLoading] = React.useState(true);
    const [usersLoading, setUsersLoading] = React.useState(true);
    const [avisLoading, setAvisLoading] = React.useState(true);
    const [error, setError] = React.useState(null);
    const [successMessage, setSuccessMessage] = React.useState(null);
    const [sectionVisible, setSectionVisible] = React.useState('article');
    const [viewArticle, setViewArticle] = React.useState(null);

    const { id } = useParams();

    //chargement global
    const isLoading = articleLoading || orderLoading || usersLoading || avisLoading;

    useEffect(() => {
        fetchArticles();
        fetchOrders();
        fetchUsers();
        fetchAvis();
    }, []);

    const showSuccessMessage = (message) => {
        setSuccessMessage(message);
        setTimeout(() => {
            setSuccessMessage(null);
        }, 3000);
    };

    const fetchArticles = async () => {
        try {
            const response = await fetch(URL.GETALL_ARTICLES, {
                headers: { 'Content-Type': "application/json" }
            });

            if (!response.ok) throw new Error("Erreur lors de la récupération des articles");

            const data = await response.json();
            dispatch(ACTIONS.FETCH_ARTICLE_SUCCESS(data.articles));
            setArticleLoading(false);
        } catch (error) {
            console.error("Erreur articles:", error);
            setError(error.message || "Erreur lors de la récupération des articles");
            setArticleLoading(false);
        }
    };

    const fetchOrders = async () => {
        try {
            const response = await fetch(URL.GET_ALL_COMMANDES, {
                headers: { 'Content-Type': "application/json" }
            });

            if (!response.ok) throw new Error("Erreur lors de la récupération des commandes");

            const data = await response.json();
            dispatch(ORDER_ACTIONS.FETCH_ORDER_SUCCESS(data.commandes));
            setOrderLoading(false);
        } catch (error) {
            console.error("Erreur commandes:", error);
            setError(error.message || "Erreur lors de la récupération des commandes");
            setOrderLoading(false);
        }
    };

    const fetchUsers = async () => {
        try {
            dispatch(USER_ACTIONS.FETCH_USER_START());

            const response = await fetch(URL.GET_ALL_USERS, {
                headers: { 'Content-Type': "application/json" }
            });

            if (!response.ok) throw new Error("Erreur lors de la récupération des utilisateurs");

            const data = await response.json();
            console.log(data);
            dispatch(USER_ACTIONS.FETCH_USER_SUCCESS(data.data));
            setUsersLoading(false);
        } catch (error) {
            console.error("Erreur utilisateurs:", error);
            dispatch(USER_ACTIONS.FETCH_USER_ERROR(error.message));
            setError(error.message || "Erreur lors de la récupération des utilisateurs");
            setUsersLoading(false);
        }


    };
    const fetchAvis = async () => {
        try {
            dispatch(AVIS_ACTIONS.FETCH_AVIS_START());
            const response = await fetch(URL.GET_ALL_AVIS, {
                headers: { 'Content-Type': "application/json" }
            });

            if (!response.ok) throw new Error("Erreur lors de la récupération des avis");

            const responseData = await response.json();
            console.log('response avis:', responseData);


            if (responseData.avis && Array.isArray(responseData.avis)) {
                dispatch(AVIS_ACTIONS.FETCH_AVIS_SUCCESS(responseData.avis));

            } else {
                console.error("Format de réponse inattendu:", responseData);
                dispatch(AVIS_ACTIONS.FETCH_AVIS_ERROR("Format de réponse invalide"));
            }
            setAvisLoading(false);


        } catch (error) {
            console.error("Erreur avis:", error);
            dispatch(AVIS_ACTIONS.FETCH_AVIS_ERROR(error.message));
            setError(error.message || "Erreur lors de la récupération des avis");
            setAvisLoading(false);
        }
    };

    // --- DELETE ---
    const deleteUser = async (id) => {
        try {
            const response = await fetch(`${URL.DELETE_USER}/${id}`, { method: 'DELETE' });

            if (response.status === 200) {
                dispatch(USER_ACTIONS.setUsers(storeUser.filter(user => user._id !== id)));
                showSuccessMessage('Utilisateur supprimé avec succès!');
            }
        } catch (error) {
            console.error("Erreur suppression utilisateur:", error);
            setError(error.message || "Erreur lors de la suppression de l'utilisateur");
        }
    };

    const deleteArticle = async (id) => {
        try {
            const response = await fetch(`${URL.DELETE_ARTICLE}/${id}`, { method: 'DELETE' });

            if (response.status === 200) {
                dispatch(ACTIONS.setArticles(store.filter(article => article._id !== id)));
                showSuccessMessage('Article supprimé avec succès!');
            }
        } catch (error) {
            console.error("Erreur suppression article:", error);
            setError(error.message || "Erreur lors de la suppression de l'article");
        }
    };

    const deleteOrder = async (id) => {
        try {
            const response = await fetch(`${URL.DELETE_COMMANDE}/${id}`, { method: 'DELETE' });

            if (response.status === 200) {
                dispatch(ORDER_ACTIONS.setOrders(storeOrder.filter(order => order._id !== id)));
                showSuccessMessage('Commande supprimée avec succès!');
            }
        } catch (error) {
            console.error("Erreur suppression commande:", error);
            setError(error.message || "Erreur lors de la suppression de la commande");
        }
    };

    const deleteAvis = async (id) => {
        try {
            const response = await fetch(`${URL.DELETE_AVIS}/${id}`, { method: 'DELETE' });

            if (response.status === 200) {
                dispatch(AVIS_ACTIONS.setAvis(storeAvis.filter(avis => avis._id !== id)));
                showSuccessMessage('Avis supprimé avec succès!');
            }
        } catch (error) {
            console.error("Erreur suppression avis:", error);
            setError(error.message || "Erreur lors de la suppression de l'avis");
        }
    };

    // --- UPDATE ---
    const updateUser = (id) => navigate(`/update-profil/${id}`);
    const updateArticle = (id) => navigate(`/update/${id}`);
    const updateOrder = (id) => navigate(`/update-order/${id}`);
    const updateAvis = (id) => navigate(`/update-avis/${id}`);

    const findArticlePrice = (articleId) => {
        if (!Array.isArray(store)) return 'N/A';
        const article = store.find(art => art._id === articleId);
        return article ? `${article.prix} €` : 'N/A';
    };

    // --- Affichage ---
    if (isLoading) {
        return (
            <div className={style.loadingContainer}>
                <img src="/Logo/LogoMarque.jpg" alt="loading" />
                <p>Chargement...</p>
            </div>
        );
    }

    if (error) return <div className={style.errorMessage}>{error}</div>;

    return (
        <div className={style.dashboardContainer}>
            {successMessage && <div className={style.successMessage}>{successMessage}</div>}

            <h1 className={style.dashboardHeading}>Dashboard</h1>

            <div className={style.cardContainer}>
                <div className={style.dashboardCard}>
                    <h2>Article</h2>
                    <button onClick={() => setSectionVisible('article')}>Article</button>
                </div>
                <div className={style.dashboardCard}>
                    <h2>Commande</h2>
                    <button onClick={() => setSectionVisible('commande')}>Commande</button>
                </div>
                <div className={style.dashboardCard}>
                    <h2>Utilisateur</h2>
                    <button onClick={() => setSectionVisible('utilisateur')}>Utilisateur</button>
                </div>
                <div className={style.dashboardCard}>
                    <h2>Avis</h2>
                    <button onClick={() => setSectionVisible('avis')}>Avis</button>
                </div>
            </div>

            {/* Tableau Article */}
            {sectionVisible === 'article' && (
                <div className={style.tableSection}>
                    <h2>Tableau Article</h2>
                    <div className={style.tableContainer}>
                        <table className={style.dashboardTable}>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Nom</th>
                                    <th>Categorie</th>
                                    <th>Prix</th>
                                    <th>Image</th>
                                    <th>Stock</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Array.isArray(store) && store.length > 0 ? (
                                    store.map((article, index) => (
                                        <tr key={index}>
                                            <th>{index + 1}</th>
                                            <td>{article.nom}</td>
                                            <td>{article.categorie}</td>
                                            <td>{article.prix} €</td>
                                            <td><img src={article.photo[0]} alt="article" width={30} height={30} /></td>
                                            <td>{article.stock}</td>
                                            <td>
                                                <Link
                                                    to={`/detail/${article._id}`}
                                                    className="btn btn-info btn-sm"
                                                >
                                                    <i className="bi bi-eye-fill"></i>
                                                </Link>
                                                <button className="btn btn-warning btn-sm" onClick={() => updateArticle(article._id)}>
                                                        <i className="bi bi-pen-fill"></i>
                                                    </button>
                                                    <button className="btn btn-danger btn-sm" onClick={() => deleteArticle(article._id)}>
                                                        <i className="bi bi-trash-fill"></i>
                                                    </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr><td colSpan="7">Aucun article trouvé</td></tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                    <Link to="/add" className={style.addBtn}>Ajouter un article</Link>
                </div>
            )}

            {/* Tableau Commande */}
            {sectionVisible === 'commande' && (
                <div className={style.tableSection}>
                    <h2>Tableau Commande</h2>
                    <div className={style.tableContainer}>
                        <table className={style.dashboardTable}>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Commande</th>
                                    <th>Date</th>
                                    <th>Client</th>
                                    <th>Article</th>
                                    <th>Mode de paiement</th>
                                    <th>Statut</th>
                                    <th>Total</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Array.isArray(storeOrder) && storeOrder.length > 0 ? (
                                    storeOrder.map((commande, index) => (
                                        <tr key={index}>
                                            <th>{index + 1}</th>
                                            <td>{commande._id}</td>
                                            <td>{new Date(commande.date).toLocaleDateString('fr-FR')}</td>
                                            <td>{commande.user}</td>
                                            <td>
                                                {commande.articles?.map((item, i) => (
                                                    <span key={i}>
                                                        <strong>ID:</strong> {item.article}<br />
                                                        <strong>Quantité:</strong> {item.quantite}<br />
                                                        <strong>Prix:</strong> {findArticlePrice(item.article)}
                                                    </span>
                                                )) || 'Aucun article'}
                                            </td>
                                            <td>{commande.mode_de_paiement}</td>
                                            <td>{commande.statut}</td>
                                            <td>{commande.total} €</td>
                                            <td>
                                                <button className="btn btn-warning btn-sm" onClick={() => updateOrder(commande._id)}><i className="bi bi-pen-fill"></i></button>
                                                <button className="btn btn-danger btn-sm" onClick={() => deleteOrder(commande._id)}><i className="bi bi-trash-fill"></i></button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr><td colSpan="9">Aucune commande trouvée</td></tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                    <Link to="/order" className={style.addBtn}>Ajouter une commande</Link>
                </div>
            )}
            {/* Tableau Utilisateur */}

            {sectionVisible === 'utilisateur' && (
                <div className={style.tableSection}>
                    <h2>Tableau Utilisateur</h2>
                    <div className={style.tableContainer}>
                        <table className={style.dashboardTable}>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Nom</th>
                                    <th>Prénom</th>
                                    <th>Date de naissance</th>
                                    <th>Téléphone</th>
                                    <th>Email</th>
                                    <th>Adresse</th>
                                    <th>Ville</th>
                                    <th>Code Postal</th>
                                    <th>Rôle</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Array.isArray(storeUser) && storeUser.length > 0 ? (
                                    storeUser.map((user, index) => (
                                        <tr key={index}>
                                            <th>{index + 1}</th>
                                            <td>{user.nom || 'N/C'}</td>
                                            <td>{user.prenom || 'N/C'}</td>
                                            <td>{user.date_naissance ? new Date(user.date_naissance).toLocaleDateString('fr-FR') : 'N/C'}</td>
                                            <td>{user.telephone || 'N/C'}</td>
                                            <td>{user.email || 'N/C'}</td>
                                            <td>{user.adresse || 'N/C'}</td>
                                            <td>{user.ville || 'N/C'}</td>
                                            <td>{user.code_postal || 'N/C'}</td>
                                            <td>{user.role || 'N/C'}</td>
                                            <td>

                                                <button className="btn btn-warning btn-sm" onClick={() => updateUser(user._id)}><i className="bi bi-pen-fill"></i></button>
                                                <button className="btn btn-danger btn-sm" onClick={() => deleteUser(user._id)}><i className="bi bi-trash-fill"></i></button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr><td colSpan="11">Aucun utilisateur trouvé</td></tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                    <Link to="/register" className={style.addBtn}>Ajouter un utilisateur</Link>
                </div>
            )}
            {/* tableau avis */}
            {sectionVisible === 'avis' && (
                <div className={style.tableSection}>
                    <h2>Tableau Avis</h2>
                    <div className={style.tableContainer}>
                        <table className={style.dashboardTable}>
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Nom Utilisateur</th>
                                    <th scope="col">Article</th>
                                    <th scope="col">Image</th>
                                    <th scope="col">Note</th>
                                    <th scope="col">Commentaire</th>
                                    <th scope="col">Date</th>
                                    <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Array.isArray(storeAvis) && Array.isArray(store) && storeAvis.length > 0 ? (
                                    storeAvis.map((avis, index) => (
                                        <tr key={index}>
                                            <th scope="row">{index + 1}</th>
                                            <td>{avis.user && typeof avis.user === 'object' ? `${avis.user.nom} ${avis.user.prenom}` : 'N/A'}</td>
                                            <td>{avis.article && typeof avis.article === 'object' ? avis.article.nom : 'N/A'}</td>
                                            <td>
                                                {(() => {
                                                    const fullArticle = store.find(art => art._id === avis.article._id);
                                                    console.log("Article complet trouvé:", fullArticle);
                                                    return fullArticle && fullArticle.photo ? (
                                                        <img
                                                            src={`/uploads/${fullArticle.photo[0]}`}
                                                            alt="article"
                                                            width={30}
                                                            height={30}
                                                            onError={(e) => {
                                                                console.log("Erreur de chargement de l'image");
                                                                e.target.src = '/Logo/LogoMarque.jpg';
                                                                e.target.onerror = null;
                                                            }}
                                                        />
                                                    ) : (
                                                        <img src="/Logo/LogoMarque.jpg" alt="default" width={30} height={30} />
                                                    );
                                                })()}
                                            </td>
                                            <td>{avis.note || 'N/A'}</td>
                                            <td>{avis.commentaire || 'N/A'}</td>
                                            <td>{avis.createdAt ? new Date(avis.createdAt).toLocaleDateString('fr-FR') : 'N/A'}</td>
                                            <td>

                                                <button className="btn btn-warning btn-sm gap-2" onClick={() => updateAvis(avis._id)}><i className="bi bi-pen-fill"></i></button>
                                                <button className="btn btn-danger btn-sm" onClick={() => deleteAvis(avis._id)}><i className="bi bi-trash-fill"></i></button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr><td colSpan="8">Aucun avis trouvé</td></tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            )
            }
        </div >
    );
};

export default Dashboard;
