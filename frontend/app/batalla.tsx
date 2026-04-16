import React from "react";
import { View, Text, StyleSheet, Image, Pressable, StatusBar } from "react-native";
import { Navbar } from "../components/Navbar";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as Haptics from "expo-haptics";
import BrickWallPanel from "../components/BrickWallPanel";
import { useRouter } from "expo-router";
import { Colors, Typography, Spacing, Shadows } from "../constants/theme";

export default function BatallaScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const handlePressIn = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
  };

  return (
    <View style={styles.root}>
      <StatusBar barStyle="dark-content" />
      
      {/* HEADER PANEL */}
      <BrickWallPanel rows={6} style={styles.headerPanel}>
        <View style={[styles.topButtons, { paddingTop: insets.top }]}>
          <Pressable
            style={({ pressed }) => [styles.iconBtn, pressed && styles.btnPressed]}
            onPressIn={handlePressIn}
            onPress={() => router.back()}
          >
            <View style={styles.iconBtnInner}>
              <Ionicons name="arrow-back" size={20} color={Colors.buttons.text} />
              <Text style={styles.iconBtnLabel}>ATRAS</Text>
            </View>
          </Pressable>

          <View style={styles.titleRow}>
            <Text style={styles.titleText}>BIT<Text style={{color: Colors.buttons.blue}}>HATCH</Text></Text>
          </View>

          <View style={{ width: 68 }} />
        </View>
      </BrickWallPanel>

      {/* LCD SCREEN */}
      <View style={styles.screenWrapper}>
        <View style={styles.screenBezel}>
          <View style={styles.lcdContent}>
            <View style={styles.arena}>
              <MaterialCommunityIcons name="sword-cross" size={80} color={Colors.buttons.blue} />
              <Text style={styles.comingSoon}>PRÓXIMAMENTE</Text>
              <Text style={styles.description}>
                ENTRENA A TU CRIATURA PARA EL COMBATE.
              </Text>
            </View>

            <View style={styles.statusBox}>
              <Image 
                source={require("../assets/egg_b.png")} 
                style={styles.creatureSmall} 
              />
              <Text style={styles.statusText}>ESPERANDO RIVAL...</Text>
            </View>
          </View>
        </View>
      </View>

      <Navbar />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.structure.mortar,
  },
  headerPanel: {
    borderBottomWidth: 3,
    borderBottomColor: "rgba(0,0,0,0.1)",
  },
  topButtons: {
    ...StyleSheet.absoluteFillObject,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: Spacing.md,
  },
  iconBtn: {
    backgroundColor: Colors.buttons.blue, 
    borderRadius: 8,
    borderWidth: 2,
    borderColor: Colors.lcd.text,
    borderBottomWidth: Shadows.button.borderBottomWidth,
  },
  btnPressed: {
    transform: [{ translateY: Shadows.button.pressedTransform }],
    borderBottomWidth: 2,
    marginTop: Shadows.button.pressedTransform,
  },
  iconBtnInner: {
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  iconBtnLabel: {
    fontFamily: Typography.retro,
    color: Colors.buttons.text,
    fontSize: 6,
    marginTop: 4,
  },
  titleRow: {
    paddingVertical: 4,
    paddingHorizontal: 12,
    backgroundColor: "rgba(255,255,255,0.8)",
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.1)",
  },
  titleText: {
    fontFamily: Typography.retro,
    fontSize: 14,
    color: Colors.lcd.text,
  },
  screenWrapper: {
    flex: 1,
    padding: Spacing.md,
    backgroundColor: Colors.structure.brick,
  },
  screenBezel: {
    flex: 1,
    backgroundColor: Colors.lcd.background,
    borderRadius: 20,
    borderWidth: 8,
    borderTopColor: Colors.bezel.top,
    borderLeftColor: Colors.bezel.left,
    borderRightColor: Colors.bezel.right,
    borderBottomColor: Colors.bezel.bottom,
    overflow: "hidden",
  },
  lcdContent: {
    flex: 1,
    backgroundColor: Colors.lcd.background,
    padding: Spacing.md,
    justifyContent: "center",
  },
  arena: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.03)",
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "rgba(0,0,0,0.05)",
    padding: 24,
    marginBottom: 24,
  },
  comingSoon: {
    fontFamily: Typography.retro,
    fontSize: 12,
    color: Colors.buttons.blue,
    marginTop: 20,
    textAlign: "center",
  },
  description: {
    fontFamily: Typography.retro,
    fontSize: 7,
    color: Colors.lcd.text,
    textAlign: "center",
    marginTop: 15,
    lineHeight: 12,
  },
  statusBox: {
    alignItems: "center",
    justifyContent: "center",
  },
  creatureSmall: {
    width: 80,
    height: 80,
    resizeMode: "contain",
    opacity: 0.8,
  },
  statusText: {
    fontFamily: Typography.retro,
    fontSize: 8,
    color: Colors.lcd.text,
    marginTop: 16,
    opacity: 0.6,
  },
});
