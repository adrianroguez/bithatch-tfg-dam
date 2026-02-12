import { useRouter } from "expo-router";
import React, { useContext, useEffect } from "react";
import { Button, Text, View, ActivityIndicator } from "react-native";
import { AuthContext } from "../context/AuthContext";
import { useCreature } from "../context/CreatureContext";

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
  const { creature, loading: creatureLoading, error, fetchCreature } = useCreature();
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

  // Pantalla home principal - usuario autenticado y tiene una criatura
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Bienvenido a Home!</Text>
      <Text>Criatura: {creature.name} (Nivel {creature.level})</Text>

      <Button title="Cerrar sesion" onPress={() => void logout()} />
    </View>
  );
}
