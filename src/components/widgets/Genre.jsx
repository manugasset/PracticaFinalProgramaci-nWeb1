'use client';

const ALL_GENRES = [
  'acoustic', 'afrobeat', 'alt-rock', 'alternative', 'ambient', 'anime',
  'black-metal', 'bluegrass', 'blues', 'bossanova', 'brazil', 'breakbeat',
  'british', 'cantopop', 'chicago-house', 'children', 'chill', 'classical',
  'club', 'comedy', 'country', 'dance', 'dancehall', 'death-metal',
  'deep-house', 'detroit-techno', 'disco', 'disney', 'drum-and-bass', 'dub',
  'dubstep', 'edm', 'electro', 'electronic', 'emo', 'folk', 'forro', 'french',
  'funk', 'garage', 'german', 'gospel', 'goth', 'grindcore', 'groove',
  'grunge', 'guitar', 'happy', 'hard-rock', 'hardcore', 'hardstyle',
  'heavy-metal', 'hip-hop', 'house', 'idm', 'indian', 'indie', 'indie-pop',
  'industrial', 'iranian', 'j-dance', 'j-idol', 'j-pop', 'j-rock', 'jazz',
  'k-pop', 'kids', 'latin', 'latino', 'malay', 'mandopop', 'metal',
  'metal-misc', 'metalcore', 'minimal-techno', 'movies', 'mpb', 'new-age',
  'new-release', 'opera', 'pagode', 'party', 'philippines-opm', 'piano', 'pop',
  'pop-film', 'post-dubstep', 'power-pop', 'progressive-house', 'psych-rock',
  'punk', 'punk-rock', 'r-n-b', 'rainy-day', 'reggae', 'reggaeton',
  'road-trip', 'rock', 'rock-n-roll', 'rockabilly', 'romance', 'sad', 'salsa',
  'samba', 'sertanejo', 'show-tunes', 'singer-songwriter', 'ska', 'sleep',
  'songwriter', 'soul', 'soundtracks', 'spanish', 'study', 'summer', 'swedish',
  'synth-pop', 'tango', 'techno', 'trance', 'trip-hop', 'turkish', 'work-out',
  'world-music',
];

import { useState, useMemo } from 'react';

export default function Genre({ selectedGenres, onChange }) {

  const [query, setQuery] = useState('');

  //Buscador de géneros
  const filteredGenres = useMemo(() => {
    if (!query) return ALL_GENRES;
    return ALL_GENRES.filter((g) =>

      g.toLowerCase().includes(query.toLowerCase())

    );
  }, [query]);

  //Función para seleccionar/deseleccionar géneros
  const toggleGenre = (genre) => {
    const exists = selectedGenres.includes(genre);

    if (exists) {

      onChange(selectedGenres.filter((g) => g !== genre));

    } else {

      if (selectedGenres.length >= 5) return;
      onChange([...selectedGenres, genre]);

    }
  };

  const isSelected = (genre) => selectedGenres.includes(genre);

  //Devolvemos el renderizado del componente
  return (

    <section className="bg-gray-900 rounded-lg border border-gray-800 p-4 space-y-3">
        <div className="flex items-center justify-between">
            <h3 className="text-sm font-mono text-white">Géneros</h3>
            <span className="text-xs font-mono text-gray-400">{selectedGenres.length}/5 seleccionados</span>
        </div>

      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Buscar género..."
        className="w-full px-3 py-2 rounded-md bg-gray-800 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-green-500"
      />

      <div className="max-h-52 overflow-y-auto space-y-1">
        {filteredGenres.length > 0 ? (
            filteredGenres.map((genre) => (

                <button
                key={genre}
                type="button"
                onClick={() => toggleGenre(genre)}
                className={`w-full px-2 py-1.5 rounded-md cursor-pointer text-left text-xs font-mono transition
                    ${
                    isSelected(genre)
                        ? 'bg-green-600/30 border border-green-500 text-green-100'
                        : 'bg-gray-800 hover:bg-gray-700 border border-transparent text-gray-100'
                    }`}
                >
                {genre}
                </button>
            ))
        ) : (

          <p className="text-xs font-mono text-gray-500">Sin resultados.</p>

        )}
      </div>

      {selectedGenres.length > 0 && (
        <div className="pt-2 border-t border-gray-800">

          <p className="text-xs font-mono text-gray-400 mb-1">Seleccionados:</p>

          <div className="flex flex-wrap gap-2">
            {selectedGenres.map((genre) => (
                <span key={genre} className="text-[11px] px-2 py-1 rounded-full bg-green-500/20 text-green-300 border border-green-500/40">
                    {genre}
                </span>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
