import { useRouter } from "expo-router";
import React, { useContext, useEffect } from "react";
import {
  Button,
  Text,
  View,
  ActivityIndicator,
  Image,
  StyleSheet,
} from "react-native";
import { AuthContext } from "../context/AuthContext";
import { useCreature } from "../context/CreatureContext";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Profile from "./profile";

/**
 * Mapeo de tipos de huevo a sus imagenes correspondientes.
 * Debe coincidir con los tipos de huevo definidos en select-egg.tsx
 */
const EGG_IMAGES: Record<string, any> = {
  EGG_A: require("../assets/egg_a.png"),
  EGG_B: require("../assets/egg_b.png"),
  EGG_C: require("../assets/egg_c.png"),
};

/**
 * Componente principal (Home) de la aplicacion.
 * Maneja la logica de navegacion basada en el estado de autenticacion y criatura:
 * - Redirige a login si no existe token
 * - Redirige a select-egg si el usuario no tiene criatura
 * - Muestra la pantalla home si el usuario tiene una criatura
 *
 * @returns {JSX.Element | null} Vista home o null durante redirecciones
 */
export default function Home() {
  const { token, logout, loading: authLoading } = useContext(AuthContext);
  const {
    creature,
    loading: creatureLoading,
    error,
    fetchCreature,
  } = useCreature();
  const router = useRouter();

  /**
   * Efecto de navegacion que se ejecuta cuando cambia el estado de auth o criatura.
   * Implementa el siguiente flujo:
   * 1. Si no hay token -> redirige a login
   * 2. Si no hay criatura -> redirige a seleccion de huevo
   * 3. De lo contrario -> muestra pantalla home
   */
  useEffect(() => {
    if (authLoading || creatureLoading) return;

    if (!token) {
      router.replace("/login");
    } else if (!creature) {
      // Si no tiene criatura, ir a seleccion de huevo
      // Usando cast 'as any' para evitar errores de tipado estricto en rutas dinamicas/nuevas
      router.replace("/select-egg" as any);
    }
  }, [token, creature, authLoading, creatureLoading, router]);

  // Muestra indicador de carga mientras se obtiene autenticacion o datos de criatura
  if (authLoading || creatureLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  // Retorna null si no esta autenticado (redirigira a login)
  if (!token) return null;

  // Muestra pantalla de error si hubo un problema obteniendo datos de criatura
  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ color: "red", marginBottom: 10 }}>Error: {error}</Text>
        <Button title="Reintentar" onPress={() => void fetchCreature()} />
        <Button title="Cerrar sesion" onPress={() => void logout()} />
      </View>
    );
  }

  // Retorna null si no hay criatura (redirigira a seleccion de huevo)
  if (!creature) return null;

  // Obtiene la imagen del huevo basada en el tipo de huevo de la criatura
  const eggImage = EGG_IMAGES[creature.eggType];

  const Tab = createBottomTabNavigator();

  // Pantalla home principal - usuario autenticado y tiene una criatura
  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Bienvenido a Home!</Text>

      {/* Muestra el sprite del huevo escogido */}
      {eggImage && <Image source={eggImage} style={styles.eggImage} />}

      <Text style={styles.creatureInfo}>Criatura: {creature.name}</Text>
      <Text style={styles.creatureInfo}>Nivel: {creature.level}</Text>
      <Text style={styles.creatureInfo}>Tipo de huevo: {creature.eggType}</Text>
      <Text style={styles.creatureInfo}>Energia: {creature.energy}</Text>
      <Text style={styles.creatureInfo}>Felicidad: {creature.happiness}</Text>

      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: "#6200ee",
          tabBarInactiveTintColor: "gray",
          tabBarStyle: { paddingBottom: 5, height: 60 },
        }}
      >
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarIcon: ({ color, size }) => <Home />,
          }}
        />
        <Tab.Screen
          name="Profile"
          component={Profile}
          options={{
            tabBarIcon: ({ color, size }) => <Profile />,
          }}
        />
      </Tab.Navigator>

      <Button title="Cerrar sesion" onPress={() => void logout()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  eggImage: {
    width: 200,
    height: 200,
    resizeMode: "contain",
    marginVertical: 20,
  },
  creatureInfo: {
    fontSize: 16,
    marginVertical: 5,
  },
});
