import { useNavigation } from "@react-navigation/native";

const useAppNavigation = () => {
  const navigation = useNavigation();

  const navigateToEventFeedback = (eventId) => {
    navigation.navigate("View Event", { screen: "Feedback", eventId });
  };

  const navigateToEventEdit = (eventId) => {
    console.log("to event edit of: "+eventId)
    navigation.navigate("View Event", { screen: "Edit", eventId });
  };

  const navigateToSearch = (category) => {
    navigation.navigate("Search", category == undefined ? {} : { category });
  };

  return { navigateToEventFeedback, navigateToEventEdit, navigateToSearch };
};

export default useAppNavigation;
