'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { isAuthenticated, getSpotifyAuthUrl } from '@/lib/auth';

// Página de inicio de la aplicación que cuente con un texto y un botón para iniciar sesión con Spotify mediante una autenticación.
export default function Home() {
  const router = useRouter();

  const handleLogin = () => {
    window.location.href = getSpotifyAuthUrl();
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="text-center space-y-6">
        <h1 className="text-3xl md:text-4xl font-mono underline">Spotify Taste Mixer</h1>
        <p className="text-gray-300 font-mono">Inicia sesión con tu cuenta de Spotify y disfruta de playlists personalizadas.</p>
        <button onClick={handleLogin} className="px-6 py-3 cursor-pointer rounded-full bg-green-500 hover:bg-green-600 text-black font-mono transition">
          Iniciar sesión con Spotify
        </button>
      </div>
    </main>
  );
}
