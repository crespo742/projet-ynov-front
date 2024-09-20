'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import './EditUserProfile.css'; // Import du fichier CSS

export default function EditUserProfile({ params }) {
    const { id } = params;
    const [formData, setFormData] = useState({
        email: '',
        telephone: ''
    });
    const [message, setMessage] = useState('');
    const router = useRouter(); // Utilisation du hook useRouter pour la redirection

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem('x-auth-token');
                const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/users/${id}`, {
                    headers: { 'x-auth-token': token }
                });
                setFormData({
                    email: response.data.email,
                    telephone: response.data.telephone || ''
                });
            } catch (error) {
                console.error('Erreur lors de la récupération des données utilisateur', error);
            }
        };
        fetchUserData();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('x-auth-token');
            await axios.put(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/users/profile/${id}`, formData, {
                headers: { 'x-auth-token': token }
            });
            setMessage('Profil mis à jour avec succès');
            
            // Redirection vers la page de profil après une courte pause pour montrer le message de succès
            setTimeout(() => {
                router.push('/profile');
            }, 1000); // Redirection après 1 seconde

        } catch (error) {
            console.error('Erreur lors de la mise à jour du profil', error);
            setMessage('Erreur lors de la mise à jour du profil');
        }
    };

    return (
        <div className="profile-edit-container">
            <h1 className="profile-edit-title">Modifier le profil</h1>
            <form onSubmit={handleSubmit} className="profile-edit-form">
                <label>Email :</label>
                <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                />
                <label>Téléphone :</label>
                <input
                    type="number"
                    value={formData.telephone}
                    onChange={(e) => setFormData({ ...formData, telephone: e.target.value })}
                />
                <button type="submit" className="profile-edit-button">Mettre à jour</button>
            </form>
            {message && <p className="message">{message}</p>}
        </div>
    );
}
