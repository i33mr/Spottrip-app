import React from "react";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";

// import { FontAwesome5 } from "@expo/vector-icons";
import { Icon } from "react-native-elements";
import WelcomeScreen from "./src/screens/WelcomeScreen";
import SignInScreen from "./src/screens/SignInScreen";
import ResolveAuthScreen from "./src/screens/ResolveAuthScreen";
import SignupPersonalInfoScreen from "./src/screens/SignupPersonalInfoScreen";
import SignupChoosePreferencesScreen from "./src/screens/SignupChoosePreferencesScreen";
import SignupDoneScreen from "./src/screens/SignupDoneScreen";
import HomeScreen from "./src/screens/HomeScreen";
import SearchResultsScreen from "./src/screens/SearchResultsScreen";
import AttractionDetailScreen from "./src/screens/AttractionDetailScreen";
import TourCreateScreen from "./src/screens/TourCreateScreen";
// import TourDraftScreen from "./src/screens/TourDraftScreen";
import TourSettingsScreen from "./src/screens/TourSettingsScreen";
import TourOverviewScreen from "./src/screens/TourOverviewScreen";
// import TourSettingsScreen from "./src/screens/TourSettingsScreen";
import ActiveTourScreen from "./src/screens/ActiveTourScreen";
import TourListScreen from "./src/screens/TourListScreen";
import PastTourScreen from "./src/screens/PastTourScreen";
import TourAddAttractionScreen from "./src/screens/TourAddAttractionScreen";
import InvitesScreen from "./src/screens/InvitesScreen";
import ProfileScreen from "./src/screens/ProfileScreen";

import { Provider as AuthProvider } from "./src/context/AuthContext";
import { Provider as AttractionProvider } from "./src/context/AttractionContext";
import { Provider as TourProvider } from "./src/context/TourContext";
import { Provider as InviteProvider } from "./src/context/InvitesContext";
import { setNavigator } from "./src/navigationRef";

const exploreFlow = createStackNavigator({
  Home: HomeScreen,
  AttractionDetail: AttractionDetailScreen,
  SearchResults: SearchResultsScreen,
});

exploreFlow.navigationOptions = () => {
  return {
    title: "Explore",
    tabBarIcon: ({ tintColor }) => (
      <Icon name="compass" type="simple-line-icon" color={tintColor} size={28} />
    ),
  };
};

const tourFlow = createStackNavigator({
  TourList: TourListScreen,
  TourCreate: TourCreateScreen,
  TourOverview: TourOverviewScreen,
  TourSettings: TourSettingsScreen,
  TourAddAttraction: TourAddAttractionScreen,
  ActiveTour: ActiveTourScreen,
  PastTour: PastTourScreen,
});

tourFlow.navigationOptions = () => {
  return {
    title: "Tours",
    tabBarIcon: ({ tintColor }) => <Icon name="tour" type="material" color={tintColor} size={28} />,
  };
};

const switchNavigator = createSwitchNavigator(
  {
    ResolveAuth: ResolveAuthScreen,
    Welcome: WelcomeScreen,
    loginFlow: createStackNavigator({
      SignIn: SignInScreen,
      SignupPersonalInfo: SignupPersonalInfoScreen,
      SignupChoosePreferences: SignupChoosePreferencesScreen,
      SignupDone: SignupDoneScreen,
    }),
    mainFlow: createBottomTabNavigator(
      {
        exploreFlow,
        tourFlow,
        Invites: InvitesScreen,
        Profile: ProfileScreen,
      },
      {
        tabBarOptions: {
          // activeTintColor: "#e91e63",
          activeTintColor: "#FF9F1C", // active icon color
          inactiveTintColor: "#FDFFFC",
          style: {
            // activeTintColor: "#F8F8F8", // active icon color
            // tabBarActiveTintColor: "#586589", // i
            backgroundColor: "#011627", // TabBar background
          },
        },
        resetOnBlur: true,
      }
    ),
  }
  // {
  //   initialRouteName: "ResolveAuth",
  // }
);

const App = createAppContainer(switchNavigator);

export default () => {
  return (
    <InviteProvider>
      <TourProvider>
        <AttractionProvider>
          <AuthProvider>
            <App
              ref={(navigator) => {
                setNavigator(navigator);
              }}
            />
          </AuthProvider>
        </AttractionProvider>
      </TourProvider>
    </InviteProvider>
  );
};
