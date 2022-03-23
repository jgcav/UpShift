import MapView, { Polyline, PROVIDER_GOOGLE } from "react-native-maps";
import { View, StyleSheet } from "react-native";
import { useState, useEffect, useRef } from "react";
import GooglePlacesInput from "./GooglePlacesInput";
import fetchGeoCode from "./api";

export const RoutePlanner = () => {
  const _map = useRef(null);
  const [points, setPoints] = useState([]);

  const [inputLocation, setInputLocation] = useState("");

  //used for moving camera once search iput recivied
  useEffect(() => {
    if (_map.current) {
      _map.current.animateCamera({
        // center: {
        //   latitude: geocodeResult.position.lat,
        //   longitude: geocodeResult.position.lng,
        // },
        zoom: 15,
      });
    }
  }, []);

  const drawPolyLine = (e) => {
    const latitude = Number(e.nativeEvent.coordinate.latitude);
    const longitude = Number(e.nativeEvent.coordinate.longitude);
    setPoints((currentState) => [
      ...currentState,
      {
        latitude,
        longitude,
      },
    ]);
  };

  return (
    <View>
      <View style={styles.searchbar}>
        <GooglePlacesInput />
      </View>

      <View style={styles.map}>
        <MapView
          ref={_map}
          customMapStyle={mapStyle}
          style={{ height: "100%", width: "100%" }}
          provider={PROVIDER_GOOGLE}
          showsUserLocation={true}
          onPress={drawPolyLine}
          loadingEnabled={true}
          //UI buttons?
          showsTraffic={true}
          showsMyLocationButton={true}
        >
          {points.length < 2 ? null : (
            <Polyline
              coordinates={points}
              strokeWidth={3}
              strokeColor="black"
            />
          )}
        </MapView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  searchbar: {
    zIndex: 2,
  },
  map: {
    zIndex: 1,
  },
});

//simple silver map style taken from google
const mapStyle = [
  {
    elementType: "geometry",
    stylers: [
      {
        color: "#f5f5f5",
      },
    ],
  },
  {
    elementType: "labels.icon",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#616161",
      },
    ],
  },
  {
    elementType: "labels.text.stroke",
    stylers: [
      {
        color: "#f5f5f5",
      },
    ],
  },
  {
    featureType: "administrative.land_parcel",
    elementType: "labels",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "administrative.land_parcel",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#bdbdbd",
      },
    ],
  },
  {
    featureType: "poi",
    elementType: "geometry",
    stylers: [
      {
        color: "#eeeeee",
      },
    ],
  },
  {
    featureType: "poi",
    elementType: "labels.text",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "poi",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#757575",
      },
    ],
  },
  {
    featureType: "poi.business",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "poi.park",
    elementType: "geometry",
    stylers: [
      {
        color: "#e5e5e5",
      },
    ],
  },
  {
    featureType: "poi.park",
    elementType: "labels.text",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "poi.park",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#9e9e9e",
      },
    ],
  },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [
      {
        color: "#ffffff",
      },
    ],
  },
  {
    featureType: "road.arterial",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#757575",
      },
    ],
  },
  {
    featureType: "road.highway",
    elementType: "geometry",
    stylers: [
      {
        color: "#dadada",
      },
    ],
  },
  {
    featureType: "road.highway",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#616161",
      },
    ],
  },
  {
    featureType: "road.local",
    elementType: "labels",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "road.local",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#9e9e9e",
      },
    ],
  },
  {
    featureType: "transit.line",
    elementType: "geometry",
    stylers: [
      {
        color: "#e5e5e5",
      },
    ],
  },
  {
    featureType: "transit.station",
    elementType: "geometry",
    stylers: [
      {
        color: "#eeeeee",
      },
    ],
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [
      {
        color: "#c9c9c9",
      },
    ],
  },
  {
    featureType: "water",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#9e9e9e",
      },
    ],
  },
];
