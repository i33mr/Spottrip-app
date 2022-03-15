import createDataContext from "./createDataContext";
import spottripAPI from "../api/spottripAPI";
import * as Notifications from "expo-notifications";
import moment from "moment";

const notificationReducer = (state, action) => {
  switch (action.type) {
    case "set_token":
      return { ...state, token: action.payload };
    default:
      return state;
  }
};

const setNotificationToken = (dispatch) => (token) => {
  dispatch({ type: "set_token", payload: token });
};

const addLocalNotification = (dispatch) => async (tour) => {
  try {
    console.log(tour.title);
    await Notifications.scheduleNotificationAsync({
      content: {
        title: tour.title,
        body: "Your tour just began!",
        data: { screen: "ActiveTour", _id: tour._id, tourTitle: tour.title },
      },
      // trigger: { date: Date.now() + 10 * 1000 },
      trigger: { date: moment(Date.now()).add(5, "seconds").valueOf() },
    });

    await Promise.all(
      tour.attractions.map(async (attraction, index) => {
        if (index < tour.attractions.length - 1) {
          console.log(
            tour.title,
            moment(Date.now())
              .add(Math.round(attraction.startsAt), "minutes")
              .add(Math.round(attraction._id.time), "minutes")
              .subtract(5, "minutes")
              .valueOf()
          );
          // if (
          //   moment(tour.startTime)
          //     .add(Math.round(attraction.startsAt), "minutes")
          //     .add(Math.round(attraction._id.time), "minutes")
          //     .subtract(5, "minutes")
          //     .valueOf() -
          //     Date.now() >
          //   0
          // ) {
          await Notifications.scheduleNotificationAsync({
            content: {
              title: tour.title,
              body: `You should start moving to ${
                tour.attractions[index + 1]._id.name
              } within 5 minutes!`,
              data: { screen: "ActiveTour", _id: tour._id, tourTitle: tour.title },
              sound: true,
            },

            trigger: {
              date: moment(Date.now())
                .add(Math.round(attraction.startsAt), "minutes")
                .add(Math.round(attraction._id.time), "minutes")
                .subtract(5, "minutes")
                .valueOf(),
            },
          });
          // }
        }
      })
    );
  } catch (error) {
    console.log(error);
  }

  // dispatch({ type: "add_notification", payload: notification });

  // console.log(await Notifications.getAllScheduledNotificationsAsync());

  // cancelScheduledNotificationAsync;
  // cancelAllScheduledNotificationAsync;
  // Notifications.getAllScheduledNotificationsAsync
};

// called on fetch tours and signIn
const getAllNotifications = (dispatch) => async () => {
  console.log(await Notifications.getAllScheduledNotificationsAsync());
};

const resetLocalNotifications = (dispatch) => async (tours) => {
  try {
    await Notifications.cancelAllScheduledNotificationsAsync();

    // make sure that tours are active and the notification time is greater than the current time
    await Promise.all(
      tours.map(async (tour) => {
        console.log("tour.enableNotifications", tour.enableNotifications);
        if (tour.status === "Active" && tour.enableNotifications) {
          if (moment(tour.startTime).add(10, "seconds").valueOf() - Date.now() - 5 > 0) {
            // console.log(tour.title);
            // console.log(moment(tour.startTime).add(10, "seconds").valueOf());
            await Notifications.scheduleNotificationAsync({
              content: {
                title: tour.title,
                body: "Your tour just began!",
                data: { screen: "ActiveTour", _id: tour._id, tourTitle: tour.title },
              },
              // trigger: { date: Date.now() + 10 * 1000 },
              trigger: { date: moment(tour.startTime).add(5, "seconds").valueOf() },
            });
          }
        }
      })
    );
    tours.map(async (tour) => {
      if (tour.status === "Active" && tour.enableNotifications) {
        await Promise.all(
          tour.attractions.map(async (attraction, index) => {
            if (index < tour.attractions.length - 1) {
              if (
                moment(tour.startTime)
                  .add(Math.round(attraction.startsAt), "minutes")
                  .add(Math.round(attraction._id.time), "minutes")
                  .subtract(5, "minutes")
                  .valueOf() -
                  Date.now() >
                0
              ) {
                // console.log("true");
                await Notifications.scheduleNotificationAsync({
                  content: {
                    title: tour.title,
                    body: `You should start moving to ${
                      tour.attractions[index + 1]._id.name
                    } within 5 minutes!`,
                    data: { screen: "ActiveTour", _id: tour._id, tourTitle: tour.title },
                    sound: true,
                  },
                  // trigger: { date: Date.now() + 10 * 1000 },

                  trigger: {
                    date: moment(tour.startTime)
                      .add(Math.round(attraction.startsAt), "minutes")
                      .add(Math.round(attraction._id.time), "minutes")
                      .subtract(5, "minutes")
                      .valueOf(),
                  },
                });
              }
            }
          })
        );
      }
    });
    // tours.forEach((tour) => {
    //   if (tour.status === "Active") {
    //     await Notifications.scheduleNotificationAsync({
    //       content: {
    //         title: tour.title,
    //         body: "Your tour just began!",
    //         data: { tourId: tour._id },
    //       },
    //       trigger: { date: moment(tour.startTime).add(10, "seconds") },
    //     });
    //   }
    // });
    console.log("resetLocalNotifications");
  } catch (error) {
    console.log(error);
  }
};

export const { Provider, Context } = createDataContext(
  notificationReducer,
  { setNotificationToken, addLocalNotification, resetLocalNotifications, getAllNotifications },
  { token: "" }
);
