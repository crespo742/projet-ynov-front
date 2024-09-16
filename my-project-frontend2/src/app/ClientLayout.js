"use client";

import '../styles/layout.css';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function ClientLayout({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [unreadMessagesCount, setUnreadMessagesCount] = useState(0);

  useEffect(() => {
    // Simuler un délai pour le chargement de l'utilisateur connecté
    setTimeout(() => {
      const currentUser = localStorage.getItem('user');
      if (currentUser) {
        setUser(JSON.parse(currentUser)); // Définit l'utilisateur comme un objet parsé
      }
      setLoading(false); // Indique que le chargement est terminé
    }, 500); // Ajoute un délai de 500ms pour simuler le chargement
  }, []);

  useEffect(() => {
    const fetchUnreadMessagesCount = async () => {
      try {
        const token = localStorage.getItem('x-auth-token');
        const response = await axios.get('http://localhost:3001/api/messages/unread-count', {
          headers: { 'x-auth-token': token },
        });
        setUnreadMessagesCount(response.data.unreadCount);
      } catch (error) {
        console.error('Failed to fetch unread messages count:', error);
      }
    };

    fetchUnreadMessagesCount();
  }, []);

  return (
    <>
      {/* Header */}
      <header className="site-header">
        <div className="header-content">
          <div className="logo">
          <Link href={'/'}>
            <img src="/logo.png" alt="Logo" />
            </Link>
          </div>
          <nav className="header-nav">
            <a href="/features">Features</a>
            {user && (
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
              </>
            )}
          </nav>
          <div className="header-buttons">
            {loading ? null : user ? ( 
              <Link href={'/profile'}>
                <button className="profile-button">Mon Profil</button>
              </Link>
            ) : (
              <>
                <Link href={'/login'}>
                  <button className="login-button">Log in</button>
                </Link>
                <Link href={'/register'}>
                  <button className="register-button">Register</button>
                </Link>
              </>
            )}
          </div>
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
              <h4>Mobile app</h4>
              <a href="/features">Features</a>
              <a href="/live-share">Live Share</a>
              <a href="/video-record">Video record</a>
            </div>
            <div className="footer-column">
              <h4>Community</h4>
              <a href="/featured-artists">Featured artists</a>
              <a href="/portal">The Portal</a>
              <a href="/live-events">Live events</a>
            </div>
            <div className="footer-column">
              <h4>Company</h4>
              <a href="/about-us">About us</a>
              <a href="/contact">Contact us</a>
              <a href="/history">History</a>
            </div>
          </div>
        </div>
        {/* Section des réseaux sociaux en dessous de la ligne */}
        <div className="footer-social-section">
          <hr />
          <div className="footer-social">
            <span>Follow us:</span>
            <img src="/facebook.png" alt="Facebook" />
            <img src="/insta.png" alt="Instagram" />
            <img src="/twitter.png" alt="Twitter" />
          </div>
          <p className="footer-bottom">&copy; Photo, Inc. 2024. We love our users!</p>
        </div>
      </footer>
    </>
  );
}
