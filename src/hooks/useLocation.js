import { useState, useEffect } from "react";
import { Accuracy, requestForegroundPermissionsAsync, watchPositionAsync } from "expo-location";

export default (shouldTrack, callback) => {
  // console.log("HOOOK");
  const [locationErr, setLocationErr] = useState(null);

  // const [subscriber, setSubscriber] = useState(null);
  // console.log(shouldTrack);
  useEffect(() => {
    // console.log("HOOOK2");

    let subscriber;
    const startWatching = async () => {
      try {
        const { granted } = await requestForegroundPermissionsAsync();
        if (!granted) {
          throw new Error("Location permission not granted");
        }
        subscriber = await watchPositionAsync(
          {
            accuracy: Accuracy.BestForNavigation,
            // timeInterval: 1000,
            distanceInterval: 100,
          },
          // (location) => {
          //   // callback(location);
          //   console.log("location", location);
          // }
          callback
        );
      } catch (err) {
        setLocationErr(err);
      }
    };

    if (shouldTrack) {
      startWatching();
    } else {
      // stop watching
      if (subscriber) {
        subscriber.remove();
      }
      subscriber = null;
    }

    return () => {
      if (subscriber) {
        subscriber.remove();
      }
    };
  }, [shouldTrack, callback]);
  return [locationErr];
};
