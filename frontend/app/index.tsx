import { useRouter } from "expo-router";
import React, { useContext, useEffect } from "react";
import {
  Text,
  View,
  ActivityIndicator,
  Image,
  StyleSheet,
  Pressable,
  ImageBackground,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { AuthContext } from "../context/AuthContext";
import { useCreature } from "../context/CreatureContext";
import BrickWallPanel from "../components/BrickWallPanel";

/**
 * Mapeo de tipos de huevo/criatura a sus imágenes.
 */
const EGG_IMAGES: Record<string, any> = {
  EGG_A: require("../assets/egg_a.png"),
  EGG_B: require("../assets/egg_b.png"),
  EGG_C: require("../assets/egg_c.png"),
};

const ROOM_BACKGROUND = require("../assets/habitacion.png");

export default function Home() {
  const { token, loading: authLoading } = useContext(AuthContext);
  const { creature, loading: creatureLoading } = useCreature();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  useEffect(() => {
    if (authLoading || creatureLoading) return;
    if (!token) {
      router.replace("/login");
    } else if (!creature) {
      router.replace("/select-egg" as any);
    }
  }, [token, creature, authLoading, creatureLoading, router]);

  // Ejecuta una vibración ligera cada vez que el usuario acaricia/presiona el botón
  const handlePressIn = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => { });
  };

  if (authLoading || creatureLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#4CAF50" />
      </View>
    );
  }

  if (!token || !creature) return null;

  const creatureImage = EGG_IMAGES[creature.eggType];

  return (
    <View style={styles.root}>

      {/* ── PANEL SUPERIOR: muro de ladrillos exactos ── */}
      <BrickWallPanel rows={6}>
        {/* Contenedor wrapper absoluto: flota sobre los ladrillos exactos, ignorando cómo los vecinos empujen el grid */}
        <View style={[styles.topButtons, { paddingTop: insets.top }]}>
          <Pressable
            style={({ pressed }) => [styles.iconBtn, pressed && styles.btnPressed]}
            onPressIn={handlePressIn}
            onPress={() => { }}
          >
            <View style={styles.iconBtnInner}>
              <Ionicons name="grid-outline" size={22} color="#fff" />
              <Text style={styles.iconBtnLabel}>Menú</Text>
            </View>
          </Pressable>

          <View style={styles.titleRow}>
            <Text style={styles.titleBit}>Bit</Text>
            <Text style={styles.titleHatch}>Hatch</Text>
          </View>

          <Pressable
            style={({ pressed }) => [styles.iconBtn, pressed && styles.btnPressed]}
            onPressIn={handlePressIn}
            onPress={() => { }}
          >
            <View style={styles.iconBtnInner}>
              <Ionicons name="person-circle-outline" size={22} color="#fff" />
              <Text style={styles.iconBtnLabel}>Perfil</Text>
            </View>
          </Pressable>
        </View>
      </BrickWallPanel>

      {/* ── PANTALLA CENTRAL: fondo de habitación, criatura libre ── */}
      <ImageBackground source={ROOM_BACKGROUND} style={styles.screen} resizeMode="cover">
        {/* Burbuja de diálogo */}
        <View style={styles.speechBubble}>
          <Text style={styles.speechText}>
            ¡Hola, {creature.name || "Criatura"}!
          </Text>
          <View style={styles.speechTail} />
        </View>

        {/* Imagen del huevo / criatura */}
        <View style={styles.creatureContainer}>
          <Image source={creatureImage} style={styles.creatureImage} />
          <Text style={styles.creatureName}>{creature.name || "Huevo"}</Text>
        </View>
      </ImageBackground>

      {/* ── PANEL INFERIOR: muro de ladrillos exactos ── */}
      <BrickWallPanel rows={6}>
        {/* Contenedor wrapper absoluto: ignora el borde que sobrepone el centro */}
        <View style={[styles.bottomButtons, { paddingBottom: insets.bottom }]}>
          <Pressable onPressIn={handlePressIn} onPress={() => { }} style={({ pressed }) => [
            styles.navBtn,
            { backgroundColor: "#fff", borderColor: "#D32F2F", borderBottomWidth: 5 },
            pressed && styles.btnPressed
          ]}>
            <View style={styles.navBtnInner}>
              <Ionicons name="barbell-outline" size={20} color="#D32F2F" />
              <Text style={[styles.navBtnText, { color: "#D32F2F" }]}>Ejercicios</Text>
            </View>
          </Pressable>

          <Pressable onPressIn={handlePressIn} onPress={() => { }} style={({ pressed }) => [
            styles.navBtn,
            { backgroundColor: "#fff", borderColor: "#388E3C", borderBottomWidth: 5 },
            pressed && styles.btnPressed
          ]}>
            <View style={styles.navBtnInner}>
              <Ionicons name="sparkles-outline" size={20} color="#388E3C" />
              <Text style={[styles.navBtnText, { color: "#388E3C" }]}>Criatura</Text>
            </View>
          </Pressable>

          <Pressable onPressIn={handlePressIn} onPress={() => { }} style={({ pressed }) => [
            styles.navBtn,
            { backgroundColor: "#fff", borderColor: "#1976D2", borderBottomWidth: 5 },
            pressed && styles.btnPressed
          ]}>
            <View style={styles.navBtnInner}>
              <Ionicons name="flash-outline" size={20} color="#1976D2" />
              <Text style={[styles.navBtnText, { color: "#1976D2" }]}>Batalla</Text>
            </View>
          </Pressable>
        </View>
      </BrickWallPanel>

    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#fff",
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },

  /* ── Botones superiores (superpuestos sobre BrickWallPanel) ── */
  topButtons: {
    ...StyleSheet.absoluteFillObject,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  btnPressed: {
    // Al presionar, el botón se desplaza hacia abajo y pierde el grosor de su borde inferior
    transform: [{ translateY: 3 }],
    borderBottomWidth: 2,
    marginTop: 3, // Compensación para que no estire el flex container
  },
  iconBtn: {
    backgroundColor: "#2E7D32", // Verde oscuro sólido
    borderRadius: 14,
    borderWidth: 2,
    borderBottomWidth: 5,
    borderColor: "#1B5E20", // Borde aún más oscuro para dar el relieve 3D
  },
  iconBtnInner: {
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  iconBtnLabel: {
    color: "#fff",
    fontSize: 9,
    marginTop: 3,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  titleBit: {
    fontSize: 28,
    color: "#111",
    fontFamily: "PressStart2P",
  },
  titleHatch: {
    fontSize: 28,
    color: "#2E7D32",
    fontFamily: "PressStart2P",
  },

  /* ── Pantalla central ── */
  screen: {
    flex: 1,
    // El color de fondo se elimina para que se vea la imagen
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
    // Marco de carcasa estilo consola retro / Tamagotchi
    // Crea una transición limpia y hundida separando el ladrillo de la pantalla LCD
    borderWidth: 8,
    borderTopColor: "#78909C",    // Sombra profunda (hundido desde la carcasa de arriba)
    borderLeftColor: "#90A4AE",
    borderRightColor: "#CFD8DC",
    borderBottomColor: "#FFFFFF", // Reflejo de luz abajo
  },
  speechBubble: {
    backgroundColor: "#fff",
    borderRadius: 16,
    borderWidth: 2,
    borderColor: "#A5D6A7",
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginBottom: 18,
    shadowColor: "#4CAF50",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 2,
  },
  speechText: {
    fontSize: 13,
    color: "#2E7D32",
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  speechTail: {
    position: "absolute",
    bottom: -11,
    alignSelf: "center",
    width: 0,
    height: 0,
    borderLeftWidth: 8,
    borderRightWidth: 8,
    borderTopWidth: 11,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderTopColor: "#A5D6A7",
  },
  creatureContainer: {
    alignItems: "center",
  },
  creatureImage: {
    width: 190,
    height: 190,
    resizeMode: "contain",
  },
  creatureName: {
    marginTop: 16,
    fontSize: 16,
    color: "#333",
    fontWeight: "700",
    letterSpacing: 1,
  },

  /* ── Botones inferiores (superpuestos sobre BrickWallPanel) ── */
  bottomButtons: {
    ...StyleSheet.absoluteFillObject,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingHorizontal: 12,
  },
  navBtn: {
    borderRadius: 45, // Completamente circular
    borderWidth: 2,
    width: 90,
    height: 90,
    justifyContent: "center",
  },
  navBtnInner: {
    alignItems: "center",
    justifyContent: "center",
  },
  navBtnText: {
    fontSize: 9, 
    fontWeight: "900", // Más bold para botones físicos
    marginTop: 4,
    letterSpacing: 0,
  },

});