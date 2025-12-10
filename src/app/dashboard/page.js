'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import PlaylistDisplay from '@/components/PlaylistDisplay';
import { getCurrentUser, generatePlaylist } from '@/lib/spotify';

export default function Dashboard() {

  const [user, setUser] = useState(null);
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const data = await getCurrentUser();
      setUser(data);
    };
    fetchUser();
  }, []);

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const preferences = {
        artists: [],
        genres: [],
        decades: [],
        popularity: [0, 100],
      };

      const playlistTracks = await generatePlaylist(preferences);
      setTracks(playlistTracks);

    } finally {

      setLoading(false);

    }
  };

  const handleClear = () => setTracks([]);

  return (

    <div className="min-h-screen bg-black text-white">
      <Header user={user} />

      <main className="max-w-6xl mx-auto px-4 py-6 grid grid-cols-1 lg:grid-cols-[2fr,minmax(0,2fr)] gap-6">

        <section className="space-y-4">

          <button onClick={handleGenerate} className="cursor-pointer mt-4 px-4 py-2 rounded-full bg-green-500 hover:bg-green-600 text-black font-mono text-sm">
            {loading ? 'Generando...' : 'Generar playlist'}
          </button>

        </section>

        <PlaylistDisplay tracks={tracks} onClear={handleClear} />
      </main>
    </div>
  );
}
