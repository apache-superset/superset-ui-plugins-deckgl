type Point = [number, number];

/** Format originally used by the Polygon plugin */
type CustomPolygonFeature = {
  polygon: Point[];
};

/**
 * Format that is geojson standard
 * https://geojson.org/geojson-spec.html
 */
type GeojsonPolygonFeature = {
  polygon: {
    type: 'Feature';
    geometry: {
      type: 'Polygon';
      coordinates: Point[][];
    };
  };
};

function isCustomPolygonFeature(
  feature: CustomPolygonFeature | GeojsonPolygonFeature,
): feature is CustomPolygonFeature {
  return Array.isArray(feature.polygon);
}

export default function getPointsFromPolygon(
  feature: CustomPolygonFeature | GeojsonPolygonFeature,
) {
  return isCustomPolygonFeature(feature)
    ? feature.polygon
    : feature.polygon.geometry.coordinates[0];
}
