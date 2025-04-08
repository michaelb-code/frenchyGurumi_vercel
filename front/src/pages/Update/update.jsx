import { useParams, useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from 'react';
import URL from '../../constant/api'
import styles from './Update.module.css';
import {ToastContainer, toast} from 'react-toastify';

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
        photo: [],
        status: true,
        stock: 0
    });

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [existingImages, setExistingImages] = useState([]);
    const notify = () => toast.success('Article mis à jour avec succès', { autoClose: 2500, position: "top-center" });


    useEffect(() => {
        const fetchArticle = async () => {
            try {
                setLoading(true);
                const response = await fetch(`${URL.FETCH_ARTICLE}/${id}`, {
                    headers: {
                        'Content-Type': "application/json"
                    }
                });

                if (!response.ok) {
                    throw new Error("Erreur lors de la récupération de l'article");
                }

                const data = await response.json();
                
                // On formate les données reçues pour correspondre à notre state
                setArticle({
                    marque: data.article.marque || '',
                    nom: data.article.nom || '',
                    categorie: data.article.categorie || '',
                    description: data.article.description || '',
                    prix: data.article.prix?.toString() || '',
                    photo: [],  //pour pouvoir uplod une nouvelle image
                    status: data.article.status || true,
                    stock: data.article.stock || 0
                });

                // On stocke les URLs des images existantes
                if (data.article.photo && data.article.photo.length > 0) {
                    setExistingImages(data.article.photo);
                }

                setError(null);
            } catch (error) {
                setError(error.message);
                console.error("Erreur lors de la récupération de l'article:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchArticle();
    }, [id]);

    const handleChange = (e) => {
        const { name, value, files, checked, type } = e.target;

        if (name.startsWith('img')) {
            if (files && files.length > 0) {
                setArticle(prev => ({
                    ...prev,
                    photo: [...prev.photo, files[0]]
                }));
            }
        } else if (type === 'checkbox') {
            setArticle(prev => ({ ...prev, [name]: checked }));
        } else {
            setArticle(prev => ({ ...prev, [name]: value }));
        }
    };

    const validateForm = () => {
        const requiredFields = [
            { name: 'marque', label: 'Marque' },
            { name: 'nom', label: 'Nom' },
            { name: 'categorie', label: 'Catégorie' },
            { name: 'description', label: 'Description' },
            { name: 'prix', label: 'Prix' }
        ];
        
        for (const field of requiredFields) {
            if (!article[field.name] || article[field.name].trim() === '') {
                alert(`Le champ ${field.label} est obligatoire`);
                return false;
            }
        }
        
        if (isNaN(parseInt(article.prix)) || parseInt(article.prix) <= 0) {
            alert('Le prix doit être un nombre positif');
            return false;
        }
        
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Mise à jour de l'article", article);

        if (!validateForm()) {
            return;
        }

        const formData = new FormData();

        // Ajout des champs texte
        formData.append('marque', article.marque);
        formData.append('nom', article.nom);
        formData.append('categorie', article.categorie);
        formData.append('description', article.description);
        formData.append('prix', parseInt(article.prix));
        formData.append('status', Boolean(article.status));
        formData.append('stock', parseInt(article.stock));

        // Ajout des nouvelles images
        article.photo.forEach((image) => {
            console.log(`Ajout de l'image au formdata`, image.name);
            formData.append('photo', image);
        });

        // Ajout des URLs des images existantes que l'on souhaite conserver
        formData.append('existingImages', JSON.stringify(existingImages));

        try {
            console.log("Envoi de la requête via url", `${URL.UPDATE_ARTICLE}/${id}`);
            const response = await fetch(`${URL.UPDATE_ARTICLE}/${id}`, {
                method: 'PUT',
                body: formData
            });

            console.log("Response statut:", response.status, response.statusText);

            if (!response.ok) {
                throw new Error(`Erreur lors de la mise à jour de l'article : ${response.status}`);
            }

            const data = await response.json();
            console.log("Article mis à jour avec succès", data);
            notify();
            setTimeout(() => {
                navigate(`/detail/${id}`);
            }, 3000);

        } catch (error) {
            console.error("Erreur lors de la mise à jour de l'article:", error.message);
            setError(error.message);
        }
    };



    if (loading) {
        return <div className={styles.loadingContainer}>Chargement...</div>;
    }

    if (error) {
        return <div className={styles.errorMessage}>Erreur : {error}</div>;
    }

    return (
        <div className={styles.container}>
            <div className={styles.formContainer}>
                <h2 className={styles.heading}>Modifier l'article</h2>
                
                <form onSubmit={handleSubmit}>
                    <div>
                        <label className={styles.label}>Marque</label>
                        <input
                            type="text"
                            name="marque"
                            value={article.marque}
                            onChange={handleChange}
                            placeholder="Marque de l'article"
                            required
                            className={styles.input}
                        />
                    </div>

                    <div>
                        <label className={styles.label}>Nom</label>
                        <input
                            type="text"
                            name="nom"
                            value={article.nom}
                            onChange={handleChange}
                            placeholder="Nom de l'article"
                            required
                            className={styles.input}
                        />
                    </div>

                    <div>
                        <label className={styles.label}>Description</label>
                        <input
                            type="text"
                            name="description"
                            value={article.description}
                            onChange={handleChange}
                            placeholder="Description de l'article"
                            required
                            className={styles.input}
                        />
                    </div>

                    <div>
                        <label className={styles.label}>Catégorie</label>
                        <input
                            type="text"
                            name="categorie"
                            value={article.categorie}
                            onChange={handleChange}
                            placeholder="Catégorie de l'article"
                            required
                            className={styles.input}
                        />
                    </div>

                    <div>
                        <label className={styles.label}>Prix (€)</label>
                        <input
                            type="number"
                            name="prix"
                            value={article.prix}
                            onChange={handleChange}
                            placeholder="Prix de l'article"
                            min="0"
                            step="0.01"
                            required
                            className={styles.input}
                        />
                    </div>

                    <div>
                        <label className={styles.label}>Ajouter des images</label>
                        {imgInput.map((imgName, index) => (
                            <div key={imgName} className={styles.imageGroup}>
                                <label className={styles.imageLabel}>
                                    {`Image ${index + 1}`}
                                </label>
                                <input
                                    type="file"
                                    name={imgName}
                                    onChange={handleChange}
                                    className={`${styles.fileInput} form-control`}
                                />
                            </div>
                        ))}
                    </div>

                    <div>
                        <label className={styles.label}>Stock</label>
                        <input
                            type="number"
                            name="stock"
                            value={article.stock}
                            onChange={handleChange}
                            placeholder="Stock disponible"
                            required
                            className={styles.input}
                        />
                    </div>

                    <div className={styles.checkboxContainer}>
                        <input
                            type="checkbox"
                            name="status"
                            checked={article.status}
                            onChange={handleChange}
                            className={styles.checkbox}
                        />
                        <label>Article disponible</label>
                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary w-100" style={{ fontFamily: 'inter, sans-serif' }}
                    >
                        Mettre à jour l'article
                    </button>
                    <ToastContainer />
                </form>
            </div>
        </div>
    );
};

export default Update;