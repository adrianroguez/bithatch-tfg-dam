import React from "react";
import { View, Text, StyleSheet, SafeAreaView, Image } from "react-native";
import { Navbar } from "../components/Navbar";
import { MaterialCommunityIcons } from "@expo/vector-icons";

/**
 * Batalla screen scaffold.
 * Provides a base structure for future battle implementation.
 */
export default function BatallaScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Batalla</Text>
        </View>

        <View style={styles.arena}>
          <MaterialCommunityIcons name="sword-cross" size={100} color="#4CAF50" />
          <Text style={styles.comingSoon}>Próximamente...</Text>
          <Text style={styles.description}>
            Aquí podrás enfrentar a tu criatura contra otros oponentes.
          </Text>
        </View>

        <View style={styles.placeholderCreature}>
           <Image 
             source={require("../assets/egg_b.png")} 
             style={styles.creatureSmall} 
           />
           <Text style={styles.statusText}>Tu criatura está descansando</Text>
        </View>
      </View>

      <Navbar />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  header: {
    alignItems: "center",
    marginBottom: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  arena: {
    flex: 2,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F1F8E9",
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#A5D6A7",
    padding: 20,
    marginBottom: 20,
  },
  comingSoon: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#4CAF50",
    marginTop: 20,
  },
  description: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    marginTop: 10,
    paddingHorizontal: 20,
  },
  placeholderCreature: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  creatureSmall: {
    width: 60,
    height: 60,
    resizeMode: "contain",
  },
  statusText: {
    fontSize: 12,
    color: "#999",
    marginTop: 5,
  },
});
