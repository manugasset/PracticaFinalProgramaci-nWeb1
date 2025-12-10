'use client';

export default function TrackCard({ track }) {

    //Obtenemos la imagen del álbum y los nombres de los artistas
    const image = track?.album?.images?.[0]?.url || '';
    const artistNames = track?.artists?.map(a => a.name).join(', ');

    //Devolvemos la tarjeta de la canción
    return (
        <div className="w-full flex items-center gap-3 px-3 py-2 rounded-md bg-gray-900 hover:bg-gray-800 border border-gray-800 transition">
            <img src={image} alt={track?.name || 'Track cover'} className="w-12 h-12 rounded object-cover flex-shrink-0"/>

            <div className="flex-1 flex flex-col overflow-hidden">
                <p className="text-sm font-semibold text-white truncate">{track?.name}</p>
                <p className="text-xs text-gray-400 truncate">{artistNames}</p>
            </div>
            <button type="button" className="flex items-center justify-center w-8 h-8 rounded-full bg-green-500 hover:bg-green-600 text-black text-xs font-bold">
                ▶
            </button>
        </div>
  );
}
