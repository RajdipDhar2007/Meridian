import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, useMap, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { motion } from 'framer-motion';
import type { GeoLocation } from '@/types/weather';
import { reverseGeocode } from '@/services/geocoding';

// Default Leaflet marker assets are broken by bundlers; point at CDN copies instead.
const markerIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

function ClickHandler({ onPick }: { onPick: (lat: number, lon: number) => void }) {
  useMapEvents({
    click(e) {
      onPick(e.latlng.lat, e.latlng.lng);
    },
  });
  return null;
}

/** Keeps the Leaflet view synced whenever the location changes elsewhere in
 * the app (search, "locate me", etc). react-leaflet only honours `center`
 * on first mount, so without this the map silently stays put and the pin
 * has to be found manually. */
function RecenterMap({ lat, lon }: { lat: number; lon: number }) {
  const map = useMap();
  useEffect(() => {
    map.flyTo([lat, lon], Math.max(map.getZoom(), 9), { animate: true, duration: 0.9 });
  }, [lat, lon, map]);
  return null;
}

export function LocationMap({
  location,
  onLocationChange,
}: {
  location: GeoLocation;
  onLocationChange: (loc: GeoLocation) => void;
}) {
  const [resolving, setResolving] = useState(false);

  async function handlePick(lat: number, lon: number) {
    setResolving(true);
    try {
      const resolved = await reverseGeocode(lat, lon);
      onLocationChange(resolved);
    } finally {
      setResolving(false);
    }
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      className="glass-panel relative overflow-hidden rounded-[2rem] p-2"
    >
      <div className="flex items-center justify-between px-3 py-2">
        <h2 className="font-display text-lg">Pick a spot on the map</h2>
        {resolving && <span className="font-mono text-xs text-cloud/50">Locating…</span>}
      </div>
      <div className="h-72 w-full overflow-hidden rounded-3xl sm:h-96">
        <MapContainer
          center={[location.latitude, location.longitude]}
          zoom={9}
          scrollWheelZoom
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            attribution='&copy; OpenStreetMap contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker
            position={[location.latitude, location.longitude]}
            icon={markerIcon}
            draggable
            eventHandlers={{
              dragend: (e) => {
                const marker = e.target as L.Marker;
                const pos = marker.getLatLng();
                void handlePick(pos.lat, pos.lng);
              },
            }}
          />
          <ClickHandler onPick={handlePick} />
          <RecenterMap lat={location.latitude} lon={location.longitude} />
        </MapContainer>
      </div>
      <p className="px-3 py-2 font-mono text-[11px] text-cloud/50">
        Tap or click anywhere, or drag the pin to refresh conditions for that spot.
      </p>
    </motion.section>
  );
}
