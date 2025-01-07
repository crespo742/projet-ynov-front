'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation'; // Utilisé pour rediriger après suppression

export default function MotoAnnoncesPage() {
    const [motoAnnonces, setMotoAnnonces] = useState([]);
    const [error, setError] = useState('');
    const router = useRouter(); // Utilisé pour redirection

    useEffect(() => {
        const fetchMotoAnnonces = async () => {
            try {
                const token = localStorage.getItem('x-auth-token');
                const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/admin/all-moto-Annonces`, {
                    headers: { 'x-auth-token': token }
                });
                setMotoAnnonces(response.data);
            } catch (error) {
                setError('Failed to fetch moto Annonces');
            }
        };

        fetchMotoAnnonces();
    }, []);

    // Fonction pour supprimer une annonce
    const handleDelete = async (annonceId) => {
        if (window.confirm('Are you sure you want to delete this Annonce?')) {
            try {
                const token = localStorage.getItem('x-auth-token');
                await axios.delete(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/admin/moto-Annonces/${annonceId}`, {
                    headers: { 'x-auth-token': token }
                });
                // Filtrer les annonces après suppression
                setMotoAnnonces((prevAnnonces) => prevAnnonces.filter((annonce) => annonce._id !== annonceId));
                alert('Annonce deleted successfully');
            } catch (error) {
                console.error('Failed to delete Annonce', error);
                alert('Failed to delete Annonce');
            }
        }
    };

    return (
        <div>
            <h1>All Moto Annonces</h1>
            <Link href={'/admin/users'}>
                <p>Lien vers les utilisateurs</p>
            </Link>
            {error && <p>{error}</p>}
            <ul>
                {motoAnnonces.map((annonce) => (
                    <li key={annonce._id}>
                        <div style={{ cursor: 'pointer', border: '1px solid black', padding: '10px', margin: '10px 0' }}>
                            <h2>{annonce.title}</h2>
                            <p>Description: {annonce.description}</p>
                            <p>Price per day: {annonce.pricePerDay} €</p>
                            <p>Brand: {annonce.brand}</p>
                            <p>Model: {annonce.model}</p>
                            <p>Year: {annonce.year}</p>
                            <p>Mileage: {annonce.mileage} km</p>
                            <p>Posted by: {annonce.user?.name || 'Unknown'}</p>

                            {/* Bouton pour modifier l'annonce */}
                            <Link href={`/admin/moto-Annonces/edit/${annonce._id}`}>
                                <button style={{ marginRight: '10px' }}>Edit</button>
                            </Link>

                            {/* Bouton pour supprimer l'annonce */}
                            <button onClick={() => handleDelete(annonce._id)} style={{ backgroundColor: 'red', color: 'white' }}>
                                Delete
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
