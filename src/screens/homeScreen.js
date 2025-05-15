import { FlatList, ScrollView, View } from "react-native";
import Text from "../components/text";
import { categories } from "../data/categories";
import CategoryItemHorizontal from "../components/categoryItemHorizontal";
import EventItemHorizontal from "../components/eventItemHorizontal";
import useAppNavigation from "../hooks/useAppNavigation";
import { useContext } from "react";
import { AppContext } from "../../context/AppProvider";

export default function HomeScreen() {
  const { navigateToEventEdit, navigateToSearch } = useAppNavigation();
  const { events } = useContext(AppContext);

  const CATEGORIES = categories;

  return (
    <ScrollView
      className="bg-white"
      showsVerticalScrollIndicator={false}
      bounces={false}
    >
      <View className="flex-1">
        <View className="bg-pink-800 w-full h-56 rounded-br-[50px] absolute" />
        <View className="h-56 rounded-[50px] rounded-bl-none bg-pink-200 w-3/4 mt-20 p-10 justify-end overflow-hidden">
          <View className="bg-pink-100 h-28 w-28 rounded-full absolute top-[-15px] right-[-5px]" />
          <View className="bg-pink-600 h-16 w-16 rounded-full absolute top-[-5px] right-1" />
          <View className="bg-pink-300 h-6 w-6 rounded-full absolute top-20 right-6" />
          <View className="bg-pink-300 h-10 w-10 rounded-full absolute top-6 right-20" />
          <Text className="text-lg">Get started</Text>
          <Text className="text-2xl font-semibold">
            with conference management!
          </Text>
        </View>

        <View className="bg-pink-200 w-full">
          <View className="bg-white rounded-tl-[55px] p-10 pb-40">
            <Text className="text-lg font-semibold">Explore categories</Text>
            <FlatList
              data={CATEGORIES}
              horizontal={true}
              keyExtractor={(item) => item.value}
              renderItem={({ item }) => (
                <CategoryItemHorizontal
                  item={item}
                  onPress={() => navigateToSearch(item.label)}
                />
              )}
              className="pt-2 pb-5"
              ItemSeparatorComponent={<View className="w-5" />}
            />
            <Text className="text-lg font-semibold">Most popular</Text>
            <FlatList
              data={events}
              horizontal={true}
              keyExtractor={(item) => item._id}
              renderItem={({ item }) => (
                <EventItemHorizontal
                  item={item}
                  onPress={() => navigateToEventEdit(item._id)}
                />
              )}
              className="pt-2 pb-5"
              ItemSeparatorComponent={<View className="w-5" />}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
