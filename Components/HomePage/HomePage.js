import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button} from "react-native-paper" 

const HomePage = ({ navigation }) => {
  
  
  return (
    <View style={styles.container1}>
      <View style={styles.container2}>
        <Text style={styles.containerText}>Welcome to LT. Selim Hall</Text>
        <Text style={styles.containerText}>
          To see your dashboard please login...
        </Text>
        <Button
          mode="contained"
          onPress={() => navigation.navigate("Login")}
        >
        Go to Login page
        </Button>
        <Text style={styles.containerText}>
          Are you not a boarder? please book a room!
        </Text>
        <Button
          mode="contained"
          onPress={() => navigation.navigate("Search")}
        >
          Search
        </Button>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container1: {
    flex: 1,
    backgroundColor: "#fff",
    // alignItems: "center",
    justifyContent: "space-between",
    
  },
  container2: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    // margin: 40,
    // elevation:4,
    // borderRadius:10
  },
  containerText: {
    padding: 10,
  },
});

export default HomePage;
