import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import URL from '../constant/api';


const UserRegister = () => {
const navigate = useNavigate();
const [user, setUser] = useState({
    isActive: true,
    nom: '',
    prenom: '',
    date_naissance: '',
    sexe: '',
    email: '',
    password: '',
    adresse: '',
    code_postal: '',
    ville: '',
    telephone: '',
    role: '',
    
});

const handleChange = (event) => {
    const { name, value } = event.target;
    setUser((prev) => ({ ...prev, [name]: value }));
};


const handleSubmit= async (event) => {
    event.preventDefault();

    try {
        const response = await fetch(URL.CREATE_USER, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Erreur lors de la creation de l\'utilisateur');
        }

        const data = await response.json();
        console.log("Utilisateur créé", data);
        navigate('/');
    } catch (error) {
        console.error(error.message);
    }
};

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="nom" onChange={handleChange} placeholder="Nom" required/>

            <input type="text" name="prenom" onChange={handleChange} placeholder="Prenom" required/>

            <input type="date" name="date_naissance" onChange={handleChange} placeholder="Date de naissance" required/>

            <input type="text" name="sexe" onChange={handleChange} placeholder="Sexe" required/>

            <input type="email" name="email" onChange={handleChange} placeholder="Email" required/>

            <input type="password" name="password" onChange={handleChange} placeholder="Password" required/>

            <input type="text" name="adresse" onChange={handleChange} placeholder="Adresse" required/>

            <input type="text" name="code_postal" onChange={handleChange} placeholder="Code postal" required/>

            <input type="text" name="ville" onChange={handleChange} placeholder="Ville" required/>

            <input type="text" name="telephone" onChange={handleChange} placeholder="Telephone" required/>

            <input type="text" name="role" onChange={handleChange} placeholder="Role" required/>

            <button type="submit" className="btn btn-primary">S'inscrire</button>

            {/* <Link to="/login">Se connecter</Link> */}
        </form>
    );
};

export default UserRegister;
