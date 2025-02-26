import {useEffect, useState} from 'react';

import { useParams } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import {URL} from '../constant/api';

const Detail = () => {

    const [article, setArticle] = useState({});
    const [error, setError] = useState(null);


    const {id} = useParams()
    // console.log(id);
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

    if (error) {
        return <p>Erreur :{error}</p>
    }
    
    return(
        <>
            <h1>Detail de mon article : {article.nom}</h1>
            <h2>{article.nom}</h2>
            <p>{article.description}</p>
            <p>{article.prix} €</p>
            <p>{article.stock}</p>
        </>
    )
}

export default Detail;