import { useRouter } from "expo-router";
import React, { useContext, useState } from "react";
import { Button, Text, TextInput, View } from "react-native";
import { AuthContext } from "../context/AuthContext";

/**
 * Componente de pantalla de registro de usuario.
 * Proporciona campos de formulario para crear una nueva cuenta de usuario.
 * Valida formato de email y confirmacion de contrasenha antes del envio.
 * 
 * @returns {JSX.Element} Vista de registro con campos de formulario
 */
export default function Register() {
  const { register } = useContext(AuthContext);
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  /**
   * Valida el formato de email usando patron regex.
   * 
   * @param {string} email - Direccion de email a validar
   * @returns {boolean} True si el formato de email es valido, false en caso contrario
   */
  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  /**
   * Maneja el envio del formulario de registro.
   * Valida que todos los campos esten llenos, el formato de email sea correcto,
   * y las contrasenhas coincidan antes de llamar al contexto de autenticacion.
   * En caso de exito, redirige a la pantalla de login.
   * En caso de fallo, muestra mensaje de error.
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

    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    setError(""); // Limpiar errores previos

    const res = await register(username, email, password);
    if (res.ok) {
      router.replace("/login");
    } else {
      setError(res.msg || "Error de registro");
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 20 }}>
      {/* Campo de entrada de usuario */}
      <TextInput
        placeholder="Usuario"
        value={username}
        onChangeText={setUsername}
        style={{ borderWidth: 1, marginBottom: 10, padding: 8 }}
      />
      {/* Campo de entrada de email */}
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={{ borderWidth: 1, marginBottom: 10, padding: 8 }}
      />
      {/* Campo de entrada de contrasenha */}
      <TextInput
        placeholder="contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{ borderWidth: 1, marginBottom: 10, padding: 8 }}
      />
      {/* Campo de confirmacion de contrasenha */}
      <TextInput
        placeholder="Repetir contraseña"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
        style={{ borderWidth: 1, marginBottom: 10, padding: 8 }}
      />
      {/* Visualizacion de mensaje de error */}
      {error ? <Text style={{ color: "red", marginBottom: 10 }}>{error}</Text> : null}

      <Button title="Registrar" onPress={handleRegister} />
      <Button title="Volver al login" onPress={() => router.push("/login")} />
    </View>
  );
}
