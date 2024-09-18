'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation'; // Utilisé pour rediriger après suppression

export default function MotoAdsPage() {
    const [motoAds, setMotoAds] = useState([]);
    const [error, setError] = useState('');
    const router = useRouter(); // Utilisé pour redirection

    useEffect(() => {
        const fetchMotoAds = async () => {
            try {
                const token = localStorage.getItem('x-auth-token');
                const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/admin/all-moto-ads`, {
                    headers: { 'x-auth-token': token }
                });
                setMotoAds(response.data);
            } catch (error) {
                setError('Failed to fetch moto ads');
            }
        };

        fetchMotoAds();
    }, []);

    // Fonction pour supprimer une annonce
    const handleDelete = async (adId) => {
        if (window.confirm('Are you sure you want to delete this ad?')) {
            try {
                const token = localStorage.getItem('x-auth-token');
                await axios.delete(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/admin/moto-ads/${adId}`, {
                    headers: { 'x-auth-token': token }
                });
                // Filtrer les annonces après suppression
                setMotoAds((prevAds) => prevAds.filter((ad) => ad._id !== adId));
                alert('Ad deleted successfully');
            } catch (error) {
                console.error('Failed to delete ad', error);
                alert('Failed to delete ad');
            }
        }
    };

    return (
        <div>
            <h1>All Moto Ads</h1>
            <Link href={'/admin/users'}>
                <p>Lien vers les utilisateurs</p>
            </Link>
            {error && <p>{error}</p>}
            <ul>
                {motoAds.map((ad) => (
                    <li key={ad._id}>
                        <div style={{ cursor: 'pointer', border: '1px solid black', padding: '10px', margin: '10px 0' }}>
                            <h2>{ad.title}</h2>
                            <p>Description: {ad.description}</p>
                            <p>Price per day: {ad.pricePerDay} €</p>
                            <p>Brand: {ad.brand}</p>
                            <p>Model: {ad.model}</p>
                            <p>Year: {ad.year}</p>
                            <p>Mileage: {ad.mileage} km</p>
                            <p>Posted by: {ad.user?.name || 'Unknown'}</p>

                            {/* Bouton pour modifier l'annonce */}
                            <Link href={`/admin/moto-ads/edit/${ad._id}`}>
                                <button style={{ marginRight: '10px' }}>Edit</button>
                            </Link>

                            {/* Bouton pour supprimer l'annonce */}
                            <button onClick={() => handleDelete(ad._id)} style={{ backgroundColor: 'red', color: 'white' }}>
                                Delete
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
