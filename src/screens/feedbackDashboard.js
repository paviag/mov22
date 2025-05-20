import { useRoute } from "@react-navigation/native";
import { View } from "react-native";
import Text from "../components/text";
import { ScrollView } from "react-native";
import useEventForm from "../hooks/useEventForm";
import {
  enGB,
  registerTranslation,
} from "react-native-paper-dates";

export default function FeedbackDashboard() {

  const route = useRoute();
  const { eventId } = route.params || {};

  registerTranslation("en", enGB);

  const {
    eventData,
    subscribedNumber
  } = useEventForm(eventId);
  console.log(eventData.availableSpots);
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
            <Text className="text-base font-semibold">Subscribed participants</Text>
            
            <View className="mt-3 mb-2">
              
              <View className="bg-white h-5 rounded-full border border-pink-300 overflow-hidden">
             
                <View
                  className="bg-pink-600 h-full rounded-full"
                  style={{
                    width: `${(eventData.participants / (eventData.participants + eventData.availableSpots)) * 100}%`,
                  }}
                />
              </View>
              
           
              <Text className="text-sm text-pink-800 mt-1 text-right">
                {subscribedNumber} / {eventData.participants } participants
              </Text>
            </View>
               {/* TODO:The data needs to have structured ratings with the rating and the number of people who placed that rating.  */}
            <Text className="text-base font-semibold">Total Ratings</Text>
         
            <View className="mt-3 mb-2">
              
              <View className="flex-row items-center mb-2">
                <Text className="text-base text-pink-800 w-8">5</Text>
                <View className="flex-1 bg-white h-4 rounded-full border border-pink-300 overflow-hidden mx-2">
                  <View
                    className="bg-pink-600 h-full rounded-full"
                    style={{
                      width: '70%', 
                    }}
                  />
                </View>
                <Text className="text-xs text-pink-800 w-8 text-right">70%</Text>
              </View>
              
             
              <View className="flex-row items-center mb-2">
                <Text className="text-base text-pink-800 w-8">4</Text>
                <View className="flex-1 bg-white h-4 rounded-full border border-pink-300 overflow-hidden mx-2">
                  <View
                    className="bg-pink-600 h-full rounded-full"
                    style={{
                      width: '20%', 
                    }}
                  />
                </View>
                <Text className="text-xs text-pink-800 w-8 text-right">20%</Text>
              </View>
              
             
              <View className="flex-row items-center mb-2">
                <Text className="text-base text-pink-800 w-8">3</Text>
                <View className="flex-1 bg-white h-4 rounded-full border border-pink-300 overflow-hidden mx-2">
                  <View
                    className="bg-pink-600 h-full rounded-full"
                    style={{
                      width: '5%',
                    }}
                  />
                </View>
                <Text className="text-xs text-pink-800 w-8 text-right">5%</Text>
              </View>
              
              
              <View className="flex-row items-center mb-2">
                <Text className="text-base text-pink-800 w-8">2</Text>
                <View className="flex-1 bg-white h-4 rounded-full border border-pink-300 overflow-hidden mx-2">
                  <View
                    className="bg-pink-600 h-full rounded-full"
                    style={{
                      width: '3%', 
                    }}
                  />
                </View>
                <Text className="text-xs text-pink-800 w-8 text-right">3%</Text>
              </View>
              
            
              <View className="flex-row items-center mb-2">
                <Text className="text-base text-pink-800 w-8">1</Text>
                <View className="flex-1 bg-white h-4 rounded-full border border-pink-300 overflow-hidden mx-2">
                  <View
                    className="bg-pink-600 h-full rounded-full"
                    style={{
                      width: '2%',
                    }}
                  />
                </View>
                <Text className="text-xs text-pink-800 w-8 text-right">2%</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );

}




