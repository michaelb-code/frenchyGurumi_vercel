import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import URL from '../../constant/api';
import styles from './UpdateProfil.module.css';
import { ToastContainer, toast } from 'react-toastify';

const notify = (type) => { 
    toast.success('Utilisateur modifié avec succès', { autoClose: 2500, position: "top-center" });
};
const UpdateProfil = () => {
    const { auth } = useAuth();
    const navigate = useNavigate();



    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const [previewImage, setPreviewImage] = useState(null);

    // État pour stocker le fichier image
    const [imageFile, setImageFile] = useState(null);

    // État pour le formulaire
    const [formData, setFormData] = useState({
        nom: '',
        prenom: '',
        email: '',
        telephone: '',
        date_naissance: '',
        sexe: '',
        adresse: '',
        code_postal: '',
        ville: '',
        password: ''
    });


    // Récupérer les informations actuelles de l'utilisateur
    const fetchUserData = async () => {
        try {
            setLoading(true);

            const apiUrl = `${URL.GET_USER_BY_ID}/${id}`;
            console.log("URL complète:", apiUrl);
            console.log("ID utilisateur:", id);
            console.log("Token:", auth.token);

            const response = await fetch(apiUrl, {
                headers: {
                    Authorization: `Bearer ${auth.token}`
                }
            });

            if (!response.ok) {
                throw new Error("Erreur lors de la récupération des données utilisateur");
            }

            const userData = await response.json();
            console.log("Données utilisateur reçues :", userData);

            // Extraire les données utilisateur qui sont imbriquées dans userData.data
            const userInfo = userData.data;


            // Formater la date si elle existe
            let formattedDate = '';
            if (userInfo.date_naissance) {
                const date = new Date(userInfo.date_naissance);
                formattedDate = date.toISOString().split('T')[0]; // Format YYYY-MM-DD pour input type="date"
            }

            // Remplir le formulaire avec les données actuelles
            const newFormData = {
                nom: userInfo.nom || '',
                prenom: userInfo.prenom || '',
                email: userInfo.email || '',
                telephone: userInfo.telephone || '',
                date_naissance: formattedDate,
                sexe: userInfo.sexe || '',
                adresse: userInfo.adresse || '',
                code_postal: userInfo.code_postal || '',
                ville: userInfo.ville || '',
                password: ''
            };

            console.log("Nouveau formData à appliquer:", newFormData);
            setFormData(newFormData);


            // Si l'utilisateur a une photo de profil, l'afficher
            if (userInfo.photo) {
                setPreviewImage(userInfo.photo);
            }

            setError(null);

        } catch (err) {
            console.error('Erreur:', err);
            setError("Une erreur est survenue lors du chargement de vos informations.");

        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!auth) {
            navigate('/login');
            return;
        }
    
        const userId = auth.data?._id;
        const userRole = auth.data?.role;
    
        if (!userId) {
            setError("ID utilisateur non trouvé dans les données d'authentification");
            setLoading(false);
            return;
        }
    
        const isAdmin = userRole === 'admin';
        const isOwnAccount = userId === id;
    
        if (!isAdmin && !isOwnAccount) {
            setError("Vous n'avez pas les droits pour modifier ce profil");
            setLoading(false);
            return;
        }
    
        fetchUserData();
    }, [auth, id]);
    

    // Gérer les changements dans les champs du formulaire
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Gérer les changements de fichier image
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);

            // Créer une URL pour prévisualiser l'image
            const fileReader = new FileReader();
            fileReader.onload = () => {
                setPreviewImage(fileReader.result);
            };
            fileReader.readAsDataURL(file);
        }
    };

    // Soumettre le formulaire
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            setError(null);
            setSuccess(false);

            // Créer un objet FormData pour envoyer les données et le fichier
            const submitData = new FormData();

            // Ajouter les données du formulaire
            Object.keys(formData).forEach(key => {
                // Ne pas envoyer le mot de passe si il n'a pas été modifié (non vide)
                if (key !== 'password' || (key === 'password' && formData[key])) {
                    submitData.append(key, formData[key]);
                }
            });

            // Ajouter l'image si elle a été sélectionnée
            if (imageFile) {
                submitData.append('photo', imageFile); // Utiliser le nom 'image' pour correspondre à la configuration multer
            }

            // Envoyer les données au serveur
            const response = await fetch(`${URL.UPDATE_USER}/${id}`, {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${auth.token}`
                    // Ne pas mettre Content-Type avec FormData
                },
                body: submitData
            });

            if (!response.ok) {
                throw new Error('Erreur lors de la mise à jour du profil');
            }

            const result = await response.json();
            console.log('Profil mis à jour avec succès:', result);
            notify();
            setSuccess(true);

// Recharger les données du profil après la mise à jour
await fetchUserData();

        } catch (error) {
            console.error('Erreur:', error);
            setError('Une erreur est survenue lors de la mise à jour de votre profil.');
        } finally {
            setLoading(false);
        }

    };
    

    const handleCancel = () => {
        navigate('/profil');
    };

    if (loading) {
        return (
            <div className="loading-container">
                <img src="/Logo/LogoMarque.jpg" alt="loading" />
                <p className="loading-text">Chargement...</p>
            </div>
        );
    }

    return (
        <div className={styles.updateContainer}>
            <h1 className={styles.updateHeading}>Modifier votre profil</h1>

            {error && (
                <div className={styles.alertError}>
                    {error}
                </div>
            )}

            {success && (
                <div className={styles.alertSuccess}>
                    Profil mis à jour avec succès! Redirection en cours...
                </div>
            )}

            <div className={styles.avatarContainer}>
                <img
                    src={previewImage ? previewImage : "/photoIcon/photoProfilUser.jpg"}
                    alt="Avatar de profil"
                    className={styles.profileImage}
                />
                <label htmlFor="image" className="btn btn-primary w-100">
                    Changer votre avatar
                </label>
                <input
                    type="file"
                    id="image"
                    className={styles.fileInput}
                    accept="image/*"
                    onChange={handleImageChange}
                />
            </div>

            <form onSubmit={handleSubmit} className={styles.formCard}>
                <div className={styles.sectionTitle}>
                    <h2>Vos informations</h2>
                </div>

                <div className={styles.formSection}>
                    <div className={styles.formRow}>
                        <div className={styles.formGroup}>
                            <label htmlFor="nom" className={styles.formLabel}>Nom</label>
                            <input
                                type="text"
                                id="nom"
                                name="nom"
                                className={styles.formInput}
                                value={formData.nom}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="prenom" className={styles.formLabel}>Prénom</label>
                            <input
                                type="text"
                                id="prenom"
                                name="prenom"
                                className={styles.formInput}
                                value={formData.prenom}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>
                </div>

                <div className={styles.formSection}>
                    <div className={styles.formRow}>
                        <div className={styles.formGroup}>
                            <label htmlFor="date_naissance" className={styles.formLabel}>Date de naissance</label>
                            <input
                                type="date"
                                id="date_naissance"
                                name="date_naissance"
                                className={styles.formInput}
                                value={formData.date_naissance}
                                onChange={handleChange}
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="sexe" className={styles.formLabel}>Sexe</label>
                            <select
                                id="sexe"
                                name="sexe"
                                className={styles.formInput}
                                value={formData.sexe}
                                onChange={handleChange}
                            >
                                <option value="">Sélectionnez</option>
                                <option value="Masculin">Masculin</option>
                                <option value="Feminin">Feminin</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className={styles.formSection}>
                    <div className={styles.formGroup}>
                        <label htmlFor="email" className={styles.formLabel}>Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className={styles.formInput}
                            value={formData.email}
                            onChange={handleChange}
                            required
                            disabled
                        />
                        <p className={styles.helperText}>L'adresse email ne peut pas être modifiée.</p>
                    </div>
                </div>

                {/* Afficher le champ mot de passe uniquement si l'utilisateur modifie son propre profil */}
                {auth && auth.data && auth.data._id === id && (
                    <div className={styles.formSection}>
                        <label htmlFor="password" className={styles.formLabel}>Mot de passe</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            className={styles.formInput}
                            value={formData.password || ''}
                            onChange={handleChange}
                            placeholder="Laissez vide pour ne pas modifier"
                        />
                        <p className={styles.helperText}>Remplissez ce champ uniquement si vous souhaitez changer votre mot de passe</p>
                    </div>
                )}

                <div className={styles.formSection}>
                    <div className={styles.formGroup}>
                        <label htmlFor="telephone" className={styles.formLabel}>Téléphone</label>
                        <input
                            type="tel"
                            id="telephone"
                            name="telephone"
                            className={styles.formInput}
                            value={formData.telephone}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className={styles.formSection}>
                    <div className={styles.formGroup}>
                        <label htmlFor="adresse" className={styles.formLabel}>Adresse</label>
                        <input
                            type="text"
                            id="adresse"
                            name="adresse"
                            className={styles.formInput}
                            value={formData.adresse}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className={styles.formSection}>
                    <div className={styles.formRow}>
                        <div className={styles.formGroup}>
                            <label htmlFor="code_postal" className={styles.formLabel}>Code postal</label>
                            <input
                                type="text"
                                id="code_postal"
                                name="code_postal"
                                className={styles.formInput}
                                value={formData.code_postal}
                                onChange={handleChange}
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="ville" className={styles.formLabel}>Ville</label>
                            <input
                                type="text"
                                id="ville"
                                name="ville"
                                className={styles.formInput}
                                value={formData.ville}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                </div>

                <div className={styles.buttonContainer}>
                    <button
                        type="button"
                        className={styles.btnCancel}
                        onClick={handleCancel}
                    >
                        Annuler
                    </button>
                    <button
                        type="submit"
                        className="btn btn-primary w-50"
                        disabled={loading}
                    >
                        {loading ? 'Enregistrement...' : 'Enregistrer'}
                    </button>
                    <ToastContainer />
                </div>
            </form>
        </div>
    );
};

export default UpdateProfil;