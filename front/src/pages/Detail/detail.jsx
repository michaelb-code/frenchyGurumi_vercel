import { useEffect, useState } from 'react';

import { useParams, useNavigate, Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import URL from '../../constant/api';
import styles from './Detail.module.css';

const Detail = () => {
    const [article, setArticle] = useState({});
    const [error, setError] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [currentImgIndex, setCurrentImgIndex] = useState(0);

    const { id } = useParams();
    const navigate = useNavigate();

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
                    throw new Error("Erreur lors de la recuperation de l'article");

                const data = await reponse.json();
                setArticle(data.article);
                setError(null);

            } catch (error) {
                setError(error.message);
            }
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

            if (response.status === 200) navigate('/');

        } catch (error) {
            setError(`${error.message}`, "Erreur lors de la suppression de l'article");
        }
    }

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

    // Fonction pour pourvoir  sélectionner une image spécifique
    const selectImage = (index) => {
        setCurrentImgIndex(index);
    };

    if (error) {
        return <div className={styles.errorMessage}>Erreur : {error}</div>
    }

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
                    {/* <p className={styles.articleBrand}>Marque: {article.marque}</p> */}
                    <p className={styles.articleDescription}>{article.description}</p>

                    <p className={styles.articlePrice}>
                        {article.prix},00€ <span className={styles.priceUnit}>/article</span>
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
                        <button className={styles.buyButton}>
                            Acheter
                            <span>💳</span>
                        </button>
                        <button className={styles.addButton}>
                            Ajouter
                            <span>🛒</span>
                        </button>
                    </div>

                    <div className={styles.deliveryInfo}>
                        <div className={styles.deliveryRow}>
                            <span className={styles.deliveryIcon}>🚚</span>
                            <span className={styles.deliveryTitle}>Livraison</span>
                            <span className={styles.deliveryText}>Sous 4/5 jours ouvrés • 5,00€</span>
                        </div>
                        <div className={styles.deliveryRow}>
                            <span className={styles.deliveryIcon}>↩️</span>
                            <span className={styles.deliveryTitle}>Retour*</span>
                            <span className={styles.deliveryText}>Sous 14 jours</span>
                        </div>
                    </div>

                    <div className={styles.adminButtons}>
                        <button className={styles.deleteButton} onClick={deleteArticle}>Supprimer</button>
                        <Link to={`/update/${article._id}`} className={styles.editButton}>Modifier</Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Detail;