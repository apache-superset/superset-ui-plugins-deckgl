import { extent as d3Extent } from 'd3-array';

const PADDING = 0.25;
const GEO_BOUNDS = {
  LAT_MAX: 90,
  LAT_MIN: -90,
  LNG_MAX: 180,
  LNG_MIN: -180,
};

/**
 * Get the latitude bounds if latitude is a single coordinate
 * @param latExt Latitude range
 */
function getLatBoundsForSingleCoordinate(latExt: [number, number]) {
  const latMin =
    latExt[0] - PADDING < GEO_BOUNDS.LAT_MIN ? GEO_BOUNDS.LAT_MIN : latExt[0] - PADDING;
  const latMax =
    latExt[1] + PADDING > GEO_BOUNDS.LAT_MAX ? GEO_BOUNDS.LAT_MAX : latExt[1] + PADDING;

  return [latMin, latMax];
}

/**
 * Get the longitude bounds if longitude is a single coordinate
 * @param lngExt Longitude range
 */
function getLngBoundsForSingleCoordinate(lngExt: [number, number]) {
  const lngMin =
    lngExt[0] - PADDING < GEO_BOUNDS.LNG_MIN ? GEO_BOUNDS.LNG_MIN : lngExt[0] - PADDING;
  const lngMax =
    lngExt[1] + PADDING > GEO_BOUNDS.LNG_MAX ? GEO_BOUNDS.LNG_MAX : lngExt[1] + PADDING;

  return [lngMin, lngMax];
}

export default function computeBoundsFromPoints(points: [number, number][]) {
  const latExt = d3Extent(points, ([a, lat]: [number, number]) => lat) as [number, number];
  const lngExt = d3Extent(points, ([lng, b]: [number, number]) => lng) as [number, number];
  const latBounds = latExt[0] === latExt[1] ? getLatBoundsForSingleCoordinate(latExt) : latExt;
  const lngBounds = lngExt[0] === lngExt[1] ? getLngBoundsForSingleCoordinate(lngExt) : lngExt;

  return [
    [lngBounds[0], latBounds[0]],
    [lngBounds[1], latBounds[1]],
  ];
}
