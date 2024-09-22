"use client";

import '../styles/layout.css';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function ClientLayout({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [unreadMessagesCount, setUnreadMessagesCount] = useState(0);

  useEffect(() => {
    const currentUser = localStorage.getItem('user');
    if (currentUser) {
      setUser(JSON.parse(currentUser)); // Définit l'utilisateur comme un objet parsé
    }
    setLoading(false);
  }, []);

  // Fonction pour récupérer les messages non lus
  const fetchUnreadMessagesCount = async () => {
    if (user) {
      try {
        const token = localStorage.getItem('x-auth-token');
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/messages/unread-count`, {
          headers: { 'x-auth-token': token },
        });
        setUnreadMessagesCount(response.data.unreadCount);
      } catch (error) {
        console.error('Failed to fetch unread messages count:', error);
      }
    }
  };

  // Mettre à jour le nombre de messages non lus toutes les 30 secondes
  useEffect(() => {
    if (user) {
      fetchUnreadMessagesCount(); // Fetch initial count

      const interval = setInterval(() => {
        fetchUnreadMessagesCount();
      }, 2000); // Vérifie toutes les 2 secondes

      // Nettoie l'intervalle lorsque le composant est démonté
      return () => clearInterval(interval);
    }
  }, [user]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <header className="site-header">
        <div className="header-content">
          <div className="logo">
            <Link href={'/'}>
              <img src="/logo.png" alt="Logo" />
            </Link>
          </div>
          <nav className="header-nav">
            {user ? (
              <>
                <Link href={'/chat'}>
                  Messagerie {unreadMessagesCount > 0 && `(${unreadMessagesCount} non lu(s))`}
                </Link>
                <Link href={`/location/${user.id}`}>
                  Mes Locations
                </Link>
                <Link href={`/clientReservations/${user.id}`}>
                  Mes Réservations
                </Link>
                <div className="header-buttons">
                  <Link href={'/profile'}>
                    <img src="/profile.png" alt="Mon Profil" className="profile-icon" />
                  </Link>
                </div>
              </>
            ) : (
              <div className="header-buttons">
                <Link href={'/login'}>
                  <button className="login-button">Se connecter</button>
                </Link>
                <Link href={'/register'}>
                  <button className="register-button">S'inscrire</button>
                </Link>
              </div>
            )}
          </nav>
        </div>
      </header>

      {/* Contenu principal */}
      <main className="site-main">
        {children}
      </main>

      {/* Footer */}
      <footer className="site-footer">
        <div className="footer-content">
          <div className="footer-links">
            <div className="footer-column">
              <h4>Support</h4>
              <Link href="/faq">FAQ</Link>
              <Link href="/contact">Contactez-nous</Link>
              <Link href="/help-center">Centre d&#39;aide</Link>
              <Link href="/refund-policy">Politique de remboursement</Link>
            </div>
            <div className="footer-column">
              <h4>Ressources</h4>
              <Link href="/blog">Blog</Link>
              <Link href="/guides">Guides d&#39;utilisation</Link>
              <Link href="/safety-tips">Conseils de sécurité</Link>
              <Link href="/news">Actualités</Link>
            </div>
            <div className="footer-column">
              <h4>À Propos</h4>
              <Link href="/about-us">À Propos de Nous</Link>
              <Link href="/careers">Carrières</Link>
              <Link href="/privacy-policy">Politique de Confidentialité</Link>
              <Link href="/terms-conditions">Termes et Conditions</Link>
            </div>
          </div>
        </div>
        {/* Section des réseaux sociaux en dessous de la ligne */}
        <div className="footer-social-section">
          <hr />
          <div className="footer-social">
            <span>Suivez-nous :</span>
            <Link href="https://www.facebook.com" target="_blank">
              <img src="/facebook.png" alt="Facebook" />
            </Link>
            <Link href="https://www.instagram.com" target="_blank">
              <img src="/insta.png" alt="Instagram" />
            </Link>
            <Link href="https://www.twitter.com" target="_blank">
              <img src="/twitter.png" alt="Twitter" />
            </Link>
          </div>
          <p className="footer-bottom">&copy; TradeUrBike, Inc. 2024. Nous aimons nos utilisateurs !</p>
        </div>
      </footer>
    </>
  );
}
