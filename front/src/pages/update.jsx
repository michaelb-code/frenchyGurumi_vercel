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

        const { name, value, files } = e.target;

        //Traitement pour les images
        if (name.startsWith('img')) {
            setArticle(prev => ({
                ...prev,// Garde tous les champs sauf photo
                photo: {
                    ...prev.photo,// Garde tous les champs sauf [name]
                    [name]: files ? files[0] : ''
                }
            }));

        } else {
            setArticle(prev => ({
                ...prev, //Garde toutes les propriétés deja existantes
                [name]: value //Met a jour le champ modifié
            }));
        }

    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("Marque", article.marque)
        formData.append("Nom", article.nom)
        formData.append("Categorie", article.categorie)

        formData.append("Description", article.description)
        formData.append("Prix", parseInt(article.prix))
        formData.append("Stock", parseInt(article.stock))
        formData.append("Status", article.status)

        try {
            const response = await fetch(`${URL.UPDATE_ARTICLE}/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: formData
            });

            if (!response.ok) {
                throw new Error(`Erreur lors de la modification de l'article : ${response.status}`);
            }

            const data = await response.json();
            console.log("Article modifié", data);
            navigate('/');
        } catch (error) {
            console.error(error.message);
        }
    }

    return (
        <div>
            <h1>Modifier l'article {article.nom}</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Marque</label>
                    <input type="text" name="marque" value={article.marque} onChange={handleChange} />
                </div>
                <div>
                    <label>Nom</label>
                    <input type="text" name="nom" value={article.nom} onChange={handleChange} />
                </div>
                <div>
                    <label>Categorie</label>
                    <input type="text" name="categorie" value={article.categorie} onChange={handleChange} />
                </div>
                <div>
                    <label>Description</label>
                    <input type="text" name="description" value={article.description} onChange={handleChange} />
                </div>
                <div>
                    <label>Prix</label>
                    <input type="number" name="prix" value={article.prix} onChange={handleChange} />
                </div>
                <div>
                    <label>Stock</label>
                    <input type="number" name="stock" value={article.stock} onChange={handleChange} />
                </div>
                <div>
                    <label>Status</label>
                    <input type="text" name="status" value={article.status} onChange={handleChange} />
                </div>
                <button type="submit">Mettre a jour</button>
            </form>
        </div>
    )
}

export default Update