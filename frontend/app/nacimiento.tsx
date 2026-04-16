import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  Image,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  TouchableOpacity
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import * as Haptics from "expo-haptics";
import { useCreature } from "../context/CreatureContext";
import BrickWallPanel from "../components/BrickWallPanel";
import { Colors, Typography, Spacing, Shadows } from "../constants/theme";

const EGG_IMAGES: Record<string, any> = {
  EGG_A: require("../assets/egg_a.png"),
  EGG_B: require("../assets/egg_b.png"),
  EGG_C: require("../assets/egg_c.png"),
};

export default function NacimientoScreen() {
  const router = useRouter();
  const { eggType } = useLocalSearchParams<{ eggType: string }>();
  const { createStarter } = useCreature();
  
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handlePressIn = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
  };

  const handleContinue = async () => {
    handlePressIn();
    if (!name.trim()) {
      setError("INGRESA UN NOMBRE");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await createStarter(name.toUpperCase(), eggType || "EGG_A");
      if (res.ok) {
        router.replace("/");
      } else {
        setError(res.msg?.toUpperCase() || "ERROR");
      }
    } catch (err) {
      setError("ERROR DE CONEXIÓN");
    } finally {
      setLoading(false);
    }
  };

  const eggImage = EGG_IMAGES[eggType || "EGG_A"];

  return (
    <View style={styles.root}>
      <StatusBar barStyle="dark-content" />
      
      <BrickWallPanel rows={20} style={StyleSheet.absoluteFillObject} />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <View style={styles.screenBezel}>
          <View style={styles.lcdContent}>
            
            <View style={styles.logoContainer}>
              <Text style={styles.logoText}>NACIMIENTO</Text>
            </View>

            <View style={styles.avatarSection}>
              <Image source={eggImage} style={styles.eggImage} />
            </View>

            <View style={styles.form}>
              <Text style={styles.label}>PONLE UN NOMBRE:</Text>
              <TextInput
                style={styles.input}
                placeholder="NOMBRE..."
                placeholderTextColor="rgba(0,0,0,0.3)"
                value={name}
                onChangeText={setName}
                autoFocus
                autoCapitalize="characters"
              />
              {error ? (
                <View style={styles.errorBox}>
                  <Text style={styles.errorText}>{error}</Text>
                </View>
              ) : null}
            </View>

            <Pressable
              style={({pressed}) => [styles.primaryBtn, pressed && styles.btnPressed, loading && styles.buttonDisabled]}
              onPressIn={handlePressIn}
              onPress={handleContinue}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="white" />
              ) : (
                <Text style={styles.primaryBtnText}>CONTINUAR</Text>
              )}
            </Pressable>

          </View>
        </View>
      </KeyboardAvoidingView>
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
  },
  logoContainer: {
    marginBottom: 20,
  },
  logoText: {
    fontFamily: Typography.retro,
    fontSize: 16,
    color: Colors.lcd.text,
  },
  avatarSection: {
    marginBottom: 30,
  },
  eggImage: {
    width: 140,
    height: 140,
    resizeMode: "contain",
  },
  form: {
    width: "100%",
    marginBottom: 30,
  },
  label: {
    fontFamily: Typography.retro,
    fontSize: 7,
    color: Colors.lcd.primary,
    marginBottom: 10,
    textAlign: "center",
  },
  input: {
    borderWidth: 2,
    borderColor: Colors.lcd.text,
    borderRadius: 4,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontFamily: Typography.retro,
    fontSize: 8,
    backgroundColor: "rgba(0,0,0,0.03)",
    textAlign: "center",
  },
  errorBox: {
    marginTop: 10,
    padding: 6,
    backgroundColor: "rgba(211, 47, 47, 0.1)",
    borderWidth: 1,
    borderColor: Colors.buttons.red,
    borderRadius: 4,
  },
  errorText: {
    fontFamily: Typography.retro,
    fontSize: 6,
    color: Colors.buttons.red,
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
  },
  buttonDisabled: {
    opacity: 0.7,
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
