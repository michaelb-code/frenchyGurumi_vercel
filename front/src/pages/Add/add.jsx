import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import URL from '../../constant/api';
import { useNavigate } from 'react-router-dom';
import styles from './Add.module.css';


const AddArticle = () => {
    const navigate = useNavigate();

    const imgInput = ['img', 'img1', 'img2', 'img3', 'img4'];

    // state avec un objet article vide 
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
    // État pour gérer les alertes
    const [messageAlerte, setMessageAlerte] = useState('');
    const [typeAlerte, setTypeAlerte] = useState('success');
    const [showAlert, setShowAlert] = useState(false);

    // Fonction pour afficher une alerte
    const showAlertMessage = (message, type) => {
        setMessageAlerte(message);
        setTypeAlerte(type);
        setShowAlert(true);

        // Masquer l'alerte après 5 secondes
        setTimeout(() => {
            setShowAlert(false);
        }, 5000);
    };

    const handleChange = (e) => {

        const { name, value, files } = e.target;

        if (name.startsWith('img')) {
            setArticle(prev => ({
                ...prev,

                photo: files ? [...prev.photo, files[0]] : prev.photo,
            }))

        } else {

            setArticle((prev) => ({ ...prev, [name]: value }));
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
        console.log("soumission du formulaire", article);

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

        article.photo.forEach((image, index) => {
            console.log(`ajout de limage ${index} au formdata`, image.name);

            formData.append('photo', image);

        });

        try {
            console.log("Envoi de la requête via url", URL.CREATE_ARTICLE);
            const response = await fetch(URL.CREATE_ARTICLE, {
                method: 'POST',
                body: formData
            });

            console.log("Response statut:", response.status, response.statusText);
            console.log("Response headers:", [...response.headers.entries()]);

            if (!response.ok) {
                throw new Error(`Erreur lors de l'ajout de l'article : ${response.status}`);
            }

            const data = await response.json();
            console.log("Article ajouté avec succès", data);
            showAlertMessage('Article ajouté avec succès', 'success');
            setTimeout(() => {
                navigate('/');
            }, 3000);

        } catch (error) {
            console.error("Erreur lors de l'ajout de l'article:", error.message);
            showAlertMessage("Erreur lors de l'ajout de l'article", 'danger');
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.formContainer}>
                <h2 className={styles.heading}>Ajouter un article</h2>
                
                
                
                <form onSubmit={handleSubmit}>
                    <div>
                        <label className={styles.label}>Marque</label>
                        <input
                            type="text"
                            name="marque"
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
                            onChange={handleChange}
                            placeholder="Prix de l'article"
                            min="0"
                            step="0.01"
                            required
                            className={styles.input}
                        />
                    </div>

                    <div>
                        <label className={styles.label}>Images</label>
                        {imgInput.map((imgName, index) => (
                            <div key={imgName} className={styles.imageGroup}>
                                <label className={styles.imageLabel}>
                                    {index === 0 ? "Image principale" : `Image ${index}`}
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
                            onChange={e => setArticle(prev => ({ ...prev, status: e.target.checked }))}
                            checked={article.status}
                            className={styles.checkbox}
                        />
                        <label>Article disponible</label>
                    </div>
                    {showAlert && (
                    <div className={`alert alert-${typeAlerte} alert-dismissible fade show`} role="alert">
                        {messageAlerte}
                        <button type="button" className="btn-close" onClick={() => setShowAlert(false)} aria-label="Close"></button>
                    </div>
                )}
                    <button
                        type="submit"
                        className="btn btn-primary w-100" style={{ fontFamily: 'inter, sans-serif' }}
                    >
                        Ajouter l'article
                    </button>
                </form>
            </div>
        </div>
    )
}

export default AddArticle;