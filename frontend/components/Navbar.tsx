import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { useRouter, usePathname } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as Haptics from "expo-haptics";
import BrickWallPanel from "./BrickWallPanel";

export function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const insets = useSafeAreaInsets();

  const handlePressIn = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
  };

  const navItems = [
    { name: "Ejercicios", route: "/ejercicio", color: "#D32F2F", icon: "barbell-outline" as const },
    { name: "Criatura", route: "/", color: "#388E3C", icon: "sparkles-outline" as const },
    { name: "Batalla", route: "/batalla", color: "#1976D2", icon: "flash-outline" as const },
  ];

  return (
    <BrickWallPanel rows={6}>
      <View style={[styles.bottomButtons, { paddingBottom: insets.bottom }]}>
        {navItems.map((item) => {
          const isActive = pathname === item.route || (item.route === "/" && pathname === "/index");

          return (
            <Pressable
              key={item.name}
              onPressIn={handlePressIn}
              onPress={() => router.push(item.route as any)}
              style={({ pressed }) => [
                styles.navBtn,
                { backgroundColor: "#fff", borderColor: item.color, borderBottomWidth: 5 },
                pressed && styles.btnPressed,
                isActive && { backgroundColor: `${item.color}1A` } // Sutil fondo para activo
              ]}
            >
              <View style={styles.navBtnInner}>
                <Ionicons name={item.icon} size={20} color={item.color} />
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
    borderRadius: 45, // Circular
    borderWidth: 2,
    width: 90,
    height: 90,
    justifyContent: "center",
  },
  btnPressed: {
    transform: [{ translateY: 3 }],
    borderBottomWidth: 2,
    marginTop: 3,
  },
  navBtnInner: {
    alignItems: "center",
    justifyContent: "center",
  },
  navBtnText: {
    fontSize: 9,
    fontWeight: "900",
    marginTop: 4,
    letterSpacing: 0,
  },
});
