import { createStackNavigator } from "@react-navigation/stack";
import EventNavigator from "./eventNavigator";
import CategoryForm from "../screens/categoryForm";
import AddScreen from "../screens/addScreen";


const AddTab = createStackNavigator();

const AddNavigator = () => {
  return (
    <AddTab.Navigator>
      <AddTab.Screen name="Add New Main" component={AddScreen} options={{ headerShown: false }} />
      <AddTab.Screen name="View Event" component={EventNavigator} />
      <AddTab.Screen name="View Category" component={CategoryForm} />
    </AddTab.Navigator>
  );
}

export default AddNavigator;