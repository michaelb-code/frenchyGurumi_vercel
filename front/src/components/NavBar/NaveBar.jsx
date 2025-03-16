import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import './NavBar.css';


const NavBar = () => {
    const { auth, logout } = useAuth();

    useEffect(() => {
        const menu = document.querySelector('#navbarNav');
        const toggler = document.querySelector('.navbar-toggler');

        // Fermer le menu quand on clique sur un lien
        const links = document.querySelectorAll('.nav-link');
    links.forEach(link => {
        // Remplacer le lien pour supprimer les écouteurs précédents
        const newLink = link.cloneNode(true);
        if (link.parentNode) {
            link.parentNode.replaceChild(newLink, link);
            
            // Ajouter l'écouteur d'événement pour fermer le menu
            newLink.addEventListener('click', () => {
                menu.classList.remove('show');
            });
        }
    });

    // Fermer le menu quand on clique sur le toggler
    toggler.addEventListener('click', () => {
        if(menu.classList.contains('show')) {
            menu.classList.remove('show');
        } else {
            menu.classList.add('show');
        }
    });

    }, []);

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container">
                <Link className="navbar-brand" to="/">
                    <img src="/Logo/LogoMarque2.jpg" alt="logo de la marqueFrenchyGurumi" height="70" className="me-2" />

                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav me-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/">Nos Catégories</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/">A Propos</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/">Contact</Link>
                        </li>

                        {auth && auth.role === 'admin' && (
                            <li className="nav-item">
                                <Link className="nav-link" to="/add">Ajouter un article</Link>
                            </li>
                        )}
                        {auth && auth.role === 'admin' && (
                            <li className="nav-item">
                                <Link className="nav-link" to="/dashboard">Dashboard</Link>
                            </li>
                        )}
                    </ul>

                    <ul className="navbar-nav ms-auto">
                        {!auth ? (
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/login">
                                        <img src="/photoIcon/logoId.png" alt="logo" height="30" className="me-2" style={{ display: 'inline-block' }} />Connexion

                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/register">
                                        <img src="/photoIcon/connexion.png" alt="icon connexion" height="30" className="iconColored me-2" style={{ display: 'inline-block' }} />Inscription
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/panier">
                                        <img src="/photoIcon/basket-shop.png" alt="icon panier" height="30" className="iconColored me-2" style={{ display: 'inline-block' }} />Panier
                                    </Link>
                                </li>

                            </>
                        ) : (
                            <>
                                <li className="nav-item dropdown">
                                    <button
                                        className="nav-link dropdown-toggle border-0 bg-transparent"
                                        type="button"
                                        id="navbarDropdown"
                                        data-bs-toggle="dropdown"
                                        aria-expanded="false"
                                    >
                                        <i className="bi bi-person-circle me-1"></i>
                                        {auth.nom}
                                    </button>
                                    <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                                        <li>
                                            <Link className="dropdown-item" to="/profile">
                                                <i className="bi bi-person me-2"></i>
                                                Mon profil
                                            </Link>
                                        </li>
                                        {auth.role === 'admin' && (
                                            <li>
                                                <Link className="dropdown-item" to="/dashboard">
                                                    <i className="bi bi-speedometer2 me-2"></i>
                                                    Dashboard
                                                </Link>
                                            </li>
                                        )}
                                        <li><hr className="dropdown-divider" /></li>
                                        <li>
                                            <button
                                                className="dropdown-item text-danger"
                                                onClick={logout}
                                            >
                                                <i className="bi bi-box-arrow-right me-2"></i>
                                                Se déconnecter
                                            </button>
                                        </li>
                                    </ul>
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
