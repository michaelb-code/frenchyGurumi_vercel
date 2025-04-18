import React from 'react'
import { Link } from 'react-router-dom'
import styles from './Footer.module.css'

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.footerTop}>
                <div className={styles.logoSection}>
                    <img src="/Logo/LogoMarque2.jpg" alt="logo de la marque FrenchyGurumi" className={styles.logo} />
                </div>
                <div className={styles.linksSection}>
                    <div className={styles.linksColumn}>
                        <Link to="/mentions-legales">Mentions légales</Link>
                        <Link to="/cgv">Conditions Générales de Vente</Link>
                    </div>
                    <div className={styles.linksColumn}>
                        <Link to="/contact">Contact</Link>
                        
                    </div>
                    <div className={styles.linksColumn}>
                        <a href="https://www.instagram.com/frenchygurumi/" target="_blank" rel="noopener noreferrer">
                            <span>Instagram</span>
                            <img src='/photoIcon/instagramLogo.png' alt="logo instagram" className={styles.socialLogo} />
                        </a>
                    </div>
                </div>
            </div>
            <div className={styles.footerBottom}>
                <p>&copy; 2025 - Frenchy Gurumi - Tous droits réservés.</p>
            </div>
        </footer>
    )
}

export default Footer