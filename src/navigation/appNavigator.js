import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/homeScreen";
import CustomTabBar from "../components/customTabBar";
import SearchScreen from "../screens/searchScreen";
import AddNavigator from "./addNavigator";

const Tab = createBottomTabNavigator();

const AppNavigator = () => (
  <Tab.Navigator 
    tabBar={props => <CustomTabBar {...props} />} 
    screenOptions={{ headerShown: false }}
    >
    <Tab.Screen name="Home" component={HomeScreen} />
    <Tab.Screen name="Add New" component={AddNavigator} options={{ unmountOnBlur: true }} />
    <Tab.Screen name="Search" component={SearchScreen} />
  </Tab.Navigator>
);

export default AppNavigator;
