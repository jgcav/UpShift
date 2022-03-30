import MapView, { Polyline, PROVIDER_GOOGLE, Polygon } from "react-native-maps";
import { View, StyleSheet } from "react-native";
import { useState, useEffect, useRef } from "react";
import { useAuth } from "../contexts/AuthContext";
export const SavedRoutes = ({ route }) => {
  const _map = useRef(null);
  const { currentUser } = useAuth();
  const userId = currentUser.uid;
  const [points, setPoints] = useState(route.params.location);
  const [drawMethod, setDrawMethod] = useState("Polyline");

  const [selectedPlace, setSelectedPlace] = useState({
    lat: route.params.location[0].latitude,
    lng: route.params.location[0].longitude,
  });

  useEffect(() => {
    if (_map.current) {
      _map.current.animateCamera({
        center: {
          latitude: selectedPlace.lat,
          longitude: selectedPlace.lng,
        },
        zoom: 14,
      });
    }
  }, [selectedPlace]);

  return (
    <View>
      <View style={styles.map}>
        <MapView
          mapType={"terrain"}
          zoomTapEnabled={false}
          ref={_map}
          customMapStyle={mapStyle}
          style={{ height: "100%", width: "100%" }}
          provider={PROVIDER_GOOGLE}
          showsUserLocation={true}
          loadingEnabled={true}
          showsTraffic={true}
        >
          {points.length < 2 ? null : drawMethod === "Polyline" ? (
            <Polygon coordinates={points} strokeWidth={5} strokeColor="black" />
          ) : (
            <Polyline
              coordinates={points}
              strokeWidth={5}
              strokeColor="black"
            />
          )}
        </MapView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  map: {
    zIndex: 1,
  },
});

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
