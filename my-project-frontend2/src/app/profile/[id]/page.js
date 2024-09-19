'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function EditUserProfile({ params }) {
    const { id } = params;
    const [formData, setFormData] = useState({
        email: '',
        telephone: ''
    });
    const [message, setMessage] = useState('');
    const router = useRouter();

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
        } catch (error) {
            console.error('Erreur lors de la mise à jour du profil', error);
            setMessage('Erreur lors de la mise à jour du profil');
        }
    };

    return (
        <div>
            <h1>Modifier le profil</h1>
            <form onSubmit={handleSubmit}>
                <label>Email :</label>
                <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                />
                <br />
                <label>Téléphone :</label>
                <input
                    type="number"
                    value={formData.telephone}
                    onChange={(e) => setFormData({ ...formData, telephone: e.target.value })}
                />
                <br />
                <button type="submit">Mettre à jour</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
}
