import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import styles from './NavBar.module.css';


const NavBar = () => {
    const { auth, logout } = useAuth();
    const navbarRef = useRef(null);
    const togglerRef = useRef(null);

    // Fonction pour fermer le menu
    const closeMenu = () => {
        const navbarCollapse = document.getElementById('navbarNav');
        if (navbarCollapse && navbarCollapse.classList.contains('show')) {
            navbarCollapse.classList.remove('show');
        }
    };

    useEffect(() => {
        // Fermer le menu quand on clique sur le toggler
        const handleToggleClick = () => {
            const menu = document.querySelector('#navbarNav');
            if (menu.classList.contains('show')) {
                menu.classList.remove('show');
            } else {
                menu.classList.add('show');
            }
        };

        const toggler = togglerRef.current;
        if (toggler) {
            toggler.addEventListener('click', handleToggleClick);
        }

        // Nettoyage lors du démontage
        return () => {
            if (toggler) {
                toggler.removeEventListener('click', handleToggleClick);
            }
        };
    }, []);

    return (
        <nav className={`navbar navbar-expand-lg navbar-light bg-light ${styles.navbar}`} ref={navbarRef}>
            <div className="container">
                <Link className={`navbar-brand ${styles.navbarBrand}`} to="/" onClick={closeMenu}>
                    <img src="/Logo/LogoMarque2.jpg" alt="logo de la marqueFrenchyGurumi" height="70" className="me-2" />

                </Link>
                <button
                    className={`navbar-toggler ${styles.navbarToggler}`}
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                    ref={togglerRef}
                >
                    <span className={`navbar-toggler-icon ${styles.navbarTogglerIcon}`}></span>
                </button>

                <div className={`collapse navbar-collapse ${styles.navbarCollapse}`} id="navbarNav">
                    <ul className="navbar-nav me-auto">
                        <li className="nav-item">
                            <Link className={`nav-link ${styles.navLink}`} to="/" onClick={closeMenu}>Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${styles.navLink}`} to="/#categories" onClick={(e) => {closeMenu() 
                                if(window.location.pathname === '/') {
                                    e.preventDefault();
                                    document.getElementById('categories').scrollIntoView({ behavior: 'smooth' });
                                }
                            }}>Nos Catégories</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${styles.navLink}`} to="/a-propos" onClick={closeMenu}>A Propos</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${styles.navLink}`} to="/contact" onClick={closeMenu}>Contact</Link>
                        </li>

                        {auth && auth.data && auth.data.role === 'admin' && (
                            <li className="nav-item">
                                <Link className={`nav-link ${styles.navLink}`} to="/add" onClick={closeMenu}>Ajouter un article</Link>
                            </li>
                        )}
                        {auth && auth.data && auth.data.role === 'admin' && (
                            <li className="nav-item">
                                <Link className={`nav-link ${styles.navLink}`} to="/dashboard" onClick={closeMenu}>Dashboard</Link>
                            </li>
                        )}
                    </ul>

                    <ul className="navbar-nav ms-auto">
                        {!auth ? (
                            <>
                                <li className="nav-item">
                                    <Link className={`nav-link ${styles.navLink}`} to="/login" onClick={closeMenu}>
                                        <img src="/photoIcon/logoId.png" alt="logo" height="30" className="me-2" style={{ display: 'inline-block' }} />Connexion

                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className={`nav-link ${styles.navLink}`} to="/register" onClick={closeMenu}>
                                        <img src="/photoIcon/connexion.png" alt="icon connexion" height="30" className={`${styles.iconColored} me-2`} style={{ display: 'inline-block' }} />Inscription
                                    </Link>
                                </li>
                            </>
                        ) : (
                            <>
                                <li className="nav-item">
                                    <Link className={`nav-link ${styles.navLink}`} to="/panier" onClick={closeMenu}>
                                        <img src="/photoIcon/basket-shop.png" alt="icon panier" height="30" className={`${styles.iconColored} me-2`} style={{ display: 'inline-block' }} />Panier
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className={`nav-link ${styles.navLink}`} to="/profil" onClick={closeMenu}>
                                        <img src="/photoIcon/logoId.png" alt="icon user" height="30" className="me-2" style={{ display: 'inline-block' }} />
                                        {auth.data ? auth.data.nom : auth.nom}
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <button
                                        className={`nav-link border-0 bg-transparent ${styles.navLink} ${styles.dangerItem}`}
                                        onClick={() => {
                                            closeMenu();
                                            logout();
                                        }}
                                    >
                                        <i className="bi bi-box-arrow-right me-2"></i>
                                        Déconnexion
                                    </button>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;