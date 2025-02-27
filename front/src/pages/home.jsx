import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { Carousel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import URL from '../constant/api';


const Home = () => {
    const [articles, setArticles] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {

        const fetchArticles = async () => {
            try {
                // const token = localStorage.getItem("token");
                // if(!token)
                //     throw new Error("Token non trouvé");
                const response = await fetch(URL.FETCH_ARTICLES, {
                    headers: {
                        // 'Authorization' : `Bearer ${token}`,
                        'Content-Type': "application/json"
                    }
                });

                if (!response.ok)
                    throw new Error("Erreur lors de la recuperation des articles");

                const data = await response.json();

                console.log(data);

                setArticles(data.articles);
                setError(null);

            } catch (error) {
                setError(error.message);
            }
        };

        fetchArticles();
    }, []);

    if (error)
        return <div>{error}</div>
    const circleStyle = {
        border: '5px solid #FFB6C1',
        borderRadius: '50%',
        overflow: 'hidden',
        aspectRatio: '1',
        transition: 'transform 0.3s ease'
    };

    const categoryTitleStyle = {
        backgroundColor: '#FFB6C1',
        color: 'white',
        padding: '0.5rem',
        borderRadius: '0 0 20px 20px'
    };

    return (
        <div className="container-fluid p-0">
            {/* Navbar */}
            <nav className="navbar navbar-expand-lg navbar-light bg-white py-3">
                <div className="container">
                    <Link className="navbar-brand" to="/">
                        <img src="/Logo/Logo.png" alt="Logo" height="50" />
                    </Link>
                    
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    
                    <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link className="nav-link" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/articles">Nos Articles</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/about">À Propos</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/contact">Contact</Link>
                            </li>
                        </ul>
                    </div>
                    
                    <div className="d-flex">
                        <Link to="/cart" className="btn btn-link">
                            <i className="bi bi-cart"></i>
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Carousel */}
            <div className="container my-5">
                <Carousel className="rounded-4 overflow-hidden">
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src="/photoSlide/photoSlide1.jpg"
                            alt="First slide"
                            style={{ maxHeight: '500px', objectFit: 'cover' }}
                        />
                    </Carousel.Item>
                    {/* Ajoutez d'autres Carousel.Item selon vos besoins */}
                </Carousel>
            </div>

            {/* Catégories */}
            <div className="container my-5">
                <div className="row justify-content-center g-4">
                    <div className="col-lg-3 col-md-6 text-center">
                        <div style={circleStyle} className="mx-auto" onMouseOver={e => e.currentTarget.style.transform = 'scale(1.05)'} onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}>
                            <img src="/poupees.jpg" alt="Nos Poupées" className="w-100 h-100 object-fit-cover" />
                        </div>
                        <div className="mt-3" style={categoryTitleStyle}>
                            <h5 className="mb-0">Nos Poupées...</h5>
                        </div>
                    </div>

                    <div className="col-lg-3 col-md-6 text-center">
                        <div style={circleStyle} className="mx-auto" onMouseOver={e => e.currentTarget.style.transform = 'scale(1.05)'} onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}>
                            <img src="/creations.jpg" alt="Nos Créations" className="w-100 h-100 object-fit-cover" />
                        </div>
                        <div className="mt-3" style={categoryTitleStyle}>
                            <h5 className="mb-0">Nos Créations...</h5>
                        </div>
                    </div>

                    <div className="col-lg-3 col-md-6 text-center">
                        <div style={circleStyle} className="mx-auto" onMouseOver={e => e.currentTarget.style.transform = 'scale(1.05)'} onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}>
                            <img src="/amigurumi.jpg" alt="Nos Amigurumi" className="w-100 h-100 object-fit-cover" />
                        </div>
                        <div className="mt-3" style={categoryTitleStyle}>
                            <h5 className="mb-0">Nos Amigurumi...</h5>
                        </div>
                    </div>

                    <div className="col-lg-3 col-md-6 text-center">
                        <div style={circleStyle} className="mx-auto" onMouseOver={e => e.currentTarget.style.transform = 'scale(1.05)'} onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}>
                            <img src="/souvenirs.jpg" alt="Premiers Souvenirs" className="w-100 h-100 object-fit-cover" />
                        </div>
                        <div className="mt-3" style={categoryTitleStyle}>
                            <h5 className="mb-0">Premiers Souvenirs...</h5>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;