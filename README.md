<div align="center">

<img src="./docs/assets/banner.svg" alt="Meridian — Instrument-Panel Weather App" width="100%" />

<a href="https://github.com/RajdipDhar2007/meridian-weather">
  <img src="https://readme-typing-svg.demolab.com?font=Fira+Code&weight=600&size=22&duration=2800&pause=900&color=38BDF8&center=true&vCenter=true&width=720&lines=A+sky+that+actually+feels+the+weather+%E2%98%80%EF%B8%8F;Live+GPS+%E2%80%A2+Animated+dials+%E2%80%A2+Real+moon+phases+%F0%9F%8C%99;Zero+API+keys.+Zero+backend.+Pure+vibes.+%E2%9A%A1;Built+with+%E2%9D%A4%EF%B8%8F+by+RAJDIP+DHAR" alt="Typing animation" />
</a>

<br/>

[![License: MIT](https://img.shields.io/badge/License-MIT-fbbf24?style=for-the-badge)](./LICENSE)
[![React](https://img.shields.io/badge/React-18.3-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-11-FF0055?style=for-the-badge&logo=framer&logoColor=white)](https://www.framer.com/motion/)


</div>

<img src="./docs/assets/divider.svg" width="100%" alt="" />

## 🌌 What is Meridian?

> **Most weather apps show you numbers. Meridian shows you the *sky*.**

Meridian is a production-quality weather web app styled like a pilot's instrument panel. A live, GPS-driven sky repaints itself in real time — golden at dusk, star-strewn on clear nights, black and thundering in a storm — while buttery animated dials report everything from wind to the *exact* phase of the moon.

It runs entirely on free, keyless APIs ([Open-Meteo](https://open-meteo.com/) + [OpenStreetMap](https://www.openstreetmap.org/)) — **no API keys, no backend, no sign-up.** Clone it, run it, done.

## 📸 See It In Action

<div align="center">

<img src="./docs/screenshots/hero-night.png" alt="Meridian on a clear night in Tokyo — starfield, moon glow and 24-hour forecast" width="92%" />
<br/><sub>🌙 A clear night in Tokyo — twinkling stars, glowing moon, live 24-hour trend</sub>

<br/><br/>

<img src="./docs/screenshots/hero-day.png" alt="Meridian under an overcast London sky with drifting clouds" width="92%" />
<br/><sub>☁️ An overcast London sky — soft drifting clouds and a layered blue gradient</sub>

<br/><br/>

<img src="./docs/screenshots/instruments-night.png" alt="Instrument panel: wind compass, UV meter, pressure gauge, humidity fill, AQI and moon arc" width="92%" />
<br/><sub>🎛️ The instrument panel — wind compass, UV meter, pressure gauge, humidity fill, AQI &amp; exact moon phase</sub>

<br/><br/>

<img src="./docs/screenshots/instruments-showers.png" alt="Instrument panel and 7-day outlook for a showery tropical day" width="92%" />
<br/><sub>🌧️ A showery tropical day — 7-day outlook with rain probability</sub>

<br/><br/>

<img src="./docs/screenshots/mobile.png" alt="Meridian on a phone" width="30%" />
<br/><sub>📱 Fully responsive down to phone screens</sub>

</div>

<img src="./docs/assets/divider.svg" width="100%" alt="" />

## 📑 Table of Contents

- [📸 See It In Action](#-see-it-in-action)
- [✨ Features](#-features)
- [🎛️ The Instrument Panel](#️-the-instrument-panel)
- [🚀 Getting Started](#-getting-started)
- [🧰 Available Scripts](#-available-scripts)
- [🗂️ Folder Structure](#️-folder-structure)
- [🧠 Design & Architecture Notes](#-design--architecture-notes)
- [🛠️ Tech Stack](#️-tech-stack)
- [🤝 Contributing](#-contributing)
- [⭐ Show Some Love](#-show-some-love)
- [📜 License](#-license)

## ✨ Features

| | |
|---|---|
| 📍 **Auto GPS** | Locates you on load, with graceful manual search/map fallback if permission is denied |
| 🌡️ **Rich conditions** | Temperature, feels-like, humidity, dew point, pressure, wind speed/gusts/direction, cloud cover, visibility, UV, precipitation, air quality (AQI, PM2.5, PM10) |
| 🎛️ **Animated dials** | Temperature gauge, wind compass, UV meter, pressure gauge, humidity fill, AQI indicator, sun arc, moon arc + exact moon phase |
| 📈 **Forecasts** | 24-hour scrollable forecast with trend line, plus an expandable 7-day outlook |
| 🌧️ **Living sky** | Condition + time-of-day aware gradients, fluffy tone-shifting clouds, rain/snow/fog particles, lightning, twinkling stars |
| 🗺️ **Interactive map** | Click, drag the marker, or search to jump anywhere — the view auto-recenters |
| 🔎 **Smart search** | Debounced city/coordinate search with autosuggestions and recent locations |
| 🕐 **Local time** | Live clock for the selected place, plus a persistent home-location clock and "locate me" button |
| ♿ **Accessible** | Responsive glassmorphic UI for mobile, tablet and desktop, with `prefers-reduced-motion` support throughout |

## 🎛️ The Instrument Panel

| Instrument | What it tells you |
| --- | --- |
| 🌡️ Temperature Gauge | Current & feels-like temperature at a glance |
| 🧭 Wind Compass | Direction, speed and gusts on a live needle |
| ☀️ Sun Arc | A glowing marker sweeping today's sunrise → sunset |
| 🌙 Moon Arc | Tonight's span plus the *exact* phase, illumination % and name |
| 🕶️ UV Meter | UV index with risk level |
| 🧪 Pressure Gauge | Barometric pressure trend |
| 💧 Humidity Fill | A liquid fill that rises with humidity |
| 🌫️ AQI Indicator | Air quality with PM2.5 / PM10 |

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 18 or later
- npm (bundled with Node.js)

### Installation

```bash
git clone https://github.com/RajdipDhar2007/meridian-weather.git
cd meridian-weather
npm install
```

### Run locally

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser and let the sky greet you. 🌅

### 🔑 Zero config, zero keys

No API keys or environment variables are required — Open-Meteo's forecast, air-quality, and geocoding endpoints, plus OpenStreetMap tiles, are all free and unauthenticated.

## 🧰 Available Scripts

| Command           | Description                                              |
| ----------------- | -------------------------------------------------------- |
| `npm run dev`     | Starts a local dev server with hot reload                |
| `npm run build`   | Type-checks the project and builds for production (`dist/`) |
| `npm run preview` | Serves the production build locally for a final check    |
| `npm run lint`    | Runs ESLint across the project                           |

## 🗂️ Folder Structure

```text
src/
├── components/
│   ├── Background/      # sky, clouds, particles, stars, lightning
│   ├── CurrentWeather/  # hero section
│   ├── Forecast/        # hourly & weekly outlook
│   ├── Instruments/     # gauges, compass, sun/moon arcs, AQI
│   ├── Layout/          # logo, clocks, loading & error screens
│   ├── Map/             # Leaflet location map
│   └── Search/          # debounced search bar
├── hooks/               # useWeather, useClock, useGeolocation, useDebounce
├── services/            # Open-Meteo + geocoding clients
├── types/               # shared TypeScript types
└── utils/               # astronomy, theme resolver, time, formatting
```

## 🧠 Design & Architecture Notes

<details>
<summary><b>🕰️ Everything reads in the selected location's own local time</b></summary>

Open-Meteo returns naive timestamps that are already local to the queried place (no UTC offset attached); `utils/time.ts` treats these consistently as "local-as-UTC" instants instead of letting the browser reinterpret them through the device's timezone — the bug that used to skew sunrise/sunset, the hourly strip, and the day/night theme whenever you looked up a place in a different timezone from your own. `useClock` then renders a live, ticking clock in the hero section using the location's real IANA timezone.
</details>

<details>
<summary><b>🏠 Your own location is always one tap away</b></summary>

A persistent badge in the top-right corner shows your device's own local time at all times, independent of whatever place you're currently viewing, and doubles as a "return to my location" button that re-requests GPS and reloads.
</details>

<details>
<summary><b>🌦️ The sky is a layered, condition-and-time-aware system</b></summary>

`utils/theme.ts` + `components/Background/`, not a single background image swap. A resolver turns `(weather condition, time of day)` into a set of independent layers — sky gradient, cloud density/tone, rain/snow intensity, fog, lightning, stars — so rain-at-night and rain-at-noon, or a daytime overcast sky and a stormy black one, all render distinctly instead of sharing one look:

- Clouds are built from several overlapping soft blobs rather than flat ellipses, and recolor by context: white for fair/overcast skies, slate for snow, charcoal-black for rain and thunderstorms.
- Rain, snow, and fog are canvas-particle systems that dim and cool in tone at night versus brighter by day.
- Thunderstorms combine heavy dark clouds, heavy rain, and irregular full-scene lightning flashes with an occasional bolt silhouette — not just a flash with no precipitation.
- Clear nights and partly-cloudy nights show a twinkling star field; fully overcast, rainy, snowy, or foggy skies correctly hide the stars.
- All particle animation respects `prefers-reduced-motion`.
</details>

<details>
<summary><b>🌙 Sun and Moon share one instrument slot</b></summary>

They swap automatically with `current.isDay`: by day, `SunArc` sweeps a glowing marker across today's sunrise–sunset arc; by night, `MoonArc` sweeps across tonight's span and renders the *exact* current phase — computed from a real synodic-month calculation (not a lookup table) — as a proper limb-and-terminator SVG silhouette, alongside illumination % and phase name.
</details>

<details>
<summary><b>🗺️ The map always shows where you are</b></summary>

Leaflet's `center` prop only applies on first mount, so `LocationMap` includes a small `useMap()` helper that flies the view (and re-drops the pin) to the new coordinates any time the selected location changes — via search, GPS, or a map click/drag — instead of leaving you to hunt for the pin yourself.
</details>

<details>
<summary><b>🛡️ Resilient data layer</b></summary>

`services/openMeteo.ts` caches responses for 5 minutes, retries failed requests with backoff, and refreshes silently every 10 minutes; `useWeather` tracks in-flight requests so a fast second search can't be clobbered by a slower first one resolving late.
</details>

<details>
<summary><b>💾 Persistence</b></summary>

Recently viewed locations are saved to `localStorage` and surfaced in the search dropdown.
</details>

## 🛠️ Tech Stack

<div align="center">

![React](https://img.shields.io/badge/React_18-20232A?style=flat-square&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white)
![Tailwind](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-FF0055?style=flat-square&logo=framer&logoColor=white)
![Leaflet](https://img.shields.io/badge/Leaflet-199900?style=flat-square&logo=leaflet&logoColor=white)
![OpenStreetMap](https://img.shields.io/badge/OpenStreetMap-7EBC6F?style=flat-square&logo=openstreetmap&logoColor=white)
![Lucide](https://img.shields.io/badge/Lucide_Icons-F56565?style=flat-square&logo=lucide&logoColor=white)

</div>

- **Framework:** React 18 + TypeScript
- **Build tool:** Vite
- **Styling:** Tailwind CSS
- **Animation:** Framer Motion
- **Maps:** Leaflet + React-Leaflet
- **Icons:** Lucide React
- **Data:** [Open-Meteo](https://open-meteo.com/) (forecast, air quality, geocoding) + [OpenStreetMap](https://www.openstreetmap.org/) (tiles)

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. 🍴 Fork the repository
2. 🌿 Create a feature branch (`git checkout -b feature/your-feature`)
3. 💾 Commit your changes (`git commit -m 'Add some feature'`)
4. 🚀 Push to the branch (`git push origin feature/your-feature`)
5. 🎉 Open a pull request

Please run `npm run lint` and `npm run build` before submitting a PR.

## ⭐ Show Some Love

<div align="center">

<img src="./docs/assets/divider.svg" width="100%" alt="" />

### If Meridian made you say *"ooh, pretty"* even once…

## **please drop a ⭐ on the repo!**

It costs nothing, takes one second, and genuinely motivates me to keep building and shipping more open-source projects like this.

<a href="https://github.com/RajdipDhar2007/meridian-weather/stargazers">
  <img src="https://img.shields.io/badge/%E2%AD%90_Star_this_repo-f472b6?style=for-the-badge&logoColor=white" alt="Star this repo" height="44" />
</a>
&nbsp;
<a href="https://github.com/RajdipDhar2007/meridian-weather/fork">
  <img src="https://img.shields.io/badge/%F0%9F%8D%B4_Fork_it-38bdf8?style=for-the-badge&logoColor=white" alt="Fork this repo" height="44" />
</a>
&nbsp;
<a href="https://github.com/RajdipDhar2007/meridian-weather/issues/new">
  <img src="https://img.shields.io/badge/%F0%9F%90%9B_Report_a_bug-fbbf24?style=for-the-badge&logoColor=white" alt="Report a bug" height="44" />
</a>

</div>

## 📜 License

Distributed under the MIT License. See [`LICENSE`](./LICENSE) for details.

<img src="./docs/assets/divider.svg" width="100%" alt="" />

<div align="center">

<img src="./docs/assets/footer.svg" alt="Made with love by RAJDIP DHAR — A RAJDIP DHAR Project" width="100%" />

<a href="https://github.com/RajdipDhar2007">
  <img src="https://readme-typing-svg.demolab.com?font=Fira+Code&weight=500&size=18&duration=3500&pause=1200&color=FBBF24&center=true&vCenter=true&width=620&lines=Thanks+for+stopping+by+%E2%9C%A8;If+it+made+you+smile%2C+a+%E2%AD%90+would+make+my+day;See+you+under+the+next+sky+%E2%98%81%EF%B8%8F%F0%9F%8C%99%E2%98%80%EF%B8%8F" alt="Thanks for stopping by" />
</a>

[![Built by](https://img.shields.io/badge/Built_by-RAJDIP_DHAR-f472b6?style=for-the-badge&logo=github&logoColor=white)](https://github.com/RajdipDhar2007)
[![Made with](https://img.shields.io/badge/Made_with-❤️_React_+_TypeScript-38bdf8?style=for-the-badge)](https://react.dev/)
[![Powered by](https://img.shields.io/badge/Powered_by-Open--Meteo-fbbf24?style=for-the-badge)](https://open-meteo.com/)
[![Email](https://img.shields.io/badge/Say_hi-rajdipdharcode@gmail.com-EA4335?style=for-the-badge&logo=gmail&logoColor=white)](mailto:rajdipdharcode@gmail.com)

<sub>© 2026 RAJDIP DHAR · A RAJDIP DHAR Project · MIT Licensed</sub>

</div>
