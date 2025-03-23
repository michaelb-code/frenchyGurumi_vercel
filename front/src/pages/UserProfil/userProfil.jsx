import React from 'react';
import styles from './UserProfil.module.css';

const UserProfil = () => {
    const user = {
        name: "John Doe",
        firstName: "John",
        email: "john.doe@example.com",
        phone: "1234567890",
        address: "123 Main St, City, Country",
        password: "1234567890",
        date_naissance: "23/03/2025",
        sexe: "Masculin",
        code_postal: "12345",
        ville: "City",
    }

    return (
        <div className={styles.profileContainer}>
            <h1 className={styles.profileHeading}>Votre Profil</h1>
            
            <div className={styles.avatarContainer}>
                <img className={styles.profileImage} src="/photoIcon/photoProfilUser.jpg" alt="Photo de profil" />
                <button className="btn btn-primary w-100">Modifier Avatar</button>
            </div>

            <div className={styles.infoContainer}>
                <div className={styles.userInfoCard}>
                    <div className={styles.sectionTitle}>
                        <h2>Vos informations</h2>
                    </div>
                    
                    <div className={styles.infoItem}>
                        <h5 className={styles.infoLabel}>Nom</h5>
                        <p className={styles.infoValue}>{user.name}</p>
                    </div>

                    <div className={styles.infoItem}>
                        <h5 className={styles.infoLabel}>Prénom</h5>
                        <p className={styles.infoValue}>{user.firstName}</p>
                    </div>
                    
                    <div className={styles.infoItem}>
                        <h5 className={styles.infoLabel}>Date de naissance</h5>
                        <p className={styles.infoValue}>{user.date_naissance}</p>
                    </div>
                    
                    <div className={styles.infoItem}>
                        <h5 className={styles.infoLabel}>Sexe</h5>
                        <p className={styles.infoValue}>{user.sexe}</p>
                    </div>

                    <div className={styles.infoItem}>
                        <h5 className={styles.infoLabel}>Email</h5>
                        <p className={styles.infoValue}>{user.email}</p>
                    </div>
                    
                    <div className={styles.infoItem}>
                        <h5 className={styles.infoLabel}>Mot de passe</h5>
                        <p className={styles.infoValue}>{user.password}</p>
                    </div>

                    <div className={styles.infoItem}>
                        <h5 className={styles.infoLabel}>Téléphone</h5>
                        <p className={styles.infoValue}>{user.phone}</p>
                    </div>

                    <div className={styles.infoItem}>
                        <h5 className={styles.infoLabel}>Adresse</h5>
                        <p className={styles.infoValue}>{user.address}</p>
                    </div>
                    
                    <div className={styles.infoItem}>
                        <h5 className={styles.infoLabel}>Code postal</h5>
                        <p className={styles.infoValue}>{user.code_postal}</p>
                    </div>
                    
                    <div className={styles.infoItem}>
                        <h5 className={styles.infoLabel}>Ville</h5>
                        <p className={styles.infoValue}>{user.ville}</p>
                    </div>

                    <button className="btn btn-primary w-100">Modifier</button>
                </div>

                <div className={styles.ordersCard}>
                    <div className={styles.sectionTitle}>
                        <h5>Commandes</h5>
                    </div>
                    
                    <button 
                        className="btn btn-primary w-100" 
                        type="button" 
                        data-bs-toggle="collapse" 
                        data-bs-target="#collapseExample" 
                        aria-expanded="false" 
                        aria-controls="collapseExample"
                    >
                        Vos commandes
                    </button>
                    
                    <div className="collapse" id="collapseExample">
                        <div className="card card-body">
                            <table className={styles.ordersTable}>
                                <thead>
                                    <tr>
                                        <th scope="col">id</th>
                                        <th scope="col">Commande N°</th>
                                        <th scope="col">Date de la commande</th>
                                        <th scope="col">Total</th>
                                        <th scope="col">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th scope="row">1</th>
                                        <td>1</td>
                                        <td>23/03/2025</td>
                                        <td>200000 FCFA</td>
                                        <td>@livré</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">2</th>
                                        <td>2</td>
                                        <td>23/03/2025</td>
                                        <td>200000 FCFA</td>
                                        <td>@en attente</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">3</th>
                                        <td>3</td>
                                        <td>23/03/2025</td>
                                        <td>200000 FCFA</td>
                                        <td>@livré</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            
            <button className="btn btn-danger w-50">Déconnexion</button>
        </div>
    )
}

export default UserProfil;