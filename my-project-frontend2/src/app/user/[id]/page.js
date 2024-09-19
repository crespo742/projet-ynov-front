'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function UserProfile({ params }) {
    const { id } = params;
    const [user, setUser] = useState(null);
    const [rating, setRating] = useState(0);
    const [message, setMessage] = useState('');
    const [hasRated, setHasRated] = useState(false);
    const [userRating, setUserRating] = useState(null); 
    const [ads, setAds] = useState([]);
    const [isOwnProfile, setIsOwnProfile] = useState(false); // Nouvel état pour vérifier si l'utilisateur est sur son propre profil
    const router = useRouter();

    useEffect(() => {
        const fetchUserAndAds = async () => {
            try {
                const token = localStorage.getItem('x-auth-token');
                const currentUser = JSON.parse(localStorage.getItem('user'));

                // Récupérer les informations de l'utilisateur du profil
                const userResponse = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/users/${id}`, {
                    headers: { 'x-auth-token': token },
                });
                setUser(userResponse.data);
                setUserRating(userResponse.data.rating);

                // Récupérer les annonces de l'utilisateur
                const adsResponse = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/moto-ads/my-ads/${id}`, {
                    headers: { 'x-auth-token': token },
                });
                setAds(adsResponse.data);

                // Vérifier si l'utilisateur connecté a déjà noté ce profil
                if (userResponse.data.ratedBy.includes(currentUser.id)) {
                    setHasRated(true);
                }

                // Vérifier si l'utilisateur visualise son propre profil
                if (currentUser.id === userResponse.data._id) {
                    setIsOwnProfile(true); // L'utilisateur connecté ne peut pas se noter lui-même
                }
            } catch (error) {
                console.error('Failed to fetch user or ads', error);
            }
        };

        fetchUserAndAds();
    }, [id]);

    const handleRating = async () => {
        try {
            const token = localStorage.getItem('x-auth-token');
            await axios.post(
                `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/users/rate/${id}`,
                { rating },
                { headers: { 'x-auth-token': token } }
            );
            setMessage('Thank you for your rating!');
            setHasRated(true);
        } catch (error) {
            console.error('Failed to submit rating', error);
            setMessage('Failed to submit rating. Please try again.');
        }
    };

    if (!user) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <h1>{user.name}'s Profile</h1>
            <p>Email: {user.email}</p>
            <p>Telephone: {user.phone ? user.phone : 'pas de numero de telephone'}</p>
            <p>Current Rating: {userRating ? userRating.toFixed(1) : 'Not rated yet'}</p>

            {/* Si l'utilisateur connecté n'est pas le propriétaire du profil, il peut noter */}
            {!isOwnProfile ? (
                <>
                    <h3>Rate this user</h3>
                    {hasRated ? (
                        <p>You have already rated this user.</p>
                    ) : (
                        <div>
                            {[1, 2, 3, 4, 5].map((value) => (
                                <span
                                    key={value}
                                    style={{ cursor: 'pointer', fontSize: '2rem', color: value <= rating ? '#FFD700' : '#E0E0E0' }}
                                    onClick={() => setRating(value)}
                                >
                                    ★
                                </span>
                            ))}
                            <button onClick={handleRating}>Submit Rating</button>
                        </div>
                    )}
                    {message && <p>{message}</p>}
                </>
            ) : null}

            <h3>{user.name}'s Ads</h3>
            {ads.length > 0 ? (
                <ul>
                    {ads.map((ad) => (
                        <li key={ad._id}>
                            <div style={{ border: '1px solid black', padding: '10px', margin: '10px 0', cursor: 'pointer' }}>
                                <h4>{ad.title}</h4>
                                <p>Price: {ad.pricePerDay}€ / jour</p>
                                <p>Brand: {ad.brand}</p>
                                <p>Model: {ad.model}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>This user has not posted any ads yet.</p>
            )}
        </div>
    );
}
