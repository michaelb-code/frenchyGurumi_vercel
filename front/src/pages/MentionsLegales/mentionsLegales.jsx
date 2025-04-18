import React from 'react'
import styles from './MentionsLegales.module.css'

const mentionsLegales = () => {
    return (
        <div className={styles.container}>
            <div className={styles.titleContainer}>
                <h1 className={styles.title}>Mentions Légales</h1>
            </div>
            <div className={styles.section}>
                <h2 className={styles.sectionTitle}>Editeur Du Site</h2>
                <div className={styles.infoRow}>
                    <h3 className={styles.infoLabel}>Nom De L'entreprise : </h3><p className={styles.infoValue}>Frenchy Gurumi</p>
                </div>
                <div className={styles.infoRow}>
                    <h3 className={styles.infoLabel}>Status:</h3> <p className={styles.infoValue}>Entreprise individuelle en cours de création</p>
                </div>
                <div className={styles.infoRow}>
                    <h3 className={styles.infoLabel}>Responsable De La Publication : </h3><p className={styles.infoValue}>Biganzoli Michael</p>
                </div>
                <div className={styles.infoRow}>
                    <h3 className={styles.infoLabel}>Adresse : </h3> <p className={styles.infoValue}><strong className={styles.strong}>Adresse Non Publique</strong></p>
                </div>
                <div className={styles.infoRow}>
                    <h3 className={styles.infoLabel}>Email : </h3><p className={styles.infoValue}><a href="mailto:biganzolimichael@gmail.com" className={styles.link}>biganzolimichael@gmail.com</a></p>
                </div>
                <div className={styles.infoRow}>
                    <h3 className={styles.infoLabel}>Numéro de SIRET : </h3><p className={styles.infoValue}>123456789</p>
                </div>
            </div>
            <div className={styles.section}>
                <h2 className={styles.sectionTitle}>Hébergement</h2>
                <div className={styles.infoRow}>
                    <h3 className={styles.infoLabel}>Hébergeur :  </h3><p className={styles.infoValue}>Vercel Inc.</p>
                </div>
                <div className={styles.infoRow}>
                    <h3 className={styles.infoLabel}>Adresse : </h3><p className={styles.infoValue}>340 S Lemon Ave #4133, Walnut, CA 91789, USA</p>
                </div>
                <div className={styles.infoRow}>
                    <h3 className={styles.infoLabel}>Site : </h3><p className={styles.infoValue}><a href="https://vercel.com" target="_blank" rel="noopener noreferrer">https://vercel.com</a></p>
                </div>
            </div>
            <div className={styles.section}>
                <h2 className={styles.sectionTitle}>Propriété Intelectuelle</h2>
                <p className={styles.paragraph}>Tous les contenus présents sur le site (textes, images, produits, designs) sont la propriété exclusive de <strong className={styles.strong}>Frenchy Gurumi</strong>. Toute reproduction, représentation, utilisation ou adaptation, sous quelque forme que ce soit, est strictement interdite sans l'accord préalable écrit de l'auteur.</p>
            </div>
            <div className={styles.section}>
                <h2 className={styles.sectionTitle}>Données Personnelles</h2>
                <p className={styles.paragraph}>Les données collectées via le site (commande, formulaire de contact) sont utilisées uniquement dans le cadre de la relation commerciale avec le client. Conformément au RGPD, vous pouvez exercer vos droits d'accès, de rectification ou de suppression en écrivant à biganzolimichael@gmail.com.</p>
            </div>
            <div className={styles.section}>
                <h2 className={styles.sectionTitle}>Cookies</h2>
                <p className={styles.paragraph}>Le site peut utiliser des cookies pour améliorer l'expérience utilisateur. Vous pouvez configurer votre navigateur pour bloquer les cookies.</p>
            </div>
        </div>
    )
}

export default mentionsLegales