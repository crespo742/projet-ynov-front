// /admin/layout.js
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLayout({ children }) {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('x-auth-token');
    const user = JSON.parse(localStorage.getItem('user'));    
    
    if (!token || !user || !user.isAdmin) {
      router.push('/login');  // Redirige vers la page de login si non admin
    }
  }, [router]);

  return (
    <div>
      <h1>Admin Panel</h1>
      {children}
    </div>
  );
}
