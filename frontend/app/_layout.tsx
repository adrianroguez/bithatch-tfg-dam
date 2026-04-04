import { Slot } from "expo-router";
import React, { useEffect } from "react";
import { AuthProvider } from "../context/AuthContext";
import { CreatureProvider } from "../context/CreatureContext";
import { useFonts, PressStart2P_400Regular } from "@expo-google-fonts/press-start-2p";
import * as SplashScreen from "expo-splash-screen";
import * as SystemUI from "expo-system-ui";
import { StatusBar } from "expo-status-bar";
import * as NavigationBar from "expo-navigation-bar";
import { AppState, Platform } from "react-native";

SplashScreen.preventAutoHideAsync();
// Fondo del sistema transparente para conseguir edge-to-edge real
SystemUI.setBackgroundColorAsync("transparent");

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    'PressStart2P': PressStart2P_400Regular,
  });

  useEffect(() => {
    // Configurar Android inmersivo: oculta la barra de botones inferior
    async function configureImmersive() {
      if (Platform.OS !== "android") return;
      try {
        await NavigationBar.setVisibilityAsync("hidden");
        await NavigationBar.setBehaviorAsync("overlay-swipe");
      } catch (e) {
        // Ignorar
      }
    }
    configureImmersive();

    // Si el usuario sale de la app y vuelve, Android suele restaurar la barra, la volvemos a ocultar
    const subscription = AppState.addEventListener("change", (nextAppState) => {
      if (nextAppState === "active") {
        configureImmersive();
      }
    });

    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }

    return () => {
      subscription.remove();
    };
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <AuthProvider>
      <CreatureProvider>
        {/* translucent=true hace que StatusBar sea transparente y el contenido pase por debajo */}
        <StatusBar style="light" translucent backgroundColor="transparent" />
        <Slot />
      </CreatureProvider>
    </AuthProvider>
  );
}
