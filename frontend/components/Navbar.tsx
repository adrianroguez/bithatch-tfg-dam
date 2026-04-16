import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter, usePathname } from "expo-router";

/**
 * Reusable Navbar component based on the app's footer design.
 */
export function Navbar() {
  const router = useRouter();
  const pathname = usePathname();

  const navItems = [
    { name: "Ejercicios", route: "/ejercicio", color: "#FF4D4D" },
    { name: "Criatura", route: "/", color: "#4D94FF" },
    { name: "Batalla", route: "/batalla", color: "#4CAF50" },
  ];

  return (
    <View style={styles.footer}>
      {navItems.map((item) => {
        const isActive = pathname === item.route || (item.route === "/" && pathname === "/index");
        
        return (
          <TouchableOpacity
            key={item.name}
            style={[
              styles.navButton,
              { borderColor: item.color },
              isActive && { backgroundColor: item.color + "1A" } // Subtle background for active
            ]}
            onPress={() => router.push(item.route as any)}
          >
            <Text style={[styles.navButtonText, isActive && { color: item.color }]}>
              {item.name}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingBottom: 40,
    paddingHorizontal: 10,
    backgroundColor: 'white',
  },
  navButton: {
    borderWidth: 2,
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 15,
    minWidth: 100,
    alignItems: "center",
    backgroundColor: "white",
  },
  navButtonText: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#333",
  },
});
