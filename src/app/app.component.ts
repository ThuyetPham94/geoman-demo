import { Component } from "@angular/core";
import "leaflet/dist/leaflet.css";
import * as L from "leaflet";

import "@geoman-io/leaflet-geoman-free";
import "@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.css";

import "leaflet-measure-path";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  map: L.Map;
  homeCoords = {
    lat: 23.810331,
    lon: 90.412521
  };

  popupText = "Some popup text";

  markerIcon = {
    icon: L.icon({
      iconSize: [25, 41],
      iconAnchor: [10, 41],
      popupAnchor: [2, -40],
      // specify the path here
      iconUrl: "https://unpkg.com/leaflet@1.4.0/dist/images/marker-icon.png",
      shadowUrl: "https://unpkg.com/leaflet@1.4.0/dist/images/marker-shadow.png"
    })
  };

  options = {
    layers: [
      L.tileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 18,
        attribution: ""
      })
    ],
    zoom: 12,
    center: L.latLng(46.8, -121.85)
  };

  initMarkers() {
    const popupInfo = `<b style="color: red; background-color: white">${this.popupText}</b>`;

    L.marker([this.homeCoords.lat, this.homeCoords.lon], this.markerIcon)
      .addTo(this.map)
      .bindPopup(popupInfo);
  }

  drawnItems: L.FeatureGroup = L.featureGroup();

  drawOptions = {
    position: "topright",
    draw: {
      marker: false,
      polyline: false,
      circle: false,
      circlemarker: false,
      rectangle: false,
      polygon: false
    }
  };

  public onDrawCreated(e: any) {
    this.drawnItems.addLayer((e as L.DrawEvents.Created).layer);
    // console.log(e.layer.toGeoJSON());
  }

  onMapReady(map: L.Map) {
    this.map = map;
    // Do stuff with map
    this.initMarkers();

    L.polygon([
      [46.8, -121.85],
      [46.92, -121.92],
      [46.87, -121.8]
    ])
      .addTo(this.map)
      .showMeasurements();

    map.pm.setLang("de");
    const customTranslation = {
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
    };
    map.pm.setLang("en", customTranslation, "vi");
    map.pm.setGlobalOptions({ pinning: false, snappable: true });
    map.pm.addControls({
      positions: {
        draw: "topright",
        edit: "topleft"
      },
      drawCircle: true
    });

    map.on("pm:drawstart", ({ workingLayer }) => {
      // console.log(workingLayer.toGeoJSON(), '---')
      // workingLayer.setText(feature.properties.label);
      workingLayer.on("pm:snapdrag", (e) => {
        this.map.eachLayer(function (layer) {
          if (layer instanceof L.Polygon) {
            // console.log(layer.toGeoJSON());
          }
        });
      });
    });

    map.on("pm:create", (e: any) => {
      this.map.eachLayer(function (layer) {
        if (layer instanceof L.Polygon) {
          // layer.showMeasurements();
          // layer.setText('fefefe');
        }
      });
    });
    map.pm.disableGlobalEditMode();
    this.enableEdit();
  }

  enableEdit() {
    var selectedFeature = null;
    this.map.eachLayer(function (layer) {
      if (layer instanceof L.Polygon) {
        layer.on("click", function () {
          layer.pm.enable({
            allowEditing: true
          });
        });
        // console.log(layer);
        // layer.on("click", function (e) {
        //   if (selectedFeature) selectedFeature.editing.disable();
        //   selectedFeature = e.target;
        //   e.target.editing.enable();
        // });
      }
    });
  }
  polygonDrawer: L.Draw.Polygon = null;
  startDraw() {
    // const polygon_options = {
    //   showArea: false,
    //   shapeOptions: {
    //     stroke: true,
    //     color: "#6e83f0",
    //     weight: 4,
    //     opacity: 0.5,
    //     fill: true,
    //     fillColor: null, //same as color by default
    //     fillOpacity: 0.2,
    //     clickable: true
    //   }
    // };
    // this.polygonDrawer = new L.Draw.Polygon(this.map, polygon_options);
    // this.polygonDrawer.enable();

    this.map.pm.enableDraw("Polygon");
  }

  stopDraw() {
    this.map.eachLayer(function (layer) {
      if (layer instanceof L.Polygon) {
        if (layer) layer.pm.disable();
      }
    });
    this.polygonDrawer.disable();
  }

  removeLastDot() {
    this.polygonDrawer.deleteLastVertex();
  }

  clickLeaf(data) {
    // console.log(data)
    // data.layer.editing.enable();
    // this.drawnItems = L.featureGroup()
  }
}
