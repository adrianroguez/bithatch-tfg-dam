import React, { useState } from "react";
import { 
  View, 
  Text, 
  StyleSheet, 
  Pressable, 
  SafeAreaView, 
  Image,
  Modal,
  ActivityIndicator
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Navbar } from "../components/Navbar";
import { useCreature } from "../context/CreatureContext";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as Haptics from "expo-haptics";
import BrickWallPanel from "../components/BrickWallPanel";

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
            <Text style={styles.titleBit}>Deta</Text>
            <Text style={styles.titleHatch}>lle</Text>
          </View>

          <Pressable
            style={({ pressed }) => [styles.iconBtn, {backgroundColor: '#FFEB3B', borderColor: '#FBC02D'}, pressed && styles.btnPressed]}
            onPressIn={handlePressIn}
            onPress={() => setShowFinishModal(true)}
          >
            <View style={styles.iconBtnInner}>
              <Ionicons name="checkmark-circle-outline" size={22} color="#F57F17" />
              <Text style={[styles.iconBtnLabel, {color: '#F57F17'}]}>Fin</Text>
            </View>
          </Pressable>
        </View>
      </BrickWallPanel>

      {/* ── PANTALLA CENTRAL (LCD Hundida) ── */}
      <View style={styles.screen}>
        <View style={styles.content}>
          <Text style={styles.exerciseTitle}>{`<${name || "Ejercicio"}>`}</Text>
          
          <View style={styles.avatarContainer}>
            <Image 
              source={require("../assets/egg_c.png")} 
              style={styles.avatar} 
            />
            <Text style={styles.metricText}>{metric}</Text>
          </View>

          <View style={styles.progressArea}>
            <Text style={styles.progressLabel}>{"<Progreso>"}</Text>
            <View style={styles.progressBarBg}>
              <View style={[styles.progressBarFill, { width: "65%" }]} />
            </View>
            <Text style={styles.percentageText}>65% completado</Text>
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
                <Text style={styles.modalSub}>¿Cómo lo has hecho?</Text>
                
                <View style={styles.optionButtons}>
                  <Pressable 
                    style={({pressed}) => [styles.optionBtn, pressed && styles.btnPressed]} 
                    onPress={() => handleFinish("Parcial")}
                    disabled={loading}
                    onPressIn={handlePressIn}
                  >
                    <Text style={styles.optionBtnText}>Parcial</Text>
                  </Pressable>
                  
                  <Pressable 
                    style={({pressed}) => [styles.optionBtn, { backgroundColor: "#388E3C", borderColor: "#1B5E20" }, pressed && styles.btnPressed]} 
                    onPress={() => handleFinish("Total")}
                    disabled={loading}
                    onPressIn={handlePressIn}
                  >
                    <Text style={styles.optionBtnText}>Total</Text>
                  </Pressable>
                </View>
                
                {loading && <ActivityIndicator style={{ marginTop: 20 }} color="#2E7D32" />}
              </>
            ) : (
              <View style={styles.resultContainer}>
                <Ionicons name="checkmark-circle" size={60} color="#388E3C" />
                <Text style={styles.resultTitle}>FINALIZADO</Text>
                <Text style={styles.expText}>
                  {`Exp: +${resultExp}`}
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
    backgroundColor: "#2E7D32", 
    borderRadius: 14,
    borderWidth: 2,
    borderBottomWidth: 5,
    borderColor: "#1B5E20", 
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
    color: "#D32F2F", // Ejercicio rojo
    fontFamily: "PressStart2P",
  },
  screen: {
    flex: 1,
    paddingHorizontal: 10,
    backgroundColor: "#E8F5E9",
    borderWidth: 8,
    borderTopColor: "#78909C",
    borderLeftColor: "#90A4AE",
    borderRightColor: "#CFD8DC",
    borderBottomColor: "#FFFFFF",
  },
  content: {
    flex: 1,
    alignItems: "center",
    paddingTop: 40,
  },
  exerciseTitle: {
    fontSize: 20,
    color: "#333",
    fontFamily: "PressStart2P",
    marginBottom: 40,
    textAlign: "center",
  },
  avatarContainer: {
    alignItems: "center",
    marginBottom: 50,
  },
  avatar: {
    width: 180,
    height: 180,
    resizeMode: "contain",
  },
  metricText: {
    fontSize: 18,
    color: "#D32F2F",
    marginTop: 10,
    fontWeight: "900",
    fontFamily: "PressStart2P",
  },
  progressArea: {
    width: "80%",
    alignItems: "center",
  },
  progressLabel: {
    fontSize: 12,
    color: "#388E3C",
    marginBottom: 15,
    fontFamily: "PressStart2P",
  },
  progressBarBg: {
    width: "100%",
    height: 20,
    backgroundColor: "#CFD8DC",
    borderWidth: 2,
    borderColor: "#90A4AE",
    borderRadius: 4,
    overflow: "hidden",
    marginBottom: 8,
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: "#4CAF50",
    borderRightWidth: 2,
    borderColor: "#388E3C",
  },
  percentageText: {
    fontSize: 10,
    color: "#555",
    fontFamily: "PressStart2P",
    marginTop: 5,
  },
  // Modal Styles (Retro themed)
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "85%",
    backgroundColor: "#F1F8E9",
    borderWidth: 6,
    borderColor: "#A5D6A7",
    borderRadius: 16,
    padding: 25,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 10,
  },
  modalTitle: {
    fontSize: 16,
    color: "#2E7D32",
    marginBottom: 15,
    fontFamily: "PressStart2P",
  },
  modalSub: {
    fontSize: 12,
    color: "#444",
    textAlign: "center",
    marginBottom: 30,
    fontWeight: "bold",
  },
  optionButtons: {
    flexDirection: "row",
    gap: 15,
    width: "100%",
    justifyContent: "center",
  },
  optionBtn: {
    backgroundColor: "#F57C00",
    borderWidth: 2,
    borderBottomWidth: 5,
    borderColor: "#E65100",
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 12,
    minWidth: 100,
    alignItems: "center",
  },
  optionBtnText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 12,
    fontFamily: "PressStart2P",
  },
  resultContainer: {
    alignItems: "center",
    width: "100%",
  },
  resultTitle: {
    fontSize: 16,
    color: "#388E3C",
    marginTop: 15,
    fontFamily: "PressStart2P",
  },
  expText: {
    fontSize: 14,
    color: "#333",
    marginTop: 15,
    marginBottom: 30,
    fontFamily: "PressStart2P",
  },
  closeBtn: {
    backgroundColor: "#1976D2",
    borderWidth: 2,
    borderBottomWidth: 5,
    borderColor: "#0D47A1",
    paddingVertical: 12,
    width: "100%",
    borderRadius: 12,
    alignItems: "center",
  },
  closeBtnText: {
    color: "white",
    fontSize: 12,
    fontFamily: "PressStart2P",
  }
});


