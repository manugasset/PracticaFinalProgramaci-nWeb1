'use client';

import { useRouter } from 'next/navigation';
import { logout } from '@/lib/auth';

export default function Header({ user }) {

  //Uso de useRouter para que podamos redirigir a la página principal al hacer logout
  const router = useRouter();

  //Función para volver a la página principal al hacer logout
  const handleLogout = () => {
    logout();
    router.push('/');
  };

  //Obtenemos el avatar y el nombre de usuario
  const avatar = user?.images?.[0]?.url || null;
  const displayName = user?.display_name || user?.id || 'Usuario';

  //Devolvemos el heade con un título, el avatar y nombre de usuario, y el botón de logout
  return (
    <header className="w-full bg-gray-900 border-b border-gray-800">
        <div className="max-w-5xl mx-auto grid grid-cols-3 px-4 py-3">

            <div className="flex items-center gap-2">
                <img src="/favicon.ico" alt="Logo" className="w-8 h-8" />
                <h1 className="text-lg font-mono text-white">Spotify Taste Mixer</h1>
            </div>

            
            <div className="flex items-center justify-center gap-2">
                <img src={avatar} alt={displayName} className="w-9 h-9 rounded-full object-cover"/>
                <span className="text-sm text-white max-w-[140px] truncate font-mono">{displayName}</span>
            </div>
            <div className='flex justify-end'>
                <button onClick={handleLogout} className="px-4 py-2 rounded-full bg-red-500 hover:bg-red-700 cursor-pointer text-white text-xs font-mono transition">
                    Logout
                </button>
            </div>
            
        </div>
    </header>
  );
}