import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import EventNavigator from "./eventNavigator";
import AppNavigator from "./appNavigator";
import CategoryForm from "../screens/categoryForm";
import { useContext } from "react";
import { AppContext } from "../../context/AppProvider";

const Stack = createStackNavigator();

const MainNavigator = () => {
  return (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="App" component={AppNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="View Event" component={EventNavigator} />
      <Stack.Screen name="View Category" component={CategoryForm} />
    </Stack.Navigator>
  </NavigationContainer>
)
};

export default MainNavigator;
