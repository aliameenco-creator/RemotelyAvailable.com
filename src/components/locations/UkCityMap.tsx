import { cn } from "@/lib/utils";

// Approximate [lat, lon] for every city in src/data/ukLocations.ts. The 75
// dots together sketch the shape of the UK, so no outline path is needed.
const cityCoords: Record<string, [number, number]> = {
  london: [51.507, -0.128],
  brighton: [50.827, -0.153],
  portsmouth: [50.805, -1.087],
  southampton: [50.91, -1.404],
  reading: [51.454, -0.978],
  "milton-keynes": [52.04, -0.76],
  oxford: [51.752, -1.258],
  slough: [51.511, -0.591],
  crawley: [51.113, -0.187],
  guildford: [51.236, -0.57],
  basingstoke: [51.266, -1.088],
  bristol: [51.454, -2.588],
  plymouth: [50.376, -4.143],
  bournemouth: [50.72, -1.88],
  swindon: [51.556, -1.78],
  exeter: [50.718, -3.534],
  gloucester: [51.865, -2.246],
  bath: [51.381, -2.36],
  cheltenham: [51.9, -2.073],
  norwich: [52.63, 1.297],
  peterborough: [52.573, -0.249],
  cambridge: [52.205, 0.122],
  ipswich: [52.056, 1.148],
  colchester: [51.889, 0.904],
  "southend-on-sea": [51.546, 0.708],
  chelmsford: [51.736, 0.479],
  luton: [51.879, -0.417],
  watford: [51.656, -0.39],
  "st-albans": [51.752, -0.339],
  leicester: [52.637, -1.14],
  nottingham: [52.954, -1.158],
  derby: [52.922, -1.476],
  northampton: [52.24, -0.902],
  lincoln: [53.234, -0.538],
  birmingham: [52.486, -1.89],
  coventry: [52.408, -1.51],
  "stoke-on-trent": [53.003, -2.179],
  wolverhampton: [52.587, -2.129],
  telford: [52.678, -2.445],
  walsall: [52.586, -1.982],
  worcester: [52.192, -2.22],
  leeds: [53.8, -1.549],
  sheffield: [53.381, -1.47],
  bradford: [53.796, -1.759],
  hull: [53.746, -0.336],
  york: [53.959, -1.082],
  huddersfield: [53.645, -1.785],
  doncaster: [53.523, -1.128],
  rotherham: [53.43, -1.357],
  wakefield: [53.683, -1.499],
  manchester: [53.481, -2.242],
  liverpool: [53.408, -2.992],
  salford: [53.488, -2.291],
  warrington: [53.39, -2.597],
  blackpool: [53.817, -3.035],
  preston: [53.763, -2.703],
  bolton: [53.578, -2.429],
  stockport: [53.408, -2.149],
  wigan: [53.545, -2.633],
  chester: [53.19, -2.891],
  newcastle: [54.978, -1.618],
  sunderland: [54.906, -1.381],
  middlesbrough: [54.574, -1.235],
  durham: [54.777, -1.576],
  glasgow: [55.864, -4.252],
  edinburgh: [55.953, -3.188],
  aberdeen: [57.15, -2.094],
  dundee: [56.462, -2.97],
  inverness: [57.478, -4.225],
  cardiff: [51.482, -3.179],
  swansea: [51.621, -3.944],
  newport: [51.584, -2.998],
  wrexham: [53.043, -2.993],
  belfast: [54.597, -5.93],
  derry: [54.997, -7.309],
};

const W = 280;
const H = 380;
const PAD = 24;

const lats = Object.values(cityCoords).map(([lat]) => lat);
const lons = Object.values(cityCoords).map(([, lon]) => lon);
const minLat = Math.min(...lats);
const maxLat = Math.max(...lats);
const minLon = Math.min(...lons);
const maxLon = Math.max(...lons);

function project([lat, lon]: [number, number]): [number, number] {
  const x = PAD + ((lon - minLon) / (maxLon - minLon)) * (W - PAD * 2);
  const y = PAD + ((maxLat - lat) / (maxLat - minLat)) * (H - PAD * 2);
  return [Math.round(x * 10) / 10, Math.round(y * 10) / 10];
}

interface UkCityMapProps {
  citySlug: string;
  cityName: string;
  className?: string;
}

// Static SVG constellation of all 75 service cities with the current one
// pulsing. Server component — CSS-only animation, no hydration.
export function UkCityMap({ citySlug, cityName, className }: UkCityMapProps) {
  const active = cityCoords[citySlug];
  if (!active) return null;

  const [ax, ay] = project(active);
  const labelLeft = ax > W * 0.55;

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className={cn("h-auto w-full max-w-[280px]", className)}
      role="img"
      aria-label={`Map of the UK highlighting ${cityName}`}
    >
      {Object.entries(cityCoords).map(([slug, coords]) => {
        if (slug === citySlug) return null;
        const [x, y] = project(coords);
        return (
          <circle
            key={slug}
            cx={x}
            cy={y}
            r={2.4}
            fill="var(--ra-cream-25)"
          />
        );
      })}

      {/* Active city: ping ring + solid dot + label */}
      <circle
        className="map-ping"
        cx={ax}
        cy={ay}
        r={7}
        fill="none"
        stroke="var(--ra-copper)"
        strokeWidth={2}
      />
      <circle cx={ax} cy={ay} r={4.5} fill="var(--ra-copper)" />
      <text
        x={labelLeft ? ax - 12 : ax + 12}
        y={ay + 4}
        textAnchor={labelLeft ? "end" : "start"}
        fill="var(--ra-cream)"
        fontSize={13}
        fontWeight={600}
        fontFamily="var(--font-display)"
      >
        {cityName}
      </text>
    </svg>
  );
}
