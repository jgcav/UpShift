import MapView, { Polyline, PROVIDER_GOOGLE, Polygon } from "react-native-maps";
import { View, StyleSheet } from "react-native";
import { useState, useEffect, useRef } from "react";
import GooglePlacesInput from "./GooglePlacesInput";
import { snapToRoad } from "./api";

export const RoutePlanner = () => {
  const _map = useRef(null);
  const [points, setPoints] = useState([]);

  const [selectedPlace, setSelectedPlace] = useState({
    lat: 53.480759,
    lng: -2.242631,
  });

  useEffect(() => {
    if (_map.current) {
      _map.current.animateCamera({
        center: {
          latitude: selectedPlace.lat,
          longitude: selectedPlace.lng,
        },
        zoom: 13,
      });
    }
  }, [selectedPlace]);

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

  const snapPoints = () => {
    let pointsString = "";
    points.forEach((point) => {
      pointsString += point.latitude + "," + point.longitude + "|";
    });
    const preppedPoints = pointsString.slice(0, -1);
    snapToRoad(preppedPoints).then((data) => {
      const snappedPoints = data.map((datum) => {
        return datum.location;
      });
      setPoints(snappedPoints);
    });
  };

  const resetPolygon = () => {
    console.log("reset");
    setPoints([]);
  };

  return (
    <View>
      <View style={styles.searchbar}>
        <GooglePlacesInput setSelectedPlace={setSelectedPlace} />
      </View>

      <View style={styles.map}>
        <MapView
          ref={_map}
          customMapStyle={mapStyle}
          style={{ height: "100%", width: "100%" }}
          provider={PROVIDER_GOOGLE}
          showsUserLocation={true}
          onPress={drawPolyLine}
          onLongPress={snapPoints}
          loadingEnabled={true}
          //UI buttons?
          showsTraffic={true}
          showsMyLocationButton={true}
        >
          {points.length < 2 ? null : (
            <Polygon
              coordinates={points}
              strokeWidth={3}
              strokeColor="black"
              tappable={true}
              onPress={resetPolygon}
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
