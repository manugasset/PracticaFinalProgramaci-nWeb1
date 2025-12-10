'use client';
import TrackCard from '@/components/TrackCard';

export default function PlaylistDisplay({ tracks, title = 'Tu playlist', onClear }) {

    return (
        <section className="w-full h-full flex flex-col rounded-lg bg-gray-900 border-l border-gray-800">

            <div className="px-4 py-3 border-b border-gray-800 flex items-center justify-between">
                <div>
                    <h2 className="text-lg font-mono text-white">{title}</h2>
                    <p className="text-xs font-mono text-gray-400">{tracks?.length || 0} canciones</p>
                </div>

                {onClear && (
                    <button type="button" onClick={onClear} className="cursor-pointer text-xs px-3 py-1 rounded-full border border-gray-600 text-gray-200 hover:bg-gray-800 font-mono">
                        Clear
                    </button>
                )}
            </div>

            <div className="flex-1 overflow-y-auto px-4 py-3 space-y-2">
                {tracks && tracks.length > 0 ? (
                    tracks.map(track => (
                        <TrackCard key={track.id} track={track} />
                    ))
                ) : (

                    <p className="text-sm font-mono text-gray-500">Ajusta los widgets de la izquierda para generar tu playlist.</p>

                )}
            </div>
        </section>
  );
}
