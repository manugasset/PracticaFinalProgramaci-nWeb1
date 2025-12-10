'use client';

const MOODS = ['Happy', 'Sad', 'Energetic', 'Calm', 'Focus'];

export default function Mood({ selectedMoods, onChange }) {

  //Función para seleccionar un mood
  const toggleMood = (mood) => {
    const exists = selectedMoods.includes(mood);

    if (exists) {

      onChange(selectedMoods.filter((m) => m !== mood));

    } else {

      if (selectedMoods.length >= 5) return;
      onChange([...selectedMoods, mood]);

    }
  };

  const isSelected = (mood) => selectedMoods.includes(mood);

  //Devolvemos el renderizado del componente mood
  return (
    <section className="bg-gray-900 rounded-lg border border-gray-800 p-4 space-y-3">
        <div className="flex items-center justify-between">
            <h3 className="text-sm font-mono text-white">Mood</h3>
            <span className="text-xs font-mono text-gray-400">{selectedMoods.length}/5 seleccionados</span>
        </div>

        <div className="grid grid-cols-2 gap-2">
            {MOODS.map((mood) => (
            <button
                key={mood}
                type="button"
                onClick={() => toggleMood(mood)}
                className={`px-3 py-1.5 rounded-md text-xs font-mono cursor-pointer transition
                ${
                    isSelected(mood)
                    ? 'bg-green-600/30 border border-green-500 text-green-100'
                    : 'bg-gray-800 hover:bg-gray-700 border border-transparent text-gray-100'
                }`}>
                {mood}
            </button>
            ))}
        </div>

        {selectedMoods.length > 0 && (
            <div className="pt-2 border-t border-gray-800">
                <p className="text-xs font-mono text-gray-400 mb-1">Seleccionados:</p>
                <div className="flex flex-wrap gap-2">
                    {selectedMoods.map((mood) => (
                        <span key={mood} className="text-[11px] px-2 py-1 rounded-full bg-green-500/20 text-green-300 border border-green-500/40">
                            {mood}
                        </span>
                    ))}
                </div>
            </div>
        )}
    </section>
  );
}
