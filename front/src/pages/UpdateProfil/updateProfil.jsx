import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import URL from '../../constant/api';
import styles from './UpdateProfil.module.css';

const UpdateProfil = () => {
    const { auth } = useAuth();
    const navigate = useNavigate();
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const [previewImage, setPreviewImage] = useState(null);
    
    // état pour le formulaire
    const [formData, setFormData] = useState({
        nom: '',
        prenom: '',
        email: '',
        telephone: '',
        date_naissance: '',
        sexe: '',
        adresse: '',
        code_postal: '',
        ville: ''
    });
    
    // état pour stocker le fichier image
    const [imageFile, setImageFile] = useState(null);

    useEffect(() => {
        // Vérifier si l'utilisateur est connecté
        if (!auth) {
            navigate('/sign');
            return;
        }
    
        // Vérifier que nous avons un ID valide et les permissions
        const userId = auth.data?._id;
        if (!userId) {
            setError("ID utilisateur non trouvé dans les données d'authentification");
            setLoading(false);
            return;
        }
    
        // Vérifier si l'utilisateur peut modifier ce profil
        if (userId !== id) {
            navigate('/profil');
            return;
        }
    
        // Récupérer les informations actuelles de l'utilisateur
        const fetchUserData = async () => {
            try {
                setLoading(true);
                // Remplacer :id par la valeur de id
                const userUrl = URL.GET_USER_BY_ID.replace(':id', id);
                const response = await fetch(userUrl, {
                    headers: {
                        Authorization: `Bearer ${auth.token}`
                    }
                });
    
                if (!response.ok) {
                    throw new Error("Erreur lors de la récupération des données utilisateur");
                }
    
                const userData = await response.json();
                
                // Formater la date si elle existe
                let formattedDate = '';
                if (userData.date_naissance) {
                    const date = new Date(userData.date_naissance);
                    formattedDate = date.toISOString().split('T')[0]; // Format YYYY-MM-DD pour input type="date"
                }
                
                // Remplir le formulaire avec les données actuelles
                setFormData({
                    nom: userData.nom || '',
                    prenom: userData.prenom || '',
                    email: userData.email || '',
                    telephone: userData.telephone || '',
                    date_naissance: formattedDate,
                    sexe: userData.sexe || '',
                    adresse: userData.adresse || '',
                    code_postal: userData.code_postal || '',
                    ville: userData.ville || ''
                });
                
                // Si l'utilisateur a une photo de profil, l'afficher
                if (userData.photo) {
                    setPreviewImage(userData.photo);
                }
    
                setError(null);

            } catch (err) {
                console.error('Erreur:', err);
                setError("Une erreur est survenue lors du chargement de vos informations.");
            } finally {
                setLoading(false);
            }
        };
    
        fetchUserData();
    }, [auth, id, navigate]);
    
    // Gérer les changements dans les champs du formulaire
    const handleInputChange = (e) => {
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
                submitData.append(key, formData[key]);
            });
            
            // Ajouter l'image si elle a été sélectionnée
            if (imageFile) {
                submitData.append('image', imageFile); // Utiliser le nom 'image' pour correspondre à la configuration multer
            }
            
            // Envoyer les données au serveur
            const updateUrl = URL.UPDATE_USER.replace(':id', id);
            const response = await fetch(updateUrl, {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${auth.token}`
                    // Ne pas définir Content-Type avec FormData
                },
                body: submitData 
            });
    
            if (!response.ok) {
                throw new Error('Erreur lors de la mise à jour du profil');
            }
    
            const result = await response.json();
            console.log('Profil mis à jour avec succès:', result);
            
            setSuccess(true);
            
            // Attendre 3 secondes avant de rediriger vers la page de profil    
            setTimeout(() => {
                navigate('/profil');
            }, 3000);
            
        } catch (err) {
            console.error('Erreur:', err);
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
                                onChange={handleInputChange}
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
                                onChange={handleInputChange}
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
                                onChange={handleInputChange}
                            />
                        </div>
                        
                        <div className={styles.formGroup}>
                            <label htmlFor="sexe" className={styles.formLabel}>Sexe</label>
                            <select
                                id="sexe"
                                name="sexe"
                                className={styles.formInput}
                                value={formData.sexe}
                                onChange={handleInputChange}
                            >
                                <option value="">Sélectionnez</option>
                                <option value="Masculin">Masculin</option>
                                <option value="Feminin">Feminin</option>
                                <option value="Autre">Autre</option>
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
                            onChange={handleInputChange}
                            required
                            disabled
                        />
                        <p className={styles.helperText}>L'adresse email ne peut pas être modifiée.</p>
                    </div>
                </div>
                
                <div className={styles.formSection}>
                    <div className={styles.formGroup}>
                        <label htmlFor="telephone" className={styles.formLabel}>Téléphone</label>
                        <input
                            type="tel"
                            id="telephone"
                            name="telephone"
                            className={styles.formInput}
                            value={formData.telephone}
                            onChange={handleInputChange}
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
                            onChange={handleInputChange}
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
                                onChange={handleInputChange}
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
                                onChange={handleInputChange}
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
                </div>
            </form>
        </div>
    );
};

export default UpdateProfil;