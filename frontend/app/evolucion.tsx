import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, SafeAreaView, Platform } from "react-native";
import { useRouter } from "expo-router";

/**
 * Evolución screen showing the creature's growth.
 */
export default function EvolucionScreen() {
  const router = useRouter();

  const handleContinue = () => {
    router.replace("/");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Placeholder image for evolved creature */}
        <Image 
          source={require("../assets/egg_a.png")} 
          style={styles.creatureImage} 
        />
        
        <Text style={styles.evoTitle}>{"<Evolución>"}</Text>
        
        <View style={styles.descriptionContainer}>
          <Text style={styles.descriptionText}>
            ¡Tu criatura ha crecido y se ha vuelto más fuerte!
          </Text>
          <Text style={styles.subDescription}>
            Pequeña descripción de la evo...
          </Text>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleContinue}>
          <Text style={styles.buttonText}>Continuar</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FDFDFD",
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 30,
  },
  creatureImage: {
    width: 220,
    height: 220,
    resizeMode: "contain",
    marginBottom: 30,
    // Add a simple silhouette-like effect or filter if needed, 
    // but here we just show the placeholder
  },
  evoTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#4D94FF",
    marginBottom: 20,
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace', // Using monospace for retro feel
  },
  descriptionContainer: {
    width: "100%",
    backgroundColor: "#F0F4F8",
    padding: 20,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#D0D7DE",
    marginBottom: 40,
  },
  descriptionText: {
    fontSize: 16,
    color: "#333",
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 10,
  },
  subDescription: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    fontStyle: "italic",
  },
  button: {
    backgroundColor: "#4CAF50",
    paddingVertical: 15,
    paddingHorizontal: 60,
    borderRadius: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    letterSpacing: 1,
  },
});

