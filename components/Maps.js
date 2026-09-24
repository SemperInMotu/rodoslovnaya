'use client';

import { useEffect } from 'react';

function loadLeaflet() {
  if (window.L) return Promise.resolve(window.L);
  return new Promise((resolve, reject) => {
    if (!document.getElementById('leaflet-css')) {
      const link = document.createElement('link');
      link.id = 'leaflet-css';
      link.rel = 'stylesheet';
      link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
      document.head.appendChild(link);
    }
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
    script.async = true;
    script.onload = () => resolve(window.L);
    script.onerror = () => reject(new Error('Leaflet failed to load'));
    document.head.appendChild(script);
  });
}

function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export function Maps() {
  useEffect(() => {
    const nests = [...document.querySelectorAll('[data-nest-map]')];
    const migrations = [...document.querySelectorAll('[data-migration-map]')];
    if (!nests.length && !migrations.length) return;

    loadLeaflet()
      .then((L) => {
        nests.forEach((el) => {
          if (el.dataset.mounted) return;
          let points = [];
          try {
            points = JSON.parse(el.getAttribute('data-nests') || '[]');
          } catch {
            points = [];
          }
          if (!points.length) return;
          const map = L.map(el, {
            zoomControl: false,
            attributionControl: false,
            scrollWheelZoom: false,
            dragging: !L.Browser.mobile,
          });
          L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { className: 'nest-tiles', maxZoom: 18 }).addTo(map);
          const bounds = points.map((n) => {
            const icon = L.divIcon({
              className: `nest-pin${n.hyp ? ' nest-pin--hyp' : ''}`,
              html: `<div class="nest-pin__inner"><i class="nest-pin__dot"></i><span class="nest-pin__label">${escapeHtml(n.name)}</span></div>`,
              iconSize: [1, 1],
              iconAnchor: [0, 0],
            });
            return L.marker([n.lat, n.lng], { icon }).addTo(map).getLatLng();
          });
          if (bounds.length === 1) map.setView(bounds[0], 8);
          else map.fitBounds(L.latLngBounds(bounds).pad(0.35));
          el.dataset.mounted = '1';
        });

        migrations.forEach((el) => {
          if (el.dataset.mounted) return;
          let stops = [];
          try {
            stops = JSON.parse(el.getAttribute('data-stops') || '[]');
          } catch {
            stops = [];
          }
          if (stops.length < 2) return;
          const map = L.map(el, { zoomControl: true, attributionControl: false, scrollWheelZoom: false, dragging: true });
          L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { className: 'nest-tiles', maxZoom: 18 }).addTo(map);
          map.zoomControl.setPosition('topright');
          const latlngs = stops.map((s) => [s.lat, s.lng]);
          L.polyline(latlngs, { color: '#6f5643', weight: 3, opacity: 0.9, dashArray: '7 9', lineJoin: 'round' }).addTo(map);
          const bounds = stops.map((s) => {
            const icon = L.divIcon({
              className: 'nest-pin nest-pin--path',
              html: `<div class="nest-pin__inner"><i class="nest-pin__dot"></i><span class="nest-pin__label"><b>${escapeHtml(s.year)}</b> ${escapeHtml(s.name)}</span></div>`,
              iconSize: [1, 1],
              iconAnchor: [0, 0],
            });
            return L.marker([s.lat, s.lng], { icon }).addTo(map).getLatLng();
          });
          map.fitBounds(L.latLngBounds(bounds).pad(0.28));
          el.dataset.mounted = '1';
        });
      })
      .catch(() => {});
  }, []);

  return null;
}
