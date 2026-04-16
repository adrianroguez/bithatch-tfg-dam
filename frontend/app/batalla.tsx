import React from "react";
import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import { Navbar } from "../components/Navbar";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as Haptics from "expo-haptics";
import BrickWallPanel from "../components/BrickWallPanel";
import { useRouter } from "expo-router";

export default function BatallaScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const handlePressIn = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
  };

  return (
    <View style={styles.root}>
      {/* ── PANEL SUPERIOR ── */}
      <BrickWallPanel rows={6}>
        <View style={[styles.topButtons, { paddingTop: insets.top }]}>
          <Pressable
            style={({ pressed }) => [styles.iconBtn, pressed && styles.btnPressed]}
            onPressIn={handlePressIn}
            onPress={() => router.back()}
          >
            <View style={styles.iconBtnInner}>
              <Ionicons name="arrow-back" size={22} color="#fff" />
              <Text style={styles.iconBtnLabel}>Atras</Text>
            </View>
          </Pressable>

          <View style={styles.titleRow}>
            <Text style={styles.titleBit}>Bata</Text>
            <Text style={styles.titleHatch}>lla</Text>
          </View>

          <View style={{ width: 68 }} />
        </View>
      </BrickWallPanel>

      {/* ── PANTALLA CENTRAL (LCD Hundida) ── */}
      <View style={styles.screen}>
        <View style={styles.arena}>
          <MaterialCommunityIcons name="sword-cross" size={100} color="#1976D2" />
          <Text style={styles.comingSoon}>Próximamente...</Text>
          <Text style={styles.description}>
            Aquí podrás enfrentar a tu criatura contra otros oponentes.
          </Text>
        </View>

        <View style={styles.placeholderCreature}>
           <Image 
             source={require("../assets/egg_b.png")} 
             style={styles.creatureSmall} 
           />
           <Text style={styles.statusText}>Tu criatura está descansando</Text>
        </View>
      </View>

      <Navbar />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#fff",
  },
  topButtons: {
    ...StyleSheet.absoluteFillObject,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  btnPressed: {
    transform: [{ translateY: 3 }],
    borderBottomWidth: 2,
    marginTop: 3,
  },
  iconBtn: {
    backgroundColor: "#1976D2", 
    borderRadius: 14,
    borderWidth: 2,
    borderBottomWidth: 5,
    borderColor: "#0D47A1", 
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
    fontSize: 22,
    color: "#111",
    fontFamily: "PressStart2P",
  },
  titleHatch: {
    fontSize: 22,
    color: "#1976D2", // Azul para batalla
    fontFamily: "PressStart2P",
  },
  screen: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 20,
    backgroundColor: "#E3F2FD",
    borderWidth: 8,
    borderTopColor: "#78909C",
    borderLeftColor: "#90A4AE",
    borderRightColor: "#CFD8DC",
    borderBottomColor: "#FFFFFF",
  },
  arena: {
    flex: 2,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#BBDEFB",
    borderRadius: 12,
    borderWidth: 4,
    borderColor: "#90CAF9",
    padding: 20,
    marginBottom: 20,
    shadowColor: "#1976D2",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  comingSoon: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#1565C0",
    marginTop: 20,
    fontFamily: "PressStart2P",
    textAlign: "center",
  },
  description: {
    fontSize: 14,
    color: "#333",
    textAlign: "center",
    marginTop: 15,
    paddingHorizontal: 10,
    fontWeight: "700",
  },
  placeholderCreature: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  creatureSmall: {
    width: 90,
    height: 90,
    resizeMode: "contain",
  },
  statusText: {
    fontSize: 12,
    color: "#1565C0",
    marginTop: 10,
    fontWeight: "bold",
  },
});
