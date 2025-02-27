import {useEffect, useState} from 'react';

import { useParams,useNavigate, Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import URL from '../constant/api';

const Detail = () => {

    const [article, setArticle] = useState({});
    const [error, setError] = useState(null);

    const {id} = useParams();
    const navigate = useNavigate();
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
            setError( `${error.message}`, "Erreur lors de la suppression de l'article");
        }
    }
    

    if (error) {
        return <p>Erreur :{error}</p>
    }
    
    return(
        <>
            <h1>Détail de mon article : {article.nom}</h1>
            <h2>{article.nom}</h2>
            <p>{article.description}</p>
            <p>{article.prix} €</p>
            <p>{article.stock}</p>
            <button className="btn btn-danger" onClick={deleteArticle}>Supprimer</button>
            <Link to={`/update/${article._id}`} className="btn btn-info">Modifier</Link>
        </>
    )
}

export default Detail;