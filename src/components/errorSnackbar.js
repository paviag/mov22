import { Snackbar } from "react-native-paper";
import { useEffect, useState } from "react";
import { View } from "react-native";

const ErrorSnackbar = ({ error, setError }) => {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (error !== undefined) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  }, [error]);

  return (
    <Snackbar
      visible={true}
      onDismiss={() => setError(undefined)}
      action={{
        label: "Close",
        onPress: () => setError(undefined),
      }}
    >
      {"hello"}
    </Snackbar>
  );
};

export default ErrorSnackbar;
