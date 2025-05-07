import { MaterialIcons } from "@expo/vector-icons";
import { View, TouchableOpacity } from "react-native";
import Text from "./text";
import formatDate from "../utils/dateFormatter";

// id, name, location, date, description, image, available spots, taken spots
export default function EventItem({ item, handleDelete, navigateEdit }) {

  return (
    <View className="rounded-3xl bg-white px-5 py-6 w-full">
      <View className="w-[21rem]">
        <Text
          className="text-xl font-strong text-ellipsis overflow-hidden"
          numberOfLines={1}
        >
          {item.name}
        </Text>
        <View className="flex-row gap-1 items-center">
          <MaterialIcons name="place" size={22} color="gray" />
          <Text className="text-ellipsis overflow-hidden text-gray-600" numberOfLines={1}>
            {item.location}
          </Text>
        </View>
        <View className="flex-row gap-1 items-center">
          <MaterialIcons name="event" size={22} color="gray" />
          <Text className="text-gray-600">
            {formatDate(item.date)}
          </Text>
        </View>
      </View>

      <View className="absolute top-0 right-0 bottom-0 gap-2 py-5 pr-4 justify-around">
        <TouchableOpacity
          activeOpacity={0.7}
          className="bg-pink-200 rounded-full items-center justify-center p-2"
          onPress={() => handleDelete(item.id)}
          accessibilityLabel="Delete event"
        >
          <MaterialIcons name="delete-outline" size={20} color="#C2185B" />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.7}
          className="bg-pink-200 rounded-full items-center justify-center p-2"
          onPress={() => navigateEdit(item.id)}
          accessibilityLabel="Edit event"
        >
          <MaterialIcons name="design-services" size={20} color="#C2185B" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
