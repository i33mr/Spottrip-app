import * as Location from "expo-location";

// ~10 meters in lat and lng
const tenMetersWithDegrees = 0.0001;

const getLocation = (increment) => {
  return {
    timestamp: 10000000,
    coords: {
      speed: 0,
      heading: 0,
      accuracy: 5,
      altitudeAccuracy: 5,
      altitude: 5,
      // longitude: -122.0312186 + increment * tenMetersWithDegrees,
      // latitude: 37.33233141 + increment * tenMetersWithDegrees,
      latitude: 3.15887 + increment * tenMetersWithDegrees,
      longitude: 101.711309 + increment * tenMetersWithDegrees,
    },
  };
};

let counter = 0;

setInterval(() => {
  // () => {
  Location.EventEmitter.emit("Expo.locationChanged", {
    watchId: Location._getCurrentWatchId(),
    location: getLocation(counter),
  });
  // };
  // Activate counter if we want to move the location
  // counter++;
}, 1000);
