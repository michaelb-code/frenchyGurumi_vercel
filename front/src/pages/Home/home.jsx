import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import URL from '../../constant/api';
import { useDispatch, useSelector } from 'react-redux';
import Slider from '../../components/Slider/Slider';
import SearchBar from '../../components/SeachBar/SearchBar';
import './Home.css';
// importer les actions de redux
import * as ACTIONS from '../../redux/reducers/article.reducer';


const Home = () => {
    const dispatch = useDispatch();

    const store = useSelector((state) => state.article.data);
    const loading = useSelector((state) => state.article.loading);
    const [error, setError] = useState(null);
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

    if (loading) return <div className='loading'><img src="/Logo/LogoMarque.jpg" alt="loading" />
        <p className="loadingTest">Chargement...</p>
    </div>

    if (error) return <div className='text-center'>Erreur:{error}</div>

    return (
        <>
            <Slider />
            <SearchBar />
            {/* <CategorieCircle /> */}
            <div className="categories-container">
                <div className="blockCircle">
                    <div className="circle" >
                        <Link to="/poupees">
                            <img className="img-circle" src="/Poupee/poupeeLily1.jpg" alt="poupee métisse avec deux couettes, un ensemble orange et des chaussures orange" />
                        </Link>
                    </div>
                    <div className="categorie">
                        <p className="categorieText">Nos Poupées...</p>
                    </div>
                </div>
                <div className="blockCircle">
                    <div className="circle" >
                        <Link to="/creations">
                            <img className="img-circle" src="/Noscreations/coeurSurprise.jpg" alt="3 Petits coeurs crochetés en laine rose " />
                        </Link>
                    </div>
                    <div className="categorie">
                        <p className="categorieText">Nos Créations...</p>
                    </div>
                </div>
                <div className="blockCircle">
                    <div className="circle" >
                        <Link to="/anigurumi">
                            <img className="img-circle" src="/aniGurumi/krakinou3.png" alt="Pieuvre de couleur rose avec une pelotte de laine rose et un crochet" />
                        </Link>
                    </div>
                    <div className="categorie">
                        <p className="categorieText">Nos Anigurumi...</p>
                    </div>
                </div>
                <div className="blockCircle">
                    <div className="circle" >
                        <Link to="/premiersSouvenirs">
                            <img className="img-circle" src="/PremiersSouvenirs/kitRose.jpg" alt="Kit naissance avec un hochet, un attache-tétine et une petite pieuvre" />
                        </Link>
                    </div>
                    <div className="categorie">
                        <p className="categorieText">Nos Premiers souvenirs...</p>
                    </div>
                </div>
            </div>
            <hr />
            <div className="block">
                <div className="blockTitre">
                    <h3>Nos Best Sellers...</h3>
                    <div className="blockIcon">
                        <img style={{ width: '30px', height: '30px' }} src="/photoIcon/Vector.png" alt="" />
                    </div>
                </div>
            </div>
            <div className="container py-4">
                <h1 className="text-center mb-4">Bienvenue sur FrenchyGurumi</h1>
                <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                    {Array.isArray(store) && store.length > 0 ? store.map((article) => (
                        <div key={article._id} className="col">
                            <div className="card h-100">
                                <h2 className="card-title h5">Marque : {article.marque}</h2>
                                <Link to={`/detail/${article._id}`}>
                                    <h3 className="card-subtitle mb-2 text-muted h6">Nom : {article.nom}</h3>
                                </Link>
                                <p className="card-text">Description : {article.description}</p>
                                <p className="card-text">Prix : {article.prix}</p>
                                <p className="card-text">Stock : {article.stock}</p>
                                <span className="badge bg-primary">Catégorie : {article.categorie}</span>
                            </div>
                        </div>
                    )) : <p>Aucun article trouvé</p>}
                </div>
            </div>
        </>
    );
};


export default Home;