import { useParams, useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from 'react';
import URL from '../constant/api'

const Update = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const imgInput = ['img', 'img1', 'img2', 'img3', 'img4'];

    const [article, setArticle] = useState({
        marque: '',
        nom: '',
        categorie: '',
        description: '',
        prix: '',
        photo: {
            img: '',
            img1: '',
            img2: '',
            img3: '',
            img4: '',
        },
        status: '',
        stock: ''

    });

    useEffect(() => {
        const fetchArticle = async () => {
            try {
                const response = await fetch(`${URL.FETCH_ARTICLE}/${id}`);
                const data = await response.json();
                setArticle(data.article);
            } catch (error) {
                console.error(error.message);
            }
        };
        fetchArticle();
    }, [id]);

    const handleChange = (e) => {

        const { name, value } = e.target;

        //Traitement pour les images
        if (name.startsWith('img')) {
            setArticle(prev => ({
                ...prev,// Garde tous les champs sauf photo
                photo: {
                    ...prev.photo,// Garde tous les champs sauf [name]
                    [name]: value
                }
            }));

        } else {
            setArticle(prev => ({
                ...prev, //Garde toutes les propriétés deja existantes
                [name]: value //Met a jour le champ modifié
            }));
        }

    }

    return (
        <div>
            <h1>Modification de l'article {id}</h1>
        </div>
    )
}

export default Update