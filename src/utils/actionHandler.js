import { Alert } from "react-native";

const handleAction = async (
  actionName,
  warningText,
  successText,
  error,
  actionFunction,
  onSuccess = () => {},
) => {
  try {
    Alert.alert(
      actionName,
      warningText,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Accept',
          style: 'destructive',
          onPress: async () => {
            await actionFunction();

            if (error === undefined) {
              Alert.alert('Success', successText, [
                { 
                  text: 'OK', 
                  onPress: () => onSuccess(),
                }
              ]);
            } 
          },
        },
      ]
    );
  } catch (err) {
    Alert.alert('Error', 'There was a problem showing the confirmation.');
  }
};

export default handleAction;