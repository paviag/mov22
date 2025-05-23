import { FlatList, TextInput, TouchableOpacity, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import EventItem from "../components/eventItem";
import Text from "../components/text";
import { useEffect, useRef, useState, memo, useContext } from "react";
import useAppNavigation from "../hooks/useAppNavigation";
import { AppContext } from "../../context/AppProvider";
import LoadingScreen from "./loadingScreen";
import { Alert } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import handleAction from "../utils/actionHandler";

const CategoryItem = memo(({ item, selectedCategory, setSelectedCategory }) => (
  <TouchableOpacity
    activeOpacity={0.7}
    onPress={() => setSelectedCategory(item.label)}
    className="w-[170px]"
  >
    <Text
      className={`text-center font-semibold px-1 pb-[0.7rem] ${
        selectedCategory === item.label &&
        "border-b-2 border-b-pink-600 text-pink-600"
      }`}
    >
      {item.label}
    </Text>
  </TouchableOpacity>
));

function CategoryFlatList({
  selectedCategory,
  setSelectedCategory,
  data,
  ref,
}) {
  return (
    <FlatList
      ref={ref}
      data={data}
      horizontal={true}
      keyExtractor={(item) => item.label}
      removeClippedSubviews={true}
      getItemLayout={(data, index) => {
        return {
          length: 170,
          offset: 170 * index,
          index,
        };
      }}
      renderItem={({ item }) => (
        <CategoryItem
          item={item}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
      )}
      className="pt-6"
      showsHorizontalScrollIndicator={false}
    />
  );
}

export default function SearchScreen() {
  const {
    events,
    refreshEvents,
    getEventsByType,
    categories,
    getCategoryTypeFromValue,
    getCategoryValueFromLabel,
    deleteEvent,
    loading,
  } = useContext(AppContext);
  const [eventsShown, setEventsShown] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const { navigateToEventEdit } = useAppNavigation();
  const flatListRef = useRef(null);
  const isFocused = useIsFocused();

  useEffect(() => {
    const refreshData = async () => {
      await refreshCategories();
      await refreshEvents();
    };
    if (isFocused) {
      refreshData();
      setEventsShown(events);
    }
  }, [isFocused]);

  const scrollToItem = (index) => {
    try {
      flatListRef.current?.scrollToIndex({ index, animated: true });
    } catch (e) {
      flatListRef.current?.scrollToOffset({
        offset: index * 170, // Fallback to manual scroll
        animated: true,
      });
    }
  };

  const handleDelete = (eventId) => {
    handleAction(
      "Delete Event",
      "Are you sure you want to delete this event?",
      "Event deleted successfully.",
      async () => await deleteEvent(eventId),
      () => setEventsShown(events),
    );
  };

  useEffect(() => {
    setSelectedCategory("All");
  }, []);

  useEffect(() => {
    const updateEventsShown = async () => {
      const catValue = getCategoryValueFromLabel(selectedCategory);
      scrollToItem(catValue);
      if (selectedCategory == "All") {
        await refreshEvents();
        setEventsShown(events);
      } else {
        const type = getCategoryTypeFromValue(catValue);
        const newEventsShown = await getEventsByType(type);
        setEventsShown(newEventsShown);
      }
    };
    updateEventsShown();
  }, [selectedCategory]);

  return (
    <View className="flex-1">
      <View className="pt-16 px-5 bg-white ">
        <View className="flex-row gap-2 items-center">
          <TextInput
            className="bg-gray-100 p-4 pb-5 rounded-3xl flex-1 text-lg"
            placeholder="Search events..."
            placeholderTextColor="slategray"
            style={{ fontFamily: "Nunito_400Regular" }}
          />
          <MaterialIcons name="search" color="darkslategray" size={30} />
        </View>
        <CategoryFlatList
          selectedCategory={selectedCategory}
          setSelectedCategory={(category) => {
            scrollToItem(getCategoryValueFromLabel(category));
            setSelectedCategory(category);
          }}
          data={categories}
          ref={flatListRef}
        />
      </View>
      {loading ? (
        <LoadingScreen />
      ) : eventsShown.length === 0 ? (
        <View className="items-center pt-48 gap-4">
          <View className="bg-pink-200 p-6 rounded-full">
            <MaterialIcons name="calendar-today" size={60} color="#C2185B" />
          </View>
          <Text className="font-bold text-2xl text-gray-500">
            No events found
          </Text>
        </View>
      ) : (
        <FlatList
          data={eventsShown}
          keyExtractor={(item) => item._id + item.type}
          renderItem={({ item }) => (
            <EventItem
              item={item}
              navigateEdit={navigateToEventEdit}
              handleDelete={handleDelete}
            />
          )}
          className="bg-gray-100 p-6"
          ItemSeparatorComponent={<View className="h-5" />}
          ListFooterComponent={<View className="h-36" />}
        />
      )}
    </View>
  );
}
