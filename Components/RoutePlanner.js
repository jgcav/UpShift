import MapView, { Polyline, PROVIDER_GOOGLE, Polygon } from "react-native-maps";
import { View, StyleSheet, TextInput, SafeAreaView } from "react-native";
import { useState, useEffect, useRef } from "react";
import GooglePlacesInput from "./GooglePlacesInput";
import { snapToRoad } from "./api";
import { useAuth } from "../contexts/AuthContext";

import {
  SpeedDial,
  Overlay,
  Button,
  Input,
  Dialog,
  Tooltip,
  Text,
} from "@rneui/base";

import firebase from "../config/firebase";
import { doc, setDoc } from "firebase/firestore";
const db = firebase.firestore();

export const RoutePlanner = ({ route, navigation: { navigate } }) => {
  const _map = useRef(null);
  const { currentUser } = useAuth();
  const userId = currentUser.uid;
  const [points, setPoints] = useState([]);
  const [snapped, setSnapped] = useState(false);
  const [drawMethod, setDrawMethod] = useState("Polyline");
  const [routeName, setRouteName] = useState("");
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);

  const [test, setTest] = useState(true);

  const [selectedPlace, setSelectedPlace] = useState({
    lat: route.params.location.lat,
    lng: route.params.location.lng,
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
    const pointString = points.reduce((prev, curr, index) => {
      if (index === points.length - 1) {
        return prev + curr.latitude + "," + curr.longitude;
      }
      return (prev += curr.latitude + "," + curr.longitude + "|");
    }, "");

    snapToRoad(pointString).then((data) => {
      const snappedPoints = data.map((datum) => {
        return datum.location;
      });
      setPoints(snappedPoints);
    });
    setSnapped(true);
  };

  const resetPolygon = () => {
    setPoints([]);
  };

  const undoLastPoint = () => {
    setPoints(points.slice(0, -1));
  };

  const saveRoute = async () => {
    if (snapped && routeName.length > 0) {
      const route = { myRoute: points };
      try {
        const newroute = await setDoc(
          doc(db, `profiles/${userId}/routes/${routeName}`),
          route
        );
        return newroute;
      } catch (e) {
        console.log(e);
      }
    } else {
      console.log("please snap to road before saving");
    }
  };

  const returnToProfile = () => {
    saveRoute();
    navigate("Profile");
  };

  return (
    <View>
      <Overlay
        overlayStyle={{ margin: 40, borderRadius: 10 }}
        isVisible={test}
        onBackdropPress={() => {
          setTest(!test);
        }}
      >
        <View>
          <Text h4 h4Style={{ color: "white", padding: 10 }}>
            Frequent taps work best
          </Text>
          <Text h4 h4Style={{ color: "white", padding: 10 }}>
            Dont Zoom out too far
          </Text>
          <Text h4 h4Style={{ color: "white", padding: 10 }}>
            Before you save press and hold to snap the drawing to real time
            roads
          </Text>
        </View>

        <Button
          buttonStyle={{ margin: 15 }}
          title="Start Planning"
          onPress={() => {
            setTest(false);
          }}
        />
      </Overlay>

      <View style={styles.searchbar}>
        <GooglePlacesInput setSelectedPlace={setSelectedPlace} />
      </View>

      <SpeedDial
        color="black"
        style={styles.toolbar}
        isOpen={open}
        icon={{ name: "tune", color: "#fff" }}
        openIcon={{ name: "close", color: "#fff" }}
        onOpen={() => setOpen(!open)}
        onClose={() => setOpen(!open)}
      >
        <SpeedDial.Action
          color="black"
          icon={{ name: "clear", color: "#fff" }}
          title="clear"
          onPress={() => {
            resetPolygon(), setOpen(!open);
          }}
        />
        <SpeedDial.Action
          color="black"
          icon={{ name: "undo", color: "#fff" }}
          title="undo"
          onPress={() => {
            undoLastPoint(), setOpen(!open);
          }}
        />
        <SpeedDial.Action
          color="black"
          icon={{ name: "save", color: "#fff" }}
          title="save"
          onPress={() => {
            setVisible(!visible), setOpen(!open);
          }}
        />
        <SpeedDial.Action
          color="black"
          icon={{ name: "gesture", color: "#fff" }}
          title={`${drawMethod}`}
          onPress={() => {
            drawMethod === "Polyline"
              ? setDrawMethod("Polygon")
              : setDrawMethod("Polyline");
            setOpen(!open);
          }}
        />
      </SpeedDial>

      <View>
        <Dialog
          isVisible={visible}
          onBackdropPress={() => {
            setVisible(!visible);
          }}
        >
          <Input
            placeholder="Name this route"
            onChangeText={(e) => setRouteName(e)}
            returnKeyType="done"
            autoCapitalize="words"
            editable={true}
            color="white"
          />

          <Dialog.Button
            title="Save Route"
            color="white"
            onPress={returnToProfile}
          />
        </Dialog>
      </View>

      <View style={styles.map}>
        <MapView
          mapType={"terrain"}
          zoomTapEnabled={false}
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
        >
          {points.length < 2 ? null : drawMethod === "Polyline" ? (
            <Polygon coordinates={points} strokeWidth={3} strokeColor="black" />
          ) : (
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
  routename: {
    width: 500,
  },

  toolbar: {
    zIndex: 2,
    padding: 20,
  },
  searchbar: {
    zIndex: 2,
  },
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
