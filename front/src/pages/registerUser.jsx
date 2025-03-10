import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import URL from '../constant/api';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';


const UserRegister = () => {
    const { loading } = useSelector((state) => state.user);
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
if (loading) return <div className='text-center'>Chargement...</div>

    return (
        <form onSubmit={handleSubmit}>
        <div className="container py-5">
            <input type="text" name="nom" onChange={handleChange} placeholder="Nom" required/>

            <input type="text" name="prenom" onChange={handleChange} placeholder="Prenom" required/>

            <input type="date" name="date_naissance" onChange={handleChange} placeholder="Date de naissance" required/>

            <select name="sexe" value={user.sexe} onChange={handleChange} placeholder="Sexe" required>
                <option value="">Sélectionnez votre sexe</option>
                <option value="masculin">Masculin</option>
                <option value="feminin">Feminin</option>
            </select>

            <input type="email" name="email" onChange={handleChange} placeholder="Email" required/>

            <input type="password" name="password" onChange={handleChange} placeholder="Password" required/>

            <input type="text" name="adresse" onChange={handleChange} placeholder="Adresse" required/>

            <input type="text" name="code_postal" onChange={handleChange} placeholder="Code postal" required/>

            <input type="text" name="ville" onChange={handleChange} placeholder="Ville" required/>

            <input type="text" name="telephone" onChange={handleChange} placeholder="Telephone" required/>

            <select name="role" value={user.role} onChange={handleChange} placeholder="Role" required>
                <option value="admin">Admin</option>
                <option value="user">User</option>
            </select>

            <button type="submit" className="btn btn-primary">S'inscrire</button>

            <Link className="btn btn-link" to="/login">Se connecter</Link>
        </div>
        </form>
    );
};

export default UserRegister;
