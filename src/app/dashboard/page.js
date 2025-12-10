'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import PlaylistDisplay from '@/components/PlaylistDisplay';
import { getCurrentUser, generatePlaylist } from '@/lib/spotify';
import Artist from '@/components/widgets/Artist';
import Decade from '@/components/widgets/Decade';
import Genre from '@/components/widgets/Genre';
import Mood from '@/components/widgets/Mood';
import Popularity from '@/components/widgets/Popularity';

export default function Dashboard() {

  //Constantes de estado del dashboard
  const [user, setUser] = useState(null);
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [preferences, setPreferences] = useState({
    artists: [],
    genres: [],
    decades: [],
    mood: [],
    popularity: [0, 100],
  });

//Obtener datos del usuario al cargar el dashboard
  useEffect(() => {
    const fetchUser = async () => {
      const data = await getCurrentUser();
      setUser(data);
    };
    fetchUser();
  }, []);

  //Manejamos la generacion de la playlist llamando a la funcion generatePlaylist de lib/spotify
  const handleGenerate = async () => {
    setLoading(true);
    try {
      const playlistTracks = await generatePlaylist(preferences);
      setTracks(playlistTracks);

    } finally {

      setLoading(false);

    }
  };

  //Manejamos el reseteo de las preferencias
  const handleClear = () => {
    setTracks([]);
    setPreferences({
      artists: [],
      genres: [],
      decades: [],
      mood: [],
      popularity: [0, 100],
    });
  };
  
  //Devolvemos la estructura del dashboard
  return (

    <div className="min-h-screen bg-black text-white">
      <Header user={user} />

      <main className="max-w-6xl px-4 py-6 grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-8">
        <section className="space-y-4 w-full max-w-sm">

          <Artist selectedArtists={preferences.artists} onChange={(artists) => setPreferences((prev) => ({ ...prev, artists }))}/>
          <Decade selectedDecades={preferences.decades} onChange={(decades) => setPreferences((prev) => ({ ...prev, decades }))}/>
          <Genre selectedGenres={preferences.genres} onChange={(genres) =>setPreferences((prev) => ({ ...prev, genres }))}/>
          <Mood selectedMoods={preferences.mood} onChange={(mood) => setPreferences((prev) => ({ ...prev, mood }))}/>
          <Popularity selectedRange={preferences.popularity} onChange={(range) => setPreferences((prev) => ({ ...prev, popularity: range }))}/>
          <button onClick={handleGenerate} className="cursor-pointer mt-4 px-4 py-2 rounded-full bg-green-500 hover:bg-green-600 text-black font-mono text-sm">
            {loading ? 'Generando...' : 'Generar playlist'}
          </button>

        </section>

        <PlaylistDisplay tracks={tracks} onClear={handleClear} />
      </main>
    </div>
  );
}
