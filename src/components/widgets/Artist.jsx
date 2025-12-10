'use client';

import { useState, useEffect } from 'react';
import { getAccessToken } from '@/lib/auth';

export default function Artist({ selectedArtists, onChange }) {

  //Para el input de búsqueda y resultados
  const [query, setQuery] = useState('');
  //Para la lista de artistas que nos va a devolver la API de Spotify
  const [results, setResults] = useState([]);
  //Para buscar
  const [loading, setLoading] = useState(false);

  //Efecto para buscar artistas cuando cambia el query
  useEffect(() => {
    if (!query) {

      setResults([]);
      return;

    }

    //Token de acceso
    const token = getAccessToken();
    const handler = setTimeout(async () => {

      //Buscamos en la API de Spotify
    try {
        setLoading(true);
        const res = await fetch(`https://api.spotify.com/v1/search?type=artist&q=${encodeURIComponent(query)}&limit=10`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        //Guardamos los resultados (los artistas)
        const data = await res.json();
        setResults(data.artists?.items || []);
      } catch (e) {

        console.error(e);
        setResults([]);

      } finally {

        setLoading(false);

      }
    }, 400);

    return () => clearTimeout(handler);
  }, [query]);

    //Función para añadir o quitar artistas seleccionados
    const toggleArtist = (artist) => {

      const exists = selectedArtists.some((a) => a.id === artist.id);

      if (exists) {

        onChange(selectedArtists.filter((a) => a.id !== artist.id));

      } else {

        if (selectedArtists.length >= 5) return;
        onChange([...selectedArtists, artist]);

      }
    };

  const isSelected = (id) => selectedArtists.some((artist) => artist.id === id);

  //Devuelvo el componente, con el estilo que mas me gustaba
  return (
    <section className="bg-gray-900 rounded-lg border border-gray-800 p-4 space-y-3">
      <div className="flex items-center justify-between">
          <h3 className="text-sm font-mono text-white">Artistas</h3>
          <span className="text-xs font-mono text-gray-400">{selectedArtists.length}/5 seleccionados</span>
      </div>

      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Buscar artista..."
        className="w-full px-3 py-2 rounded-md bg-gray-800 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-green-500"
      />

      <div className="max-h-52 overflow-y-auto space-y-1">
        {loading && (<p className="text-xs font-mono text-gray-400">Buscando...</p>)}
        {!loading && results.map((artist) => (
            <button 
                key={artist.id} 
                type="button" 
                onClick={() => toggleArtist(artist)} 
                className={`w-full cursor-pointer flex items-center gap-3 px-2 py-1.5 rounded-md text-left text-xs transition
                ${
                  isSelected(artist.id)
                    ? 'bg-green-600/30 border border-green-500'
                    : 'bg-gray-800 hover:bg-gray-700 border border-transparent'
                }`}
            >
              <img src={artist.images?.[0]?.url || null} alt={artist.name} className="w-8 h-8 rounded-full object-cover flex-shrink-0"/>
              <span className="text-gray-100 truncate"> {artist.name} </span>
            </button>
            ))}

        {!loading && query && results.length === 0 && (

          <p className="text-xs font-mono text-gray-500">Sin resultados.</p>

        )}
      </div>

      {selectedArtists.length > 0 && (
        <div className="pt-2 border-t border-gray-800">
          <p className="text-xs font-mono text-gray-400 mb-1">
            Seleccionados:
          </p>
          <div className="flex flex-wrap gap-2">
            {selectedArtists.map((artist) => (
              <span
                key={artist.id}
                className="text-[11px] px-2 py-1 rounded-full bg-green-500/20 text-green-300 border border-green-500/40"
              >
                {artist.name}
              </span>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
