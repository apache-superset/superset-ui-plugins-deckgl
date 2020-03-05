import { fitBounds } from '@math.gl/web-mercator';
import computeBoundsFromPoints from './computeBoundsFromPoints';

type Viewport = {
  longtitude: number;
  latitude: number;
  zoom: number;
  bearing?: number;
  pitch?: number;
};

export default function fitViewport(
  originalViewPort: Viewport,
  {
    points,
    width,
    height,
    minExtent,
    maxZoom,
    offset,
    padding = 20,
  }: {
    points: [number, number][];
    width: number;
    height: number;
    minExtent?: number;
    maxZoom?: number;
    offset?: [number, number];
    padding?: number;
  },
) {
  try {
    const { bearing, pitch } = originalViewPort;

    return {
      ...fitBounds({
        bounds: computeBoundsFromPoints(points),
        width,
        height,
        minExtent,
        maxZoom,
        offset,
        padding,
      }),
      bearing,
      pitch,
    };
  } catch (error) {
    /* eslint no-console: 0 */
    console.error('Could not auto zoom', error);

    return originalViewPort;
  }
}
