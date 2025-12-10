'use client';

const DECADES = [
  '1950',
  '1960',
  '1970',
  '1980',
  '1990',
  '2000',
  '2010',
  '2020',
];

export default function Decade({ selectedDecades, onChange }) {

  const toggleDecade = (decade) => {
    const exists = selectedDecades.includes(decade);
    if (exists) {

      onChange(selectedDecades.filter((d) => d !== decade));

    } else {

      if (selectedDecades.length >= 5) return;
      onChange([...selectedDecades, decade]);

    }
  };

  const isSelected = (decade) => selectedDecades.includes(decade);

  return (

    <section className="bg-gray-900 rounded-lg border border-gray-800 p-4 space-y-3">
        <div className="flex items-center justify-between">
            <h3 className="text-sm font-mono text-white">Décadas</h3>
            <span className="text-xs font-mono text-gray-400">{selectedDecades.length}/5 seleccionadas</span>
        </div>

        <div className="grid grid-cols-2 gap-2">
            {DECADES.map((decade) => (
            <button
                key={decade}
                type="button"
                onClick={() => toggleDecade(decade)}
                className={`px-3 py-1.5 rounded-md cursor-pointer text-xs font-mono transition
                ${
                    isSelected(decade)
                    ? 'bg-green-600/30 border border-green-500 text-green-200'
                    : 'bg-gray-800 hover:bg-gray-700 border border-transparent text-gray-100'
                }`}
            >
                {decade}s
            </button>
            ))}
        </div>

      {selectedDecades.length > 0 && (
        <div className="pt-2 border-t border-gray-800">
          <p className="text-xs font-mono text-gray-400 mb-1">
            Seleccionadas:
          </p>
          <div className="flex flex-wrap gap-2">
            {selectedDecades.map((decade) => (
              <span
                key={decade}
                className="text-[11px] px-2 py-1 rounded-full bg-green-500/20 text-green-300 border border-green-500/40"
              >
                {decade}s
              </span>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
