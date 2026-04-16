import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { useRouter, usePathname } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as Haptics from "expo-haptics";
import BrickWallPanel from "./BrickWallPanel";
import { Colors, Typography, Shadows } from "../constants/theme";

export function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const insets = useSafeAreaInsets();

  const handlePressIn = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
  };

  const navItems = [
    { name: "Ejercicios", route: "/ejercicio", color: Colors.buttons.red, icon: "barbell-outline" as const },
    { name: "Criatura", route: "/", color: Colors.buttons.green, icon: "sparkles-outline" as const },
    { name: "Batalla", route: "/batalla", color: Colors.buttons.blue, icon: "flash-outline" as const },
  ];

  return (
    <BrickWallPanel rows={6} style={{ borderTopWidth: 2, borderTopColor: "rgba(0,0,0,0.1)" }}>
      <View style={[styles.bottomButtons, { paddingBottom: insets.bottom + 5 }]}>
        {navItems.map((item) => {
          const isActive = pathname === item.route || (item.route === "/" && pathname === "/index");

          return (
            <Pressable
              key={item.name}
              onPressIn={handlePressIn}
              onPress={() => router.push(item.route as any)}
              style={({ pressed }) => [
                styles.navBtn,
                { 
                  backgroundColor: "#fff", 
                  borderColor: item.color, 
                  borderBottomWidth: Shadows.button.borderBottomWidth 
                },
                pressed && styles.btnPressed,
                isActive && { backgroundColor: `${item.color}1A` }
              ]}
            >
              <View style={styles.navBtnInner}>
                <Ionicons name={item.icon} size={22} color={item.color} />
                <Text style={[styles.navBtnText, { color: item.color }]}>{item.name}</Text>
              </View>
            </Pressable>
          );
        })}
      </View>
    </BrickWallPanel>
  );
}

const styles = StyleSheet.create({
  bottomButtons: {
    ...StyleSheet.absoluteFillObject,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingHorizontal: 12,
  },
  navBtn: {
    borderRadius: 45, 
    borderWidth: 2,
    width: 95,
    height: 95,
    justifyContent: "center",
    elevation: 4,
  },
  btnPressed: {
    transform: [{ translateY: Shadows.button.pressedTransform }],
    borderBottomWidth: 2,
    marginTop: Shadows.button.pressedTransform,
  },
  navBtnInner: {
    alignItems: "center",
    justifyContent: "center",
  },
  navBtnText: {
    fontSize: 7,
    fontFamily: Typography.retro,
    marginTop: 8,
    textAlign: "center",
  },
});

