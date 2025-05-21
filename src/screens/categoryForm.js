import { useRoute, useNavigation } from "@react-navigation/native";
import { TouchableOpacity, View, Alert } from "react-native";
import Text from "../components/text";
import { ScrollView } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import InputComponent from "../components/inputComponent";
import useCategoryForm from "../hooks/useCategoryForm";
import LoadingScreen from "./loadingScreen";
import categoryService from "../../services/categoryService";
import { useContext } from "react";
import { AppContext } from "../../context/AppProvider";

export default function CategoryForm() {
  const route = useRoute();
  const navigation = useNavigation();
  const { categoryId } = route.params || {};
  const { deleteCategory, refreshCategories } = useContext(AppContext);
  const {
    categoryData,
    handleInputChange,
    handleSubmit,
    loading,
    error, 
    setError,
  } = useCategoryForm(categoryId);

  if (loading) {
    return <LoadingScreen />;
  }

  const handleDelete = async () => {
    if (!categoryData || !categoryData._id) {
      Alert.alert('Error', 'Cannot delete: Category ID is missing');
      return;
    }

    try {
      Alert.alert(
        'Delete Category',
        'Are you sure you want to delete this category?',
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'Delete',
            style: 'destructive',
            onPress: async () => {
              try {
                await deleteCategory(categoryData._id);
                
                Alert.alert('Success', 'Category deleted successfully', [
                  { 
                    text: 'OK', 
                    onPress: () => {
                      navigation.goBack();
                    }
                  }
                ]);
              } catch (error) {
                console.error("Delete operation failed:", error);
                let errorMessage = 'There was a problem deleting the category.';
                
                if (error.response && error.response.data && error.response.data.message) {
                  errorMessage = error.response.data.message;
                }
                
                Alert.alert('Error', errorMessage);
              }
            },
          },
        ]
      );
    } catch (error) {
      Alert.alert('Error', 'There was a problem showing the delete confirmation.');
    }
  };

  return (
    <ScrollView
      className="bg-white"
      showsVerticalScrollIndicator={false}
      bounces={false}
    >
      <View className="flex-1 pb-36">
        <View className="bg-pink-800 h-60 rounded-br-[65px]">
          <View className="bg-pink-100 h-60 w-60 rounded-full absolute top-[-90px] right-[-79px]" />
          <View className="bg-pink-600 h-36 w-36 rounded-full absolute top-[-42px] right-[-34px]" />
          <View className="bg-pink-500 h-10 w-10 rounded-full absolute top-28 right-3" />
          <View className="bg-pink-300 h-20 w-20 rounded-full absolute top-3 right-32" />
          <View className="w-10/12 flex-1 absolute bottom-7 left-5">
            <InputComponent
              name="label"
              icon="view-headline"
              color="white"
              defaultValue={categoryData.label}
              transparent={true}
              onChange={handleInputChange}
            />
          </View>
        </View>
        <View className="pl-5 pr-6 pt-7">
          <View className="flex-row justify-center gap-4">
            <TouchableOpacity
              activeOpacity={0.7}
              className="bg-pink-200 rounded-full py-3 px-6 flex-row items-center"
              onPress={handleSubmit}
            >
              <MaterialIcons name="save" size={20} color="#C2185B" />
              <Text className="text-pink-600 text-xl ml-2">Save category</Text>
            </TouchableOpacity>

            {/*solo mostrar para categorías existentes */}
            {categoryData && categoryData._id && (
              <TouchableOpacity
                activeOpacity={0.7}
                className="bg-red-100 rounded-full py-3 px-6 flex-row items-center"
                onPress={handleDelete}
              >
                <MaterialIcons name="delete" size={20} color="#C2185B" />
                <Text className="text-pink-600 text-xl ml-2">Delete</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </ScrollView>
  );
}