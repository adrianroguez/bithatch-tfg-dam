import { useRouter } from "expo-router";
import React, { useContext, useState, useRef, useEffect } from "react";
import { Text, TextInput, TouchableOpacity, View, StyleSheet, Animated, Easing } from "react-native";
import { AuthContext } from "../context/AuthContext";
import ThemedBackground from "../components/ThemedBackground";

/**
 * Pantalla de registro de usuario.
 * Valida formato de email y confirmacion de contrasenia antes del envio.
 */
export default function Register() {
  const { register } = useContext(AuthContext);
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
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
   * Verifica que el email tenga el formato correcto usando regex.
   */
  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  /**
   * Valida todos los campos y llama al contexto de autenticacion.
   * Redirige al login si el registro es exitoso, o muestra el error si falla.
   */
  const handleRegister = async () => {
    if (!username || !email || !password || !confirmPassword) {
      setError("Todos los campos son obligatorios");
      return;
    }
    if (!isValidEmail(email)) {
      setError("El formato del email es invalido");
      return;
    }
    // Verificacion de que las dos contrasenias coinciden
    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }
    setError("");
    const res = await register(username, email, password);
    if (res.ok) {
      router.replace("/login");
    } else {
      setError(res.msg || "Error de registro");
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
          <Text style={styles.subtitle}>Registrarse</Text>

          <TextInput
            placeholder="Usuario"
            value={username}
            onChangeText={setUsername}
            style={styles.input}
            placeholderTextColor="#999"
          />
          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
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
          {/* Campo de confirmacion para evitar errores tipograficos en la contrasenia */}
          <TextInput
            placeholder="Repetir contraseña"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
            style={styles.input}
            placeholderTextColor="#999"
          />

          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          <TouchableOpacity style={styles.primaryButton} onPress={handleRegister}>
            <Text style={styles.primaryButtonText}>Crear cuenta</Text>
          </TouchableOpacity>

          {/* Enlace de navegacion hacia el login */}
          <TouchableOpacity style={styles.secondaryButton} onPress={() => router.push("/login")}>
            <Text style={styles.secondaryButtonText}>¿Ya tienes cuenta? Inicia sesión</Text>
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
    margin: 20,
    padding: 26,
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
    fontSize: 26,
    color: "#111",
    fontFamily: "PressStart2P",
  },
  // "Hatch" en verde
  titleHatch: {
    fontSize: 26,
    color: "#2E7D32",
    fontFamily: "PressStart2P",
  },
  subtitle: {
    fontSize: 16,
    color: "#555",
    textAlign: "center",
    marginBottom: 22,
    fontWeight: "700",
    letterSpacing: 1,
  },
  input: {
    borderWidth: 1.5,
    borderColor: "#C8E6C9",
    marginBottom: 12,
    padding: 13,
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
