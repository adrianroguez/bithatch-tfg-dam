import { useRouter } from "expo-router";
import React, { useContext, useState } from "react";
import { Button, Text, TextInput, View } from "react-native";
import { AuthContext } from "../context/AuthContext";

/**
 * Componente de pantalla de inicio de sesion.
 * Proporciona campos de entrada para usuario y contrasenha para autenticacion.
 * Redirige a la pantalla home tras un login exitoso.
 * 
 * @returns {JSX.Element} Vista de login con formulario de entrada
 */
export default function Login() {
  const { login } = useContext(AuthContext);
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  /**
   * Maneja el envio del formulario de login.
   * Valida que usuario y contrasenha no esten vacios,
   * luego llama a la funcion login del contexto de autenticacion.
   * En caso de exito, redirige a la pantalla home.
   * En caso de fallo, muestra mensaje de error.
   */
  const handleLogin = async () => {
    if (!username || !password) {
      setError("Usuario y contraseña son obligatorios");
      return;
    }
    setError(""); // Limpiar errores previos

    const res = await login(username, password);
    if (res.ok) {
      router.replace("/");
    } else {
      setError(res.msg || "Login fallido");
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
      {/* Campo de entrada de contrasenha */}
      <TextInput
        placeholder="contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{ borderWidth: 1, marginBottom: 10, padding: 8 }}
      />
      {/* Visualizacion de mensaje de error */}
      {error ? <Text style={{ color: "red", marginBottom: 10 }}>{error}</Text> : null}

      <Button title="Login" onPress={handleLogin} />
      <Button title="Registrarse" onPress={() => router.push("/register")} />
    </View>
  );
}
