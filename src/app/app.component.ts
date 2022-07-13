import { AfterViewInit, Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import "@geoman-io/leaflet-geoman-free";
import "leaflet-measure-path";
import { Observable, Subscriber } from 'rxjs';
import { environment } from '../environments/environment';

import "@geoman-io/leaflet-geoman-free";
import "leaflet-measure-path";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  title = 'my-first-project';
  map: any;
  customTranslation = {
    tooltips: {
      placeMarker: "Chấm dể vẽ điểm",
      firstVertex: "Click to place first vertex",
      continueLine: "Click to continue drawing",
      finishLine: "Click any existing marker to finish",
      finishPoly: "Click first marker to finish",
      finishRect: "Chấm để kết thúc",
      startCircle: "Click to place circle center",
      finishCircle: "Click to finish circle",
      placeCircleMarker: "Click to place circle marker",
      placeText: "Click to place text"
    },
    actions: {
      finish: "Kết thúc",
      cancel: "Hủy",
      removeLastVertex: "Xóa điểm gần nhất"
    },
    buttonTitles: {
      drawMarkerButton: "Vẽ Marker",
      drawPolyButton: "Vẽ Polygons",
      drawLineButton: "Vẽ Polyline",
      drawCircleButton: "Vẽ Circle",
      drawRectButton: "Vẽ Rectangle",
      editButton: "Sửa Layers",
      dragButton: "Kéo Layers",
      cutButton: "Cut Layers",
      deleteButton: "Xóa Layers",
      drawCircleMarkerButton: "Vẽ Circle Marker",
      snappingButton: "Snap dragged marker to other layers and vertices",
      pinningButton: "Pin shared vertices together",
      rotateButton: "Xoay Layers",
      drawTextButton: "Vẽ Text"
    }
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    
  }
  public ngAfterViewInit(): void {
    this.loadMap();
    this.initMarkers();
    L.polygon([
      [46.8, -121.85],
      [46.92, -121.92],
      [46.87, -121.8]
    ]).addTo(this.map);
    this.map.pm.addControls({
      positions: {
        draw: "topright",
        edit: "topleft"
      },
      drawCircle: true
    });
    this.map.pm.setLang("en", this.customTranslation, "vi");
    this.map.pm.setGlobalOptions({ pinning: false, snappable: true });

    this.map.on("pm:create", (e: any) => {
      this.map.eachLayer(function (layer: any) {
        if (layer instanceof L.Polygon) {
        }
      });
    });
  }
  private getCurrentPosition(): any {
    return new Observable((observer: Subscriber<any>) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position: any) => {
          observer.next({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
          observer.complete();
        });
      } else {
        observer.error();
      }
    });
  }

  initMarkers() {
    const homeCoords = {
      lat: 23.810331,
      lon: 90.412521
    };
    const popupText = "Some popup text";
    const markerIcon = {
      icon: L.icon({
        iconSize: [25, 41],
        iconAnchor: [10, 41],
        popupAnchor: [2, -40],
        // specify the path here
        iconUrl: "https://unpkg.com/leaflet@1.4.0/dist/images/marker-icon.png",
        shadowUrl: "https://unpkg.com/leaflet@1.4.0/dist/images/marker-shadow.png"
      })
    };
    const popupInfo = `<b style="color: red; background-color: white">${popupText}</b>`;

    L.marker([homeCoords.lat, homeCoords.lon], markerIcon)
      .addTo(this.map)
      .bindPopup(popupInfo);
  }

  private loadMap(): void {
    this.map = L.map('map').setView([0, 0], 1);
    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      id: 'mapbox/streets-v11',
      tileSize: 512,
      zoomOffset: -1,
      accessToken: environment.mapbox.accessToken,
    }).addTo(this.map);


    this.getCurrentPosition()
    .subscribe((position: any) => {
      // this.map.flyTo([position.latitude, position.longitude], 13);
      const icon = L.icon({
        iconUrl: 'https://res.cloudinary.com/rodrigokamada/image/upload/v1637581626/Blog/angular-leaflet/marker-icon.png',
        shadowUrl: 'https://res.cloudinary.com/rodrigokamada/image/upload/v1637581626/Blog/angular-leaflet/marker-shadow.png',
        popupAnchor: [13, 0],
      });

      const marker = L.marker([position.latitude, position.longitude], { icon }).bindPopup('Angular Leaflet');
      marker.addTo(this.map);
    });
  }
}
