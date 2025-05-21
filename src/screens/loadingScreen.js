import { View } from "react-native";
import Text from "../components/text";

export default function LoadingScreen() {
  return (
    <View className="flex-1 items-center justify-center mb-20 bg-transparent">
      <Text className="text-lg">Loading...</Text>
    </View>
  );
}