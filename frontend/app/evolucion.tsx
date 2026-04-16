import React from "react";
import { View, Text, StyleSheet, Image, Pressable, StatusBar } from "react-native";
import { useRouter } from "expo-router";
import * as Haptics from "expo-haptics";
import BrickWallPanel from "../components/BrickWallPanel";
import { Colors, Typography, Spacing, Shadows } from "../constants/theme";

export default function EvolucionScreen() {
  const router = useRouter();

  const handlePressIn = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
  };

  const handleContinue = () => {
    handlePressIn();
    router.replace("/");
  };

  return (
    <View style={styles.root}>
      <StatusBar barStyle="dark-content" />
      
      <BrickWallPanel rows={20} style={StyleSheet.absoluteFillObject} />

      <View style={styles.container}>
        <View style={styles.screenBezel}>
          <View style={styles.lcdContent}>
            
            <View style={styles.logoContainer}>
              <Text style={styles.logoText}>¡EVOLUCIÓN!</Text>
            </View>

            <View style={styles.avatarSection}>
              <Image 
                source={require("../assets/egg_a.png")} 
                style={styles.creatureImage} 
              />
            </View>

            <View style={styles.descriptionContainer}>
              <Text style={styles.descriptionText}>
                ¡TU CRIATURA HA CRECIDO Y SE HA VUELTO MÁS FUERTE!
              </Text>
              <Text style={styles.subDescription}>
                NUEVAS HABILIDADES DESBLOQUEADAS.
              </Text>
            </View>

            <Pressable 
              style={({pressed}) => [styles.primaryBtn, pressed && styles.btnPressed]} 
              onPressIn={handlePressIn}
              onPress={handleContinue}
            >
              <Text style={styles.primaryBtnText}>CONTINUAR</Text>
            </Pressable>

          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.structure.mortar,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    padding: Spacing.lg,
  },
  screenBezel: {
    backgroundColor: Colors.lcd.background,
    borderRadius: 20,
    borderWidth: 10,
    borderTopColor: Colors.bezel.top,
    borderLeftColor: Colors.bezel.left,
    borderRightColor: Colors.bezel.right,
    borderBottomColor: Colors.bezel.bottom,
    overflow: "hidden",
    elevation: 20,
  },
  lcdContent: {
    padding: Spacing.xl,
    alignItems: "center",
    justifyContent: "space-between",
  },
  logoContainer: {
    marginBottom: 20,
  },
  logoText: {
    fontFamily: Typography.retro,
    fontSize: 14,
    color: Colors.lcd.text,
  },
  avatarSection: {
    marginVertical: 20,
  },
  creatureImage: {
    width: 180,
    height: 180,
    resizeMode: "contain",
  },
  descriptionContainer: {
    width: "100%",
    backgroundColor: "rgba(0,0,0,0.03)",
    padding: 16,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "rgba(0,0,0,0.05)",
    marginVertical: 20,
  },
  descriptionText: {
    fontFamily: Typography.retro,
    fontSize: 8,
    color: Colors.lcd.text,
    textAlign: "center",
    lineHeight: 14,
    marginBottom: 10,
  },
  subDescription: {
    fontFamily: Typography.retro,
    fontSize: 6,
    color: "gray",
    textAlign: "center",
  },
  primaryBtn: {
    backgroundColor: Colors.buttons.green,
    paddingVertical: 16,
    width: "100%",
    borderRadius: 8,
    borderWidth: 2,
    borderBottomWidth: 6,
    borderColor: Colors.lcd.text,
    alignItems: "center",
    marginTop: 10,
  },
  btnPressed: {
    transform: [{ translateY: Shadows.button.pressedTransform }],
    borderBottomWidth: 2,
    marginTop: Shadows.button.pressedTransform,
  },
  primaryBtnText: {
    fontFamily: Typography.retro,
    color: "white",
    fontSize: 10,
  },
});
