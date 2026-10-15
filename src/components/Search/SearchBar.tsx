import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, MapPin, Clock, Loader2 } from 'lucide-react';
import type { GeoLocation } from '@/types/weather';
import { searchLocations } from '@/services/geocoding';
import { useDebounce } from '@/hooks/useDebounce';

const COORD_PATTERN = /^\s*(-?\d{1,3}(?:\.\d+)?)\s*,\s*(-?\d{1,3}(?:\.\d+)?)\s*$/;

export function SearchBar({
  onSelect,
  recents,
}: {
  onSelect: (location: GeoLocation) => void;
  recents: GeoLocation[];
}) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<GeoLocation[]>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const debounced = useDebounce(query, 350);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const coordMatch = debounced.match(COORD_PATTERN);
    if (coordMatch) {
      setResults([
        {
          latitude: parseFloat(coordMatch[1]),
          longitude: parseFloat(coordMatch[2]),
          name: `${coordMatch[1]}, ${coordMatch[2]}`,
        },
      ]);
      return;
    }
    if (debounced.trim().length < 2) {
      setResults([]);
      return;
    }
    let cancelled = false;
    setLoading(true);
    searchLocations(debounced)
      .then((r) => !cancelled && setResults(r))
      .catch(() => !cancelled && setResults([]))
      .finally(() => !cancelled && setLoading(false));
    return () => {
      cancelled = true;
    };
  }, [debounced]);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  function handleSelect(loc: GeoLocation) {
    onSelect(loc);
    setQuery('');
    setResults([]);
    setOpen(false);
  }

  const showRecents = open && query.trim().length === 0 && recents.length > 0;
  const showResults = open && results.length > 0;

  return (
    <div ref={containerRef} className="relative w-full">
      <div className="glass-panel flex items-center gap-2.5 rounded-full px-4 py-2.5">
        <Search className="h-4 w-4 text-cloud/50" aria-hidden />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setOpen(true)}
          placeholder="Search city, region, or coordinates"
          aria-label="Search for a location"
          className="w-full bg-transparent text-sm text-cloud placeholder:text-cloud/40 focus:outline-none"
        />
        {loading && <Loader2 className="h-4 w-4 animate-spin text-cloud/50" aria-hidden />}
      </div>

      <AnimatePresence>
        {(showRecents || showResults) && (
          <motion.ul
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            className="glass-panel-solid absolute z-20 mt-2 w-full overflow-hidden rounded-2xl"
            role="listbox"
          >
            {showRecents &&
              recents.map((loc, i) => (
                <li key={`recent-${i}`}>
                  <button
                    onClick={() => handleSelect(loc)}
                    className="flex w-full items-center gap-2.5 px-4 py-2.5 text-left text-sm hover:bg-white/10"
                  >
                    <Clock className="h-3.5 w-3.5 text-cloud/40" aria-hidden />
                    <span>{loc.name}{loc.admin1 ? `, ${loc.admin1}` : ''}</span>
                  </button>
                </li>
              ))}
            {showResults &&
              results.map((loc, i) => (
                <li key={`result-${i}`}>
                  <button
                    onClick={() => handleSelect(loc)}
                    className="flex w-full items-center gap-2.5 px-4 py-2.5 text-left text-sm hover:bg-white/10"
                  >
                    <MapPin className="h-3.5 w-3.5 text-brass" aria-hidden />
                    <span>
                      {loc.name}
                      {loc.admin1 ? `, ${loc.admin1}` : ''}
                      {loc.country ? ` · ${loc.country}` : ''}
                    </span>
                  </button>
                </li>
              ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
