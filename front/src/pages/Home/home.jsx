import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import URL from '../../constant/api';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';

// importation des styles
import styles from './Home.module.css';

// importation des components
import FormulaireContact from '../../components/Formulaire/FormulaireContact';
import Slider from '../../components/Slider/Slider';
import SearchBar from '../../components/SeachBar/SearchBar';
import BestSeller from '../../components/BestSeller/bestSeller';
import QuiSommesNous from '../../components/aPropos/QuiSommesNous';

// importer les actions de redux
import * as ACTIONS from '../../redux/reducers/article.reducer';



const Home = () => {
    const dispatch = useDispatch();

    const store = useSelector((state) => state.article.data);
    const loading = useSelector((state) => state.article.loading);
    const [error, setError] = useState(null);
    const notify = () => toast.success('Message envoyé avec succès!', { autoClose: 2500, position: "top-center" });
    console.log("store", store);


    useEffect(() => {

        const fetchArticles = async () => {

            dispatch(ACTIONS.FETCH_ARTICLE_START(store));
            console.log("Fetching articles...");
            try {
                const response = await fetch(URL.GETALL_ARTICLES,
                    {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                        }
                    }
                );
                console.log(response);

                // if (!response.ok) {
                //     throw new Error("Erreur lors de la récupération des articles");
                // }

                const data = await response.json();
                dispatch(ACTIONS.FETCH_ARTICLE_SUCCESS(data.articles));
                console.log("data", data);


            } catch (error) {
                setError(error.message);

            }
        };

        fetchArticles();
    }, []);

    if (loading) return <div className={styles.loading}><img src="/Logo/LogoMarque.jpg" alt="loading" />
        <p className={styles.loadingTest}>Chargement...</p>
    </div>

    if (error) return <div className='text-center'>Erreur:{error}</div>

    return (
        <>
            <ToastContainer />
            <Slider />
            <SearchBar />
            {/* <CategorieCircle /> */}
            <div id="categories" className={styles.categoriesContainer}>
                <div className={styles.blockCircle}>
                    <div className={styles.circle} >
                        <Link to="/poupees">
                            <img className={styles.imgCircle} src="/Poupee/poupeeLily1.jpg" alt="poupee métisse avec deux couettes, un ensemble orange et des chaussures orange" />
                        </Link>
                    </div>
                    <div className={styles.categorie}>
                        <p className={styles.categorieText}>Nos Poupées...</p>
                    </div>
                </div>
                <div className={styles.blockCircle}>
                    <div className={styles.circle} >
                        <Link to="/creations">
                            <img className={styles.imgCircle} src="/Noscreations/coeurSurprise.jpg" alt="3 Petits coeurs crochetés en laine rose " />
                        </Link>
                    </div>
                    <div className={styles.categorie}>
                        <p className={styles.categorieText}>Nos Créations...</p>
                    </div>
                </div>
                <div className={styles.blockCircle}>
                    <div className={styles.circle} >
                        <Link to="/anigurumi">
                            <img className={styles.imgCircle} src="/aniGurumi/krakinou3.png" alt="Pieuvre de couleur rose avec une pelotte de laine rose et un crochet" />
                        </Link>
                    </div>
                    <div className={styles.categorie}>
                        <p className={styles.categorieText}>Nos Anigurumi...</p>
                    </div>
                </div>
                <div className={styles.blockCircle}>
                    <div className={styles.circle} >
                        <Link to="/premiers_souvenirs">
                            <img className={styles.imgCircle} src="/PremiersSouvenirs/kitRose.jpg" alt="Kit naissance avec un hochet, un attache-tétine et une petite pieuvre" />
                        </Link>
                    </div>
                    <div className={styles.categorie}>
                        <p className={styles.categorieText}>Nos Premiers souvenirs...</p>
                    </div>
                </div>
            </div>
            <hr className={styles.hr} />
            <div className={styles.block}>
                <div className={styles.blockTitre}>
                    <h3 className={styles.h3}>Nos Best Sellers...</h3>
                    <div className={styles.blockIcon}>
                        <img style={{ width: '30px', height: '30px' }} src="/photoIcon/Vector.png" alt="" />
                    </div>
                </div>
            </div>
            <BestSeller />
            <hr className={styles.hr} />
            <div id="a-propos" className={styles.block}>
                <div className={styles.blockTitre}>
                    <h3 className={styles.h3}>A propos de nous...</h3>
                    <div className={styles.blockIcon}>
                        <img style={{ width: '30px', height: '30px' }} src="/photoIcon/logoId.png" alt="" />
                    </div>
                </div>
            </div>

            <QuiSommesNous />

            <hr className={styles.hr} />
            <div id="contact" className={styles.block}>
                <div className={styles.blockTitre}>
                    <h3 className={styles.h3}>Contactez Nous...</h3>
                    <div className={styles.blockIcon}>
                        <img style={{ width: '30px', height: '30px' }} src="/photoIcon/ContactezNous.png" alt="" />
                    </div>
                </div>
            </div>
            
            <FormulaireContact />
            
           
        </>
    );
};


export default Home;