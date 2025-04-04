import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import URL from '../../constant/api';
import * as ACTIONS from '../../redux/reducers/bestSeller.reducer';
import styles from './BestSeller.module.css';

const BestSeller = () => {
    const { data: articles, loading, error } = useSelector((state) => state.bestSeller);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchBestSellerArticle = async () => {
            dispatch(ACTIONS.FETCH_BESTSELLER_START());
            try {
                const response = await fetch(URL.GET_ALL_BEST_SELLERS);
                const data = await response.json();

                dispatch(ACTIONS.FETCH_BESTSELLER_SUCCESS(data));
            } catch (error) {
                dispatch(ACTIONS.FETCH_BESTSELLER_ERROR(error.message));
            }
        };
        fetchBestSellerArticle();
    }, [dispatch]);

    if (loading) return (
        <div className={styles.loading}>
            <img src="/Logo/LogoMarque.jpg" alt="loading" />
            <p className={styles.loadingText}>Chargement...</p>
        </div>
    );
    if (error) return <div>Error: {error}</div>;
    if (!articles || articles.length === 0) return <div>No articles found</div>;

    return (
        <div className={`${styles.container} container mt-4`}>
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-5 g-2">
                {Array.isArray(articles) && articles.map((article) => (
                    <div key={article._id} className="col">
                        <div className={styles.card}>
                            <img
                                src={article.photo[0]}
                                className={styles.cardImage}
                                alt={article.nom}
                            />
                            <div className={styles.cardBody}>
                                <div className={styles.cardHeader}>
                                    <h5 className={styles.cardTitle}>{article.nom}</h5>

                                    <p className={styles.price}>{article.prix}€</p>
                                </div>
                                <p className={styles.cardText}>
                                    {article.description.split('.')[0]}.
                                </p>
                                <a
                                    href={`/detail/${article._id}`}
                                    className={styles.btn}
                                >
                                    Voir l'article
                                </a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default BestSeller