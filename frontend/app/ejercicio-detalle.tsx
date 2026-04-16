import React, { useState } from "react";
import { 
  View, 
  Text, 
  StyleSheet, 
  Pressable, 
  Image,
  Modal,
  ActivityIndicator,
  StatusBar
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Navbar } from "../components/Navbar";
import { useCreature } from "../context/CreatureContext";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as Haptics from "expo-haptics";
import BrickWallPanel from "../components/BrickWallPanel";
import { Colors, Typography, Spacing, Shadows } from "../constants/theme";

export default function EjercicioDetalleScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { name, metric, id } = useLocalSearchParams<{ name: string; metric: string; id: string }>();
  const { creature } = useCreature();
  
  const [showFinishModal, setShowFinishModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultExp, setResultExp] = useState<number | null>(null);

  const handlePressIn = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
  };

  const handleFinish = async (type: "Parcial" | "Total") => {
    handlePressIn();
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      const expGained = type === "Total" ? 50 : 25; 
      setResultExp(expGained);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const closeAndReturn = () => {
    handlePressIn();
    setShowFinishModal(false);
    router.replace("/");
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
            <Text style={styles.titleText}>DETALLE</Text>
          </View>

          <Pressable
            style={({ pressed }) => [
              styles.iconBtn, 
              { backgroundColor: Colors.buttons.yellow }, 
              pressed && styles.btnPressed
            ]}
            onPressIn={handlePressIn}
            onPress={() => setShowFinishModal(true)}
          >
            <View style={styles.iconBtnInner}>
              <Ionicons name="checkmark-circle-outline" size={20} color={Colors.lcd.text} />
              <Text style={[styles.iconBtnLabel, {color: Colors.lcd.text}]}>FIN</Text>
            </View>
          </Pressable>
        </View>
      </BrickWallPanel>

      {/* LCD SCREEN */}
      <View style={styles.screenWrapper}>
        <View style={styles.screenBezel}>
          <View style={styles.lcdContent}>
            <Text style={styles.exerciseTitle}>{name?.toUpperCase() || "EJERCICIO"}</Text>
            
            <View style={styles.avatarContainer}>
              <Image 
                source={require("../assets/egg_c.png")} 
                style={styles.avatar} 
              />
              <View style={styles.metricBadge}>
                <Text style={styles.metricText}>{metric}</Text>
              </View>
            </View>

            <View style={styles.progressArea}>
              <Text style={styles.progressLabel}>PROGRESO</Text>
              <View style={styles.progressBarBg}>
                <View style={[styles.progressBarFill, { width: "65%" }]} />
              </View>
              <Text style={styles.percentageText}>65% COMPLETADO</Text>
            </View>
          </View>
        </View>
      </View>

      <Navbar />

      {/* Finishing Options / Result Modal */}
      <Modal visible={showFinishModal} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {resultExp === null ? (
              <>
                <Text style={styles.modalTitle}>FINALIZAR</Text>
                <Text style={styles.modalSub}>¿CÓMO LO HAS HECHO?</Text>
                
                <View style={styles.optionButtons}>
                  <Pressable 
                    style={({pressed}) => [styles.optionBtn, pressed && styles.btnPressed]} 
                    onPress={() => handleFinish("Parcial")}
                    disabled={loading}
                    onPressIn={handlePressIn}
                  >
                    <Text style={styles.optionBtnText}>PARCIAL</Text>
                  </Pressable>
                  
                  <Pressable 
                    style={({pressed}) => [
                      styles.optionBtn, 
                      { backgroundColor: Colors.buttons.green }, 
                      pressed && styles.btnPressed
                    ]} 
                    onPress={() => handleFinish("Total")}
                    disabled={loading}
                    onPressIn={handlePressIn}
                  >
                    <Text style={styles.optionBtnText}>TOTAL</Text>
                  </Pressable>
                </View>
                
                {loading && <ActivityIndicator style={{ marginTop: 20 }} color={Colors.lcd.primary} />}
              </>
            ) : (
              <View style={styles.resultContainer}>
                <Ionicons name="checkmark-circle" size={60} color={Colors.lcd.primary} />
                <Text style={styles.resultTitle}>¡COMPLETADO!</Text>
                <Text style={styles.expText}>
                  {`EXP: +${resultExp}`}
                </Text>
                <Pressable 
                  style={({pressed}) => [styles.closeBtn, pressed && styles.btnPressed]} 
                  onPress={closeAndReturn}
                  onPressIn={handlePressIn}
                >
                  <Text style={styles.closeBtnText}>CONTINUAR</Text>
                </Pressable>
              </View>
            )}
          </View>
        </View>
      </Modal>
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
    backgroundColor: Colors.buttons.green, 
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
    paddingHorizontal: 8,
    paddingVertical: 6,
    minWidth: 50,
  },
  iconBtnLabel: {
    fontFamily: Typography.retro,
    color: Colors.buttons.text,
    fontSize: 6,
    marginTop: 4,
  },
  titleRow: {
    paddingVertical: 6,
    paddingHorizontal: 16,
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
    alignItems: "center",
    paddingTop: 30,
    paddingHorizontal: Spacing.md,
  },
  exerciseTitle: {
    fontFamily: Typography.retro,
    fontSize: 14,
    color: Colors.lcd.text,
    marginBottom: 30,
    textAlign: "center",
  },
  avatarContainer: {
    alignItems: "center",
    marginBottom: 40,
  },
  avatar: {
    width: 160,
    height: 160,
    resizeMode: "contain",
  },
  metricBadge: {
    marginTop: 15,
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: "rgba(0,0,0,0.05)",
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.1)",
    borderRadius: 4,
  },
  metricText: {
    fontFamily: Typography.retro,
    fontSize: 10,
    color: Colors.buttons.red,
  },
  progressArea: {
    width: "100%",
    alignItems: "center",
  },
  progressLabel: {
    fontFamily: Typography.retro,
    fontSize: 8,
    color: Colors.lcd.primary,
    marginBottom: 12,
  },
  progressBarBg: {
    width: "100%",
    height: 16,
    backgroundColor: "rgba(0,0,0,0.05)",
    borderWidth: 2,
    borderColor: Colors.lcd.text,
    borderRadius: 2,
    overflow: "hidden",
    marginBottom: 8,
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: Colors.lcd.primary,
    borderRightWidth: 2,
    borderColor: "rgba(0,0,0,0.1)",
  },
  percentageText: {
    fontFamily: Typography.retro,
    fontSize: 7,
    color: "gray",
    marginTop: 4,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.7)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "85%",
    backgroundColor: Colors.lcd.background,
    borderWidth: 6,
    borderColor: Colors.lcd.primary,
    borderRadius: 16,
    padding: 24,
    alignItems: "center",
  },
  modalTitle: {
    fontFamily: Typography.retro,
    fontSize: 14,
    color: Colors.lcd.primary,
    marginBottom: 12,
  },
  modalSub: {
    fontFamily: Typography.retro,
    fontSize: 8,
    color: "gray",
    textAlign: "center",
    marginBottom: 24,
  },
  optionButtons: {
    flexDirection: "row",
    gap: 16,
    width: "100%",
    justifyContent: "center",
  },
  optionBtn: {
    backgroundColor: Colors.buttons.blue,
    borderWidth: 2,
    borderBottomWidth: Shadows.button.borderBottomWidth,
    borderColor: Colors.lcd.text,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    minWidth: 100,
    alignItems: "center",
  },
  optionBtnText: {
    fontFamily: Typography.retro,
    color: "white",
    fontSize: 8,
  },
  resultContainer: {
    alignItems: "center",
    width: "100%",
  },
  resultTitle: {
    fontFamily: Typography.retro,
    fontSize: 12,
    color: Colors.lcd.primary,
    marginTop: 16,
  },
  expText: {
    fontFamily: Typography.retro,
    fontSize: 10,
    color: Colors.lcd.text,
    marginTop: 12,
    marginBottom: 24,
  },
  closeBtn: {
    backgroundColor: Colors.buttons.green,
    borderWidth: 2,
    borderBottomWidth: Shadows.button.borderBottomWidth,
    borderColor: Colors.lcd.text,
    paddingVertical: 12,
    width: "100%",
    borderRadius: 8,
    alignItems: "center",
  },
  closeBtnText: {
    fontFamily: Typography.retro,
    color: "white",
    fontSize: 10,
  }
});
