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
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [currentImgIndex, setCurrentImgIndex] = useState(0);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

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
                console.log(reponse);

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

        fetchArticle();
    }, [id]);

    const deleteArticle = async () => {
        try {
            const response = await fetch(`${URL.DELETE_ARTICLE}/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': "application/json"
                }
            });

            if (response.status === 200) {
                toast.success('Article supprimé avec succés!', { position: "top-center" });
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
    const openDeleteModal = () => {
        setShowDeleteModal(true);
    };

    // Fonction pour fermer la modale de confirmation
    const closeDeleteModal = () => {
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
                <p className={styles.articleTagline}>"Un article à découvrir,<br />une nouvelle tendance à découvrir..."</p>
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
                        //cnnecté = ajout au panier + notification de succès
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
    </>
);
};

export default Detail;