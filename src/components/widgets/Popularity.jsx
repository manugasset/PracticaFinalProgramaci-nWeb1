'use client';

//La const LEVELS son distintos niveles de popularidad para filtrar canciones
const LEVELS = [

  { id: 'very-mainstream', label: 'Muy mainstream', range: [80, 100] },
  { id: 'mainstream',      label: 'Mainstream',      range: [60, 80] },
  { id: 'popular',         label: 'Popular',         range: [40, 60] },
  { id: 'alternative',     label: 'Alternativo',     range: [20, 40] },
  { id: 'underground',     label: 'Underground',     range: [0, 20]  },

];

export default function Popularity({ selectedRange, onChange }) {

  //Definimos el rango de popularidad seleccionado
  const isSelected = (range) =>
    selectedRange &&
    selectedRange[0] === range[0] &&
    selectedRange[1] === range[1];

  const handleClick = (range) => {
    if (isSelected(range)) {

      onChange([0, 100]);

    } else {

      onChange(range);

    }
  };

  //Devolvemos el renderizado del componente Popularity
  return (

    <section className="bg-gray-900 rounded-lg border border-gray-800 p-4 space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-mono text-white">Popularidad</h3>
        <span className="text-xs font-mono text-gray-400">{selectedRange ? `${selectedRange[0]}–${selectedRange[1]}` : '0–100'}</span>
      </div>

      <div className="grid grid-cols-1 gap-2">
        {LEVELS.map((level) => (
          <button
            key={level.id}
            type="button"
            onClick={() => handleClick(level.range)}
            className={`w-full px-3 py-1.5 cursor-pointer rounded-md text-xs font-mono text-left transition
              ${
                isSelected(level.range)
                  ? 'bg-green-600/30 border border-green-500 text-green-100'
                  : 'bg-gray-800 hover:bg-gray-700 border border-transparent text-gray-100'
              }`}
          >
            {level.label} <span className="text-[10px] text-gray-400">({level.range[0]}–{level.range[1]})</span>
          </button>
        ))}
      </div>
    </section>
  );
}
