import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useCreature } from "../context/CreatureContext";

const EGG_IMAGES: Record<string, any> = {
  EGG_A: require("../assets/egg_a.png"),
  EGG_B: require("../assets/egg_b.png"),
  EGG_C: require("../assets/egg_c.png"),
};

export default function NacimientoScreen() {
  const router = useRouter();
  const { eggType } = useLocalSearchParams<{ eggType: string }>();
  const { createStarter } = useCreature();
  
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleContinue = async () => {
    if (!name.trim()) {
      setError("Por favor, ingresa un nombre");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await createStarter(name, eggType || "EGG_A");
      if (res.ok) {
        // Navegar a home tras éxito
        router.replace("/");
      } else {
        setError(res.msg || "Error al crear la criatura");
      }
    } catch (err) {
      setError("Error de conexión");
    } finally {
      setLoading(false);
    }
  };

  const eggImage = EGG_IMAGES[eggType || "EGG_A"];

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.flex}
      >
        <View style={styles.content}>
          <Image source={eggImage} style={styles.eggImage} />
          
          <Text style={styles.title}>-Nacimiento-</Text>
          
          <View style={styles.inputArea}>
            <Text style={styles.label}>Ponle un nombre a tu criatura:</Text>
            <TextInput
              style={styles.input}
              placeholder="Nombre..."
              value={name}
              onChangeText={setName}
              autoFocus
            />
            {error ? <Text style={styles.errorText}>{error}</Text> : null}
          </View>

          <TouchableOpacity
            style={[styles.button, loading && styles.buttonDisabled]}
            onPress={handleContinue}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text style={styles.buttonText}>Continuar</Text>
            )}
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  flex: {
    flex: 1,
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 30,
  },
  eggImage: {
    width: 180,
    height: 180,
    resizeMode: "contain",
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 40,
    color: "#333",
  },
  inputArea: {
    width: "100%",
    marginBottom: 30,
  },
  label: {
    fontSize: 14,
    color: "#666",
    marginBottom: 10,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 15,
    fontSize: 16,
    textAlign: "center",
    backgroundColor: "#F9F9F9",
  },
  errorText: {
    color: "#FF4D4D",
    fontSize: 12,
    marginTop: 5,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#4D94FF",
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  buttonDisabled: {
    backgroundColor: "#A0C4FF",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
