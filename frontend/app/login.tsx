import { useRouter } from "expo-router";
import React, { useContext, useState, useRef, useEffect } from "react";
import { Text, TextInput, TouchableOpacity, View, StyleSheet, Animated, Easing } from "react-native";
import { AuthContext } from "../context/AuthContext";
import ThemedBackground from "../components/ThemedBackground";

/**
 * Pantalla de inicio de sesion.
 * Valida usuario y contrasenia, y redirige al home si el login es exitoso.
 */
export default function Login() {
  const { login } = useContext(AuthContext);
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Animacion de entrada: el formulario escala desde el centro (efecto tunel)
  const scaleAnim = useRef(new Animated.Value(0.1)).current;
  useEffect(() => {
    Animated.timing(scaleAnim, {
      toValue: 1,
      duration: 550,
      easing: Easing.out(Easing.back(1.05)),
      useNativeDriver: true,
    }).start();
  }, []);

  /**
   * Valida los campos y llama al contexto de autenticacion.
   * Redirige al home si el login es correcto, o muestra el error si falla.
   */
  const handleLogin = async () => {
    if (!username || !password) {
      setError("Usuario y contraseña son obligatorios");
      return;
    }
    setError("");
    const res = await login(username, password);
    if (res.ok) {
      router.replace("/");
    } else {
      setError(res.msg || "Login fallido");
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <ThemedBackground />
      <View style={styles.overlay}>
        <Animated.View style={[styles.container, { transform: [{ scale: scaleAnim }] }]}>
          {/* Titulo bicolor con fuente pixel art */}
          <Text style={styles.titleRow}>
            <Text style={styles.titleBit}>Bit</Text>
            <Text style={styles.titleHatch}>Hatch</Text>
          </Text>
          <Text style={styles.subtitle}>Iniciar sesión</Text>

          <TextInput
            placeholder="Usuario"
            value={username}
            onChangeText={setUsername}
            style={styles.input}
            placeholderTextColor="#999"
          />
          <TextInput
            placeholder="Contraseña"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            style={styles.input}
            placeholderTextColor="#999"
          />

          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          <TouchableOpacity style={styles.primaryButton} onPress={handleLogin}>
            <Text style={styles.primaryButtonText}>Entrar</Text>
          </TouchableOpacity>

          {/* Enlace de navegacion hacia el registro */}
          <TouchableOpacity style={styles.secondaryButton} onPress={() => router.push("/register")}>
            <Text style={styles.secondaryButtonText}>¿Sin cuenta? Regístrate</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
  },
  // Tarjeta blanca que contrasta con el fondo verde del tunel
  container: {
    margin: 24,
    padding: 30,
    backgroundColor: "rgba(255, 255, 255, 0.97)",
    borderRadius: 30,
    borderWidth: 2,
    borderColor: "#A5D6A7",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
  },
  titleRow: {
    textAlign: "center",
    marginBottom: 8,
  },
  // "Bit" en negro
  titleBit: {
    fontSize: 28,
    color: "#111",
    fontFamily: "PressStart2P",
  },
  // "Hatch" en verde
  titleHatch: {
    fontSize: 28,
    color: "#2E7D32",
    fontFamily: "PressStart2P",
  },
  subtitle: {
    fontSize: 16,
    color: "#555",
    textAlign: "center",
    marginBottom: 24,
    fontWeight: "700",
    letterSpacing: 1,
  },
  input: {
    borderWidth: 1.5,
    borderColor: "#C8E6C9",
    marginBottom: 14,
    padding: 14,
    borderRadius: 15,
    backgroundColor: "#fff",
    color: "#333",
    fontSize: 15,
  },
  errorText: {
    color: "#D32F2F",
    marginBottom: 10,
    textAlign: "center",
    fontSize: 13,
  },
  primaryButton: {
    backgroundColor: "#4CAF50",
    borderRadius: 15,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 6,
    marginBottom: 10,
  },
  primaryButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
    letterSpacing: 1,
  },
  secondaryButton: {
    alignItems: "center",
    paddingVertical: 8,
  },
  // Estilo de hipervinculo (azul + subrayado)
  secondaryButtonText: {
    color: "#1565C0",
    fontSize: 13,
    textDecorationLine: "underline",
  },
});
