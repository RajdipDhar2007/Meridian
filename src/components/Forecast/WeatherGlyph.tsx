import { CloudFog, CloudLightning, CloudRain, CloudSnow, Cloud, Cloudy, Moon, Sun } from 'lucide-react';
import type { ConditionGroup } from '@/types/weather';

export function WeatherGlyph({
  group,
  isDay,
  className,
}: {
  group: ConditionGroup;
  isDay: boolean;
  className?: string;
}) {
  const props = { className, 'aria-hidden': true as const };
  switch (group) {
    case 'clear':
      return isDay ? <Sun {...props} /> : <Moon {...props} />;
    case 'partly-cloudy':
      return <Cloud {...props} />;
    case 'cloudy':
      return <Cloudy {...props} />;
    case 'fog':
      return <CloudFog {...props} />;
    case 'drizzle':
    case 'rain':
      return <CloudRain {...props} />;
    case 'thunderstorm':
      return <CloudLightning {...props} />;
    case 'snow':
      return <CloudSnow {...props} />;
    default:
      return <Cloud {...props} />;
  }
}
