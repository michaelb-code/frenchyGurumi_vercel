import { useEffect, useState } from 'react';

import { useParams, useNavigate, Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import URL from '../../constant/api';
import styles from './Detail.module.css';
import { useCart } from '../../context/CartContext'
import { ToastContainer, toast } from 'react-toastify';
import { useAuth } from '../../context/AuthContext';



const Detail = () => {
    const [article, setArticle] = useState({});
    const [avis, setAvis] = useState([]);
    const [articleLoading, setArticleLoading] = useState(true);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [currentImgIndex, setCurrentImgIndex] = useState(0);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showAvisForm, setShowAvisForm] = useState(false);
    const [avisToDelete, setAvisToDelete] = useState(null);

    const [newAvis, setNewAvis] = useState({
        nom: '',
        rating: 5,
        comment: '',
    });

    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const notify = () => toast.success('Article ajouté au panier !', { autoClose: 2500, position: "top-center" });
    const { auth } = useAuth();

    useEffect(() => {
        const fetchArticle = async () => {
            try {
                const reponse = await fetch(`${URL.FETCH_ARTICLE}/${id}`, {
                    headers: {
                        'Content-Type': "application/json"
                    }
                });
                console.log("les reponses:", reponse);

                if (!reponse.ok)
                    throw new Error("Erreur lors de la récupération de l'article");

                const data = await reponse.json();
                setArticle(data.article);
                setError(null);
                setLoading(false);

            } catch (error) {
                setError(error.message);
                setLoading(false);

            }
            setShowDeleteModal(false);
        };

        const fetchAvis = async () => {
            try {
                const response = await fetch(`${URL.GET_ALL_AVIS}`, {
                    headers: {
                        'Content-Type': "application/json"
                    }
                });
                console.log("les avis:", response);

                if (!response.ok)
                    throw new Error("Erreur lors de la récupération des avis");

                const data = await response.json();
                console.log("Donnees des avis:", data.avis);

                // filtre les avis pour ne garder que les avis de mon article
                // Vérifie si article est un objet ou un ID
                const avisFiltered = data.avis.filter(avis => {
                    if (avis.article && typeof avis.article === 'object') {
                        return avis.article._id === id;
                    } else {
                        return avis.article === id || avis.articleId === id;
                    }
                });

                console.log("Avis filtré pour l'article", id, ":", avisFiltered);
                setAvis(avisFiltered);
                setError(null);
                setLoading(false);

            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchArticle();
        fetchAvis();
    }, [id]);

    // Fonction pour gerer la soumission du formulaire d'avis
    const handleAvisSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log("Données du formulaire à envoyer:", newAvis);
            const avisData = {
                article: id,
                nom: newAvis.nom,
                rating: parseInt(newAvis.rating),
                comment: newAvis.comment,
                user: auth.data._id
            };
            console.log("données formulaires pour l'api :", avisData);

            const response = await fetch(`${URL.CREATE_AVIS}`, {
                method: 'POST',
                headers: {
                    'Content-Type': "application/json"
                },
                body: JSON.stringify(avisData)
            });

            console.log("response de l'api :", response);


            if (!response.ok) {
                const errorText = await response.text();
                console.error("texte d'erreur:", errorText)
                throw new Error("Erreur lors de la création de l'avis");
            }

            const data = await response.json();
            console.log("Avis créé avec succès, données complétées:", data);

            // Ajouter le nouvel avis à la liste des avis
            // Vérifier la structure de la réponse
            const newAvisData = data.avis || data.data || data;
            console.log("Nouvel avis à ajouter:", newAvisData);

            setAvis([...avis, newAvisData]);

            // Réinitialiser le formulaire et le cacher
            setNewAvis({
                nom: '',
                rating: 5,
                comment: ''
            });
            setShowAvisForm(false);

            // Afficher un message de succès
            toast.success('Votre avis a été ajouté avec succès !', { position: "top-center" });

        } catch (error) {
            console.error("Erreur détaillée lors de la création de l'avis:", error);
            toast.error(`Une erreur est survenue: ${error.message}`, { position: "top-center" });
        }
    };

    const deleteArticle = async () => {
        try {
            const response = await fetch(`${URL.DELETE_ARTICLE}/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': "application/json"
                }
            });

            if (response.status === 200) {
                toast.success('Article supprimé avec succès!', { position: "top-center" });
                setTimeout(() => {
                    navigate('/');
                }, 2500);
            }

        } catch (error) {
            setError(error.message);
        }
        setShowDeleteModal(false);
    };

    const handleDeleteAvis = async (avisId) => {
        try {
            const response = await fetch(`${URL.DELETE_AVIS}/${avisId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': "application/json",
                    'Authorization': `Bearer ${auth.data.token}`
                }
            });

            if (response.status === 200) {
                toast.success('Avis supprimé avec succès!', { position: "top-center" });
                setTimeout(() => {
                    navigate('/');
                }, 2500);
            }
        } catch (error) {
            setError(error.message);
        }
        setShowDeleteModal(false);
    };

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

    const decreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    const increaseQuantity = () => {
        if (quantity < article.stock) {
            setQuantity(quantity + 1);
        }
    };

    // Fonctions pour pouvoir naviguer entre les images
    const goToPreviousImage = () => {
        if (article.photo && article.photo.length > 0) {
            setCurrentImgIndex((prev) =>
                prev === 0 ? article.photo.length - 1 : prev - 1
            );
        }
    };

    const goToNextImage = () => {
        if (article.photo && article.photo.length > 0) {
            setCurrentImgIndex((prev) =>
                prev === article.photo.length - 1 ? 0 : prev + 1
            );
        }
    };

    // Fonction pour pouvoir sélectionner une image spécifique
    const selectImage = (index) => {
        setCurrentImgIndex(index);
    };



    if (error) {
        return <div className={styles.errorMessage}>Erreur : {error}</div>
    }

    if (loading) return <div className={styles.loading}><img src="/Logo/LogoMarque.jpg" alt="loading" />
        <p className={styles.loadingTest}>Chargement...</p>
    </div>

    return (
        <>
            <div className={styles.container}>
                <div className={styles.imageGallery}>
                    {article.photo && article.photo.length > 0 ? (
                        <>
                            <div className={styles.mainImageContainer}>
                                {article.photo.length > 1 && (
                                    <button
                                        className={`${styles.navButton} ${styles.prevButton}`}
                                        onClick={goToPreviousImage}
                                    >
                                        &lt;
                                    </button>
                                )}

                                <img
                                    src={article.photo[currentImgIndex]}
                                    alt={article.nom}
                                    className={styles.mainImage}
                                />

                                {article.photo.length > 1 && (
                                    <button
                                        className={`${styles.navButton} ${styles.nextButton}`}
                                        onClick={goToNextImage}
                                    >
                                        &gt;
                                    </button>
                                )}
                            </div>

                            {article.photo.length > 1 && (
                                <div className={styles.thumbnailGallery}>
                                    {article.photo.map((photo, index) => (
                                        <img
                                            key={index}
                                            src={photo}
                                            alt={`${article.nom} - vignette ${index + 1}`}
                                            className={`${styles.thumbnail} ${index === currentImgIndex ? styles.activeThumbnail : ''}`}
                                            onClick={() => selectImage(index)}
                                        />
                                    ))}
                                </div>
                            )}
                        </>
                    ) : (
                        <div className={styles.mainImage}>Image non disponible</div>
                    )}
                </div>

                <div className={styles.articleInfo}>
                    <h1 className={styles.articleName}>{article.nom}</h1>
                    <p className={styles.articleTagline}>"Un article à découvrir, une nouvelle tendance à découvrir..."</p>
                    <p className={styles.articleDescription}>{article.description}</p>

                    <p className={styles.articlePrice}>
                        {article.prix},00 € <span className={styles.priceUnit}>/article</span>
                    </p>

                    <div className={styles.quantitySelector}>
                        <button onClick={decreaseQuantity} className={styles.quantityBtn}>-</button>
                        <input
                            type="text"
                            value={quantity}
                            readOnly
                            className={styles.quantityInput}
                        />
                        <button onClick={increaseQuantity} className={styles.quantityBtn}>+</button>
                    </div>

                    <div className={styles.actionButtons}>
                        <button className={styles.buyButton} onClick={() => {
                            // Vérifier si l'utilisateur est connecté
                            if (auth && auth.data) {
                                // Rediriger vers la page de paiement si connecté
                                navigate('/paiement', { state: { article, quantity } });
                                return;
                            } else {
                                navigate('/login');
                            }
                        }}>
                            Acheter
                            <span>💳</span>
                        </button>
                        <button className={styles.addButton} onClick={() => {
                            // Vérifier si l'utilisateur est connecté
                            if (!auth || !auth.data) {
                                // Rediriger vers la page de connexion si non connecté
                                navigate('/login');
                                return;
                            }
                            //connecté = ajout au panier + notification de succès
                            const articleWithQuantity = { ...article, quantity };
                            addToCart(articleWithQuantity);
                            notify()
                        }}>
                            Ajouter
                            <span>🛒</span>
                        </button>
                        <ToastContainer />
                    </div>

                    <div className={styles.deliveryInfo}>
                        <div className={styles.deliveryRow}>
                            <span className={styles.deliveryIcon}>🛒</span>
                            <span className={styles.deliveryTitle}>Livraison</span>
                            <span className={styles.deliveryText}>Sous 4/5 jours ouvrés</span>
                        </div>
                        <div className={styles.deliveryRow}>
                            <span className={styles.deliveryIcon}>🔄</span>
                            <span className={styles.deliveryTitle}>Retour*</span>
                            <span className={styles.deliveryText}>Sous 14 jours</span>
                        </div>
                        {auth && auth.data && auth.data.role === 'admin' && (
                            <div className={styles.adminButtons}>
                                <button className={styles.deleteButton} onClick={openDeleteModal}>Supprimer</button>
                                <Link to={`/update/${article._id}`} className={styles.editButton}>Modifier</Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            {/* Modale de confirmation de suppression */}
            {showDeleteModal && (
                <div className={styles.modalOverlay}>
                    <div className={styles.modal}>
                        <div className={styles.modalHeader}>
                            <h2>Confirmation de suppression</h2>
                            <button className={styles.closeButton} onClick={closeDeleteModal}>&times;</button>
                        </div>
                        <div className={styles.modalBody}>
                            <p>Vous voulez supprimer l'article <strong>{article.nom}</strong> ?</p>
                            <p>Cette action est irréversible.</p>
                        </div>
                        <div className={styles.modalFooter}>
                            <button className={styles.cancelButton} onClick={closeDeleteModal}>Annuler</button>
                            <button className={styles.confirmButton} onClick={deleteArticle}>Confirmer</button>
                        </div>
                    </div>
                </div>
            )}
            {/* Section des avis */}
            <div className={styles.avisSection}>
                <h3 className={styles.avisTitle}>Avis clients</h3>
                {avis.length > 0 ? (
                    <div className="row">
                        {avis.map((avis) => (
                            <div key={avis._id} className="col-md-6 mb-3">
                                <div className={styles.avisCard}>
                                    <div className={styles.avisHeader}>
                                        <h5 className={styles.avisAuthor}>
                                            {/* Gestion des diffu00e9rentes structures possibles pour l'utilisateur */}
                                            {avis.user && typeof avis.user === 'object'
                                                ? `${avis.user.nom || ''} ${avis.user.prenom || ''}`.trim()
                                                : avis.nom || 'Utilisateur'}
                                        </h5>
                                        <small className={styles.avisDate}>
                                            {(avis.createdAt || avis.date)
                                                ? new Date(avis.createdAt || avis.date).toLocaleDateString()
                                                : "Date non disponible"}
                                        </small>
                                    </div>
                                    <div className={styles.avisRating}>
                                        {[...Array(5)].map((_, i) => (
                                            <i
                                                key={i}
                                                className={`bi ${i < (avis.note || avis.rating || 0) ? 'bi-star-fill' : 'bi-star'}`}
                                            ></i>
                                        ))}
                                    </div>
                                    <p className={styles.avisComment}>{avis.commentaire || avis.comment || "Pas de commentaire"}</p>
                                    <div className={styles.avisActions}>
                                        <button className={styles.avisDeleteBtn} onClick={() => openDeleteModal(avis._id)}>
                                            <i className="bi bi-trash"></i> 
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className={styles.noAvis}>Aucun avis pour cet article</div>
                )}

                {auth && auth.data && (
                    <>
                        <div className="mt-4">
                            <button className={styles.addAvisBtn} onClick={() => {
                                if (auth && auth.data) {
                                    setNewAvis({
                                        ...newAvis,
                                        nom: `${auth.data.nom || ''} ${auth.data.prenom || ''}`.trim()
                                    });
                                }
                                setShowAvisForm(!showAvisForm)
                            }}>
                                {showAvisForm ? 'Annuler' : 'Laisser un avis'}
                            </button>
                        </div>
                        {showAvisForm && (
                            <form onSubmit={handleAvisSubmit} className={styles.avisForm}>
                                <h4 className={styles.avisFormTitle}>Partagez votre expérience</h4>
                                <div className={styles.formGroup}>
                                    <label htmlFor="avisNom" className={styles.formLabel}>Nom</label>
                                    <input
                                        type="text"
                                        className={styles.formInput}
                                        id="avisNom"
                                        value={newAvis.nom}
                                        onChange={(e) => setNewAvis({ ...newAvis, nom: e.target.value })}
                                        placeholder="Votre nom"
                                        required
                                    />
                                </div>
                                <div className={styles.formGroup}>
                                    <label htmlFor="avisNote" className={styles.formLabel}>Note</label>
                                    <select
                                        className={styles.formSelect}
                                        id="avisNote"
                                        value={newAvis.rating}
                                        onChange={(e) => setNewAvis({ ...newAvis, rating: parseInt(e.target.value) })}
                                    >
                                        <option value="1">1 étoile</option>
                                        <option value="2">2 étoiles</option>
                                        <option value="3">3 étoiles</option>
                                        <option value="4">4 étoiles</option>
                                        <option value="5">5 étoiles</option>
                                    </select>
                                </div>
                                <div className={styles.formGroup}>
                                    <label htmlFor="avisCommentaire" className={styles.formLabel}>Commentaire</label>
                                    <textarea
                                        className={styles.formTextarea}
                                        id="avisCommentaire"
                                        value={newAvis.comment}
                                        onChange={(e) => setNewAvis({ ...newAvis, comment: e.target.value })}
                                        placeholder="Votre avis nous interesse"
                                        rows="4"
                                        required
                                    ></textarea>
                                </div>
                                <div className={styles.formActions}>
                                    <button type="submit" className={styles.submitBtn}>Envoyer</button>
                                    <button type="button" className={styles.cancelBtn} onClick={() => setShowAvisForm(false)}>Annuler</button>
                                </div>
                            </form>
                        )}
                    </>
                )}
            </div>
        </>
    );
};

export default Detail;