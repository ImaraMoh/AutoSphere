import React from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Platform,
  StyleSheet,
} from "react-native";

export default function AIInput({ value, setValue, send }) {
  return (
    <View style={styles.container}>
      <TextInput
        value={value}
        onChangeText={setValue}
        placeholder="Ask AutoSphere AI..."
        multiline
        onKeyPress={(e) => {
          if (
            Platform.OS === "web" &&
            e.nativeEvent.key === "Enter" &&
            !e.nativeEvent.shiftKey
          ) {
            e.preventDefault();
            send();
          }
        }}
        style={styles.input}
      />
      <TouchableOpacity onPress={send} style={styles.button}>
        <Text style={styles.buttonText}>➤</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 30,
    padding: 8,
    margin: 10,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  input: {
    flex: 1,
    paddingHorizontal: 15,
    maxHeight: 100,
    color: "#000",
  },
  button: {
    backgroundColor: "#F97316",
    width: 45,
    height: 45,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
  },
});