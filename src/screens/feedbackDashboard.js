import { useRoute } from "@react-navigation/native";
import { View } from "react-native";
import Text from "../components/text";
import { ScrollView } from "react-native";
import { enGB, registerTranslation } from "react-native-paper-dates";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppProvider";
import LoadingScreen from "./loadingScreen";
registerTranslation("en", enGB);

export default function FeedbackDashboard() {
  const route = useRoute();
  const { eventId } = route.params || {};
  const { getOneEvent, loading } = useContext(AppContext);
  const [eventData, setEventData] = useState({});

  useEffect(() => {
    const fetchEventData = async () => {
      const data = await getOneEvent(eventId);
      setEventData(data);
    };
    fetchEventData();
  }, [eventId]);

  if (eventData?.ratings == undefined || loading) {
    return <LoadingScreen />;
  }
  
  return (
    <ScrollView
      className="bg-white"
      showsVerticalScrollIndicator={false}
      bounces={false}
    >
      <View className="flex-1">
        <View className="bg-pink-800 w-full h-[8rem] rounded-br-[40px] absolute" />
        <View className="h-[8rem] rounded-[40px] rounded-bl-none bg-pink-200 w-3/4 mt-16 p-6 justify-end overflow-hidden">
          <View className="bg-pink-100 h-24 w-24 rounded-full absolute top-[-15px] right-[-5px]" />
          <View className="bg-pink-600 h-14 w-14 rounded-full absolute top-[-5px] right-1" />
          <View className="bg-pink-300 h-5 w-5 rounded-full absolute top-16 right-6" />
          <View className="bg-pink-300 h-8 w-8 rounded-full absolute top-5 right-16" />

          <Text className="text-lg font-semibold">{eventData.title}</Text>
        </View>

        <View className="bg-pink-200 w-full">
          <View className="bg-white rounded-tl-[45px] p-8 pb-32">
            <Text className="text-base font-semibold">
              Subscribed participants
            </Text>

            <View className="mt-3 mb-2">
              <View className="bg-white h-5 rounded-full border border-pink-300 overflow-hidden">
                <View
                  className="bg-pink-600 h-full rounded-full"
                  style={{
                    width: `${
                      ((eventData.participants - eventData.availableSpots) /
                        eventData.participants) *
                      100
                    }%`,
                  }}
                />
              </View>

              <Text className="text-sm text-pink-800 mt-1 text-right">
                {eventData.participants - eventData.availableSpots} /{" "}
                {eventData.participants} participants
              </Text>
            </View>

            <Text className="text-base font-semibold">Total Ratings</Text>
            {eventData.ratings && eventData.ratings.length > 0 ? (
              <View className="mt-3 mb-2 flex-col-reverse">
                {Array.from(Array(5).keys()).map((index) => {
                  const percentage = `${
                    Math.floor(
                      (eventData.ratings.filter(
                        (rating) => rating === index + 1
                      ).length /
                        eventData.ratings.length) *
                        100
                    ) ?? 0
                  }%`;
                  return (
                    <View className="flex-row items-center mb-2" key={index}>
                      <Text className="text-base text-pink-800 w-8">
                        {index + 1}
                      </Text>
                      <View className="flex-1 bg-white h-4 rounded-full border border-pink-300 overflow-hidden mx-2">
                        <View
                          className="bg-pink-600 h-full rounded-full"
                          style={{
                            width: percentage,
                          }}
                        />
                      </View>
                      <Text className="text-xs text-pink-800 w-8 text-right">
                        {percentage}
                      </Text>
                    </View>
                  );
                })}
              </View>
            ) : (
              <Text className="font-bold text-md text-center py-10 text-gray-500">
                No ratings yet
              </Text>
            )}
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
