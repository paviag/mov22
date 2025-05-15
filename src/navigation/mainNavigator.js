import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import EventNavigator from "./eventNavigator";
import AppNavigator from "./appNavigator";

const Stack = createStackNavigator();

const MainNavigator = () => {
  return (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="App" component={AppNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="View Event" component={EventNavigator} />
    </Stack.Navigator>
  </NavigationContainer>
)
};

export default MainNavigator;
