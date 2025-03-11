import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import URL from '../constant/api';
import { useDispatch, useSelector } from 'react-redux';
import Slider from '../components/Slider';


// importer les actions de redux
import * as ACTIONS from '../redux/reducers/article.reducer';


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

    if (loading) return <div className='text-center'>Chargement...</div>
    if (error) return <div className='text-center'>Erreur:{error}</div>

    return (
        <>
            
                <Slider />
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