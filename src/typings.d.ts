import { polygon, tileLayer } from 'leaflet';
import * as geojson from 'geojson';

declare module 'leaflet' {
  namespace tileLayer {
    interface BingOptions extends TileLayerOptions {
      bingMapsKey?: string;
      imagerySet?: 'Aerial'|'AerialWithLabels'|'AerialWithLabelsOnDemand'|'CanvasDark'|'CanvasLight'|'CanvasGray'|'Road'|
        'RoadOnDemand'|'OrdnanceSurvey';
      culture?: string;
      style?: string;
    }

    export function bing(options: string|BingOptions): TileLayer;
  }

  export class Polygon1<P = any> extends Polyline<geojson.Polygon | geojson.MultiPolygon, P> {
    constructor(latlngs: LatLngExpression[] | LatLngExpression[][] | LatLngExpression[][][], options?: PolylineOptions);
    showMeasurements() : this;
    updateMeasurements(): this;
  }

  export function polygon(latlngs: LatLngExpression[] | LatLngExpression[][] | LatLngExpression[][][], options?: PolylineOptions): Polygon1
}