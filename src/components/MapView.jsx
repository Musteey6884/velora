import React, { useCallback, useEffect, useRef } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

// MapView: ensures the Leaflet map invalidates size after creation so tiles render
export default function MapView({ points = [], cluster = true }) {
  const mapRef = useRef(null);
  const clusterRef = useRef(null);

  const onCreated = useCallback((map) => {
    mapRef.current = map;
    // Map created — invalidate and fit bounds below

    // Ensure proper sizing/rendering after mount — call invalidateSize a few times
    try {
      setTimeout(() => map.invalidateSize(), 200);
      setTimeout(() => map.invalidateSize(), 600);
      setTimeout(() => map.invalidateSize(), 1200);
    } catch (e) {
      // ignore
    }

    // If we have points, try to fit bounds so markers are visible
    try {
      if (points && points.length) {
        const coords = points.map((p) => [p.lat || 0, p.lng || 0]);
        if (coords.length === 1) {
          map.setView(coords[0], 12);
        } else {
          // fitBounds with small padding
          map.fitBounds(coords, { padding: [50, 50], maxZoom: 14 });
        }
      }
    } catch (e) {
      // ignore fit errors
    }
  }, [points]);

  useEffect(() => {
    // If the map exists, trigger an invalidate on updates (e.g., when points change)
    if (mapRef.current) {
      try {
        mapRef.current.invalidateSize();
        // also try a delayed invalidate to catch transitions
        setTimeout(() => { try { mapRef.current.invalidateSize(); } catch (e) {} }, 300);
      } catch (e) {}
    }
  }, [points]);

  useEffect(() => {
    // try to load clustering plugin dynamically when enabled
    let mounted = true;
    async function loadCluster() {
      if (!cluster) return;
      try {
        const L = await import('leaflet');
        // import markercluster JS and CSS (if available)
        await import('leaflet.markercluster');
        await import('leaflet.markercluster/dist/MarkerCluster.css');
        await import('leaflet.markercluster/dist/MarkerCluster.Default.css');
        if (!mounted) return;
        if (mapRef.current && L && L.markerClusterGroup) {
          // create cluster group and add to map
          const mcg = L.markerClusterGroup();
          clusterRef.current = mcg;
          mapRef.current.addLayer(mcg);
        }
      } catch (e) {
        // clustering not available; silently continue
        clusterRef.current = null;
      }
    }
    loadCluster();
    return () => { mounted = false; if (clusterRef.current && mapRef.current) try { mapRef.current.removeLayer(clusterRef.current); } catch (e) {} };
  }, [cluster]);

  // markers management: create/remove L.marker instances and add to either cluster group or map
  const markersRef = useRef([]);
  useEffect(() => {
    let mounted = true;
    async function updateMarkers() {
      if (!mapRef.current) return;
      const L = await import('leaflet');

      // remove existing markers
      try {
        if (markersRef.current && markersRef.current.length) {
          markersRef.current.forEach((m) => {
            try {
              if (clusterRef.current && clusterRef.current.hasLayer && clusterRef.current.hasLayer(m)) clusterRef.current.removeLayer(m);
              else mapRef.current.removeLayer(m);
            } catch (e) {}
          });
        }
      } catch (e) {}
      markersRef.current = [];

      // create markers and add to appropriate layer
      for (const p of points || []) {
        try {
          const lat = p.lat || 0;
          const lng = p.lng || 0;
          const marker = L.marker([lat, lng]);
          // simple popup HTML
          const title = p.title ? `<div style="font-weight:600;margin-bottom:6px">${String(p.title)}</div>` : '';
          const city = p.city ? `<div style="font-size:12px;color:rgba(255,255,255,0.8)">${String(p.city)}</div>` : '';
          const img = p.photo ? `<img src="${p.photo}" alt="${p.title||'photo'}" style="width:120px;height:56px;object-fit:cover;border-radius:6px;display:block;margin-bottom:6px"/>` : '';
          const viewLink = p.id ? `<a href="#/listings/${p.id}" style="display:inline-block;padding:6px 10px;background:rgba(212,175,55,0.12);color:var(--gold-strong);border-radius:6px;text-decoration:none;margin-top:6px">View</a>` : '';
          const popupHtml = `<div style="max-width:220px">${img}${title}${city}${viewLink}</div>`;
          marker.bindPopup(popupHtml);

          if (clusterRef.current && clusterRef.current.addLayer) {
            clusterRef.current.addLayer(marker);
          } else {
            marker.addTo(mapRef.current);
          }
          markersRef.current.push(marker);
        } catch (e) {
          // skip marker errors
        }
      }

      // fit bounds to markers
      try {
        const coords = markersRef.current.map((m) => m.getLatLng());
        if (coords && coords.length) {
          if (coords.length === 1) mapRef.current.setView(coords[0], 12);
          else mapRef.current.fitBounds(coords, { padding: [50, 50], maxZoom: 14 });
        }
      } catch (e) {}
    }
    updateMarkers();
    return () => { mounted = false; /* cleanup handled above when re-running */ };
  }, [points, cluster]);

  return (
    <div className="w-full h-80 rounded overflow-hidden" role="region" aria-label="Map showing listings">
      {/* Non-JS fallback */}
      <noscript>
        <div className="p-4 muted">Map requires JavaScript to be enabled.</div>
      </noscript>

      <MapContainer
        center={[0, 0]}
        zoom={2}
        scrollWheelZoom
        style={{ height: '100%', width: '100%' }}
        whenCreated={onCreated}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {points.map((p, i) => (
          <Marker key={i} position={[p.lat || 0, p.lng || 0]}>
            <Popup>
              <div className="max-w-xs">
                <div className="flex items-start gap-3">
                  {p.photo ? (
                    // eslint-disable-next-line jsx-a11y/img-redundant-alt
                    <img src={p.photo} alt={p.title || 'Listing photo'} className="w-20 h-14 object-cover rounded" />
                  ) : (
                    <div className="w-20 h-14 bg-gray-200 rounded flex items-center justify-center muted text-xs">No image</div>
                  )}

                  <div className="flex-1">
                    {p.title && <div className="text-sm font-semibold mb-1">{p.title}</div>}
                    {p.city && <div className="text-xs muted">{p.city}</div>}
                    <div className="mt-2">
                      {p.id ? (
                        <a className="inline-block px-2 py-1 text-xs btn-gold rounded" href={`#/listings/${p.id}`}>View</a>
                      ) : (
                        <span className="text-xs muted">No details</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}