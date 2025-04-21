import React from 'react'
import styles from './Cgv.module.css'

const cgv = () => {
    return (
        <div className={styles.container}>
            <div className={styles.titleContainer}>
                <h1 className={styles.title}>Conditions Générales de Vente</h1>
            </div>
            <div className={styles.section}>
                <h2 className={styles.sectionTitle}>1. Présentation du site</h2>
                <p className={styles.paragraph}>Le site Frenchy Gurumi propose à la vente des poupées en crochet, entièrement faites main. Chaque création est unique et peut être personnalisée sur demande.</p>
            </div>
            <div className={styles.section}>
                <h2 className={styles.sectionTitle}>2. Produits</h2>
                <p className={styles.paragraph}>Les articles vendus sont des créations artisanales réalisées à la main. Des variations peuvent exister entre les produits, notamment en cas de personnalisation.</p>
            </div>
            <div className={styles.section}>
                <h2 className={styles.sectionTitle}>3. Commandes et Paiement</h2>
                <p className={styles.paragraph}>Les commandes se font en ligne via le site. Les paiements sont acceptés par carte bancaire. Les prix sont affichés <strong className={styles.strong}>TTC</strong>.</p>
            </div>
            <div className={styles.section}>
                <h2 className={styles.sectionTitle}>4.Délais de Fabrication et De Livraison</h2>
                <ul className={styles.list}>
                    <li className={styles.listItem}>
                        <h3 className={styles.subTitle}>4.1 Délais de Fabrication</h3>
                        <p className={styles.paragraph}>5 à 6 jours</p>
                    </li>
                    <li className={styles.listItem}>
                        <h3 className={styles.subTitle}>4.2 Avec Personnalisation</h3>
                        <p className={styles.paragraph}>8 à 9 jours</p>
                    </li>
                    <li className={styles.listItem}>
                        <h3 className={styles.subTitle}>4.3 Livraison</h3>
                        <p className={styles.paragraph}>uniquement en France, via <strong className={styles.strong}>La Poste</strong>. Les délais de livraison varient selon les services postaux. <strong className={styles.strong}>Frenchy Gurumi</strong> ne peut être tenu responsable d'un éventuel retard imputable au transporteur.</p>
                    </li>
                </ul>
            </div>
            <div className={styles.section}>
                <h2 className={styles.sectionTitle}>5. Droit de Rétractation et Retours</h2>
                <p className={styles.paragraph}>Conformément à <a href='https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000032226842/' target="_blank" rel="noopener noreferrer">l'article L221-18 du Code de la consommation</a> :</p>
                <ul className={styles.list}>
                    <li className={styles.listItem}>Vous disposez d'un délai de <strong className={styles.strong}>14 jours</strong> à compter de la réception de votre commande pour demander un retour.</li>
                    <li className={styles.listItem}>Les frais de retour sont à la charge du client.</li>
                    <li className={styles.listItem}>Les produits doivent être retournés <strong className={styles.strong}>intacts et non utilisés.</strong></li>
                    <li className={styles.listItem}><strong className={styles.strong}>Aucun retour ne sera accepté</strong> pour les produits personnalisés (ex : choix des couleurs).</li>
                </ul>
            </div>
            <div className={styles.section}>
                <h2 className={styles.sectionTitle}>6. Propriété Intellectuelle</h2>
                <p className={styles.paragraph}>Tous les modèles et créations proposés sur <strong className={styles.strong}>Frenchy Gurumi</strong> sont protégés. Il est interdit de les reproduire ou de les commercialiser sans autorisation.</p>
            </div>
            <div className={styles.section}>
                <h2 className={styles.sectionTitle}>7. Contact</h2>
                <p className={styles.paragraph}>Pour toute question ou réclamation, vous pouvez contacter : <a href="mailto:biganzolimichael@gmail.com" className={styles.link}>biganzolimichael@gmail.com</a></p>
            </div>
        </div>
    )
}

export default cgv