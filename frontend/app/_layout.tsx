import { Slot } from "expo-router";
import React, { useEffect } from "react";
import { AuthProvider } from "../context/AuthContext";
import { CreatureProvider } from "../context/CreatureContext";
import { useFonts, PressStart2P_400Regular } from "@expo-google-fonts/press-start-2p";
import * as SplashScreen from "expo-splash-screen";
import { View, ActivityIndicator } from "react-native";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

/**
 * Componente de layout raiz de la aplicacion.
 */
export default function RootLayout() {
  const [loaded, error] = useFonts({
    PressStart2P: PressStart2P_400Regular,
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' }}>
        <ActivityIndicator size="large" color="#2E7D32" />
      </View>
    );
  }

  return (
    <AuthProvider>
      <CreatureProvider>
        <Slot />
      </CreatureProvider>
    </AuthProvider>
  );
}

