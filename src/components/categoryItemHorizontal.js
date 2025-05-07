import Text from "./text";
import { View, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

export default function CategoryItemHorizontal({ item, onPress }) {
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onPress} accessibilityLabel={`Navigate to ${item.label}`}>
      <View className="justify-center items-center p-5 bg-pink-700 rounded-3xl gap-4 h-48 w-48 overflow-clip">
        <View className="bg-white rounded-full w-20 h-20 items-center justify-center">
          <MaterialIcons
            name={item.iconName}
            size={50}
            color="black"
          />
        </View>
        <Text className="text-center text-white leading-tight h-1/3">
          {item.label}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
