import React, { useState } from "react";
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  SafeAreaView, 
  Image,
  Modal,
  ActivityIndicator,
  Platform
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Navbar } from "../components/Navbar";
import { useCreature } from "../context/CreatureContext";

/**
 * Detailed view of a selected exercise session.
 */
export default function EjercicioDetalleScreen() {
  const router = useRouter();
  const { name, metric, id } = useLocalSearchParams<{ name: string; metric: string; id: string }>();
  const { creature } = useCreature();
  
  const [showFinishModal, setShowFinishModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultExp, setResultExp] = useState<number | null>(null);

  const handleFinish = async (type: "Parcial" | "Total") => {
    setLoading(true);
    // Simulation of API call to backend
    // In a real scenario, we would use fetch(`${apiUrl}/exercises/finish`, { ... })
    try {
      // Simulating a delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      const expGained = type === "Total" ? 50 : 25; // Logic handled by backend ideally
      setResultExp(expGained);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const closeAndReturn = () => {
    setShowFinishModal(false);
    router.replace("/");
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="chevron-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Ejercicios</Text>
        <TouchableOpacity 
          style={styles.finishTopBtn} 
          onPress={() => setShowFinishModal(true)}
        >
          <Text style={styles.finishTopBtnText}>Finalizar</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <Text style={styles.exerciseTitle}>{`<${name || "Ejercicio"}>`}</Text>
        
        <View style={styles.avatarContainer}>
          <Image 
            source={require("../assets/egg_c.png")} // Defaulting to an asset, should ideally use context
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

      <Navbar />

      {/* Finishing Options / Result Modal */}
      <Modal visible={showFinishModal} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {resultExp === null ? (
              <>
                <Text style={styles.modalTitle}>Finalización</Text>
                <Text style={styles.modalSub}>¿Cómo has completado el ejercicio?</Text>
                
                <View style={styles.optionButtons}>
                  <TouchableOpacity 
                    style={styles.optionBtn} 
                    onPress={() => handleFinish("Parcial")}
                    disabled={loading}
                  >
                    <Text style={styles.optionBtnText}>Parcial</Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity 
                    style={[styles.optionBtn, { backgroundColor: "#4CAF50" }]} 
                    onPress={() => handleFinish("Total")}
                    disabled={loading}
                  >
                    <Text style={styles.optionBtnText}>Total</Text>
                  </TouchableOpacity>
                </View>
                
                {loading && <ActivityIndicator style={{ marginTop: 20 }} color="#4D94FF" />}
              </>
            ) : (
              <View style={styles.resultContainer}>
                <Ionicons name="checkmark-circle" size={60} color="#4CAF50" />
                <Text style={styles.resultTitle}>Finalizado</Text>
                <Text style={styles.expText}>
                  {`Ganancia de exp: +${resultExp}`}
                </Text>
                <TouchableOpacity style={styles.closeBtn} onPress={closeAndReturn}>
                  <Text style={styles.closeBtnText}>Continuar</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  backBtn: {
    padding: 5,
  },
  finishTopBtn: {
    backgroundColor: "#F0F0F0",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  finishTopBtnText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#666",
  },
  content: {
    flex: 1,
    alignItems: "center",
    paddingTop: 40,
  },
  exerciseTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
    marginBottom: 40,
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
    color: "#666",
    marginTop: 10,
    fontWeight: "500",
  },
  progressArea: {
    width: "80%",
    alignItems: "center",
  },
  progressLabel: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#4D94FF",
    marginBottom: 15,
  },
  progressBarBg: {
    width: "100%",
    height: 15,
    backgroundColor: "#E0E0E0",
    borderRadius: 10,
    overflow: "hidden",
    marginBottom: 8,
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: "#4CAF50",
  },
  percentageText: {
    fontSize: 12,
    color: "#999",
  },
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "85%",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 25,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 10,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  modalSub: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    marginBottom: 25,
  },
  optionButtons: {
    flexDirection: "row",
    gap: 15,
    width: "100%",
    justifyContent: "center",
  },
  optionBtn: {
    backgroundColor: "#FFB347",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 12,
    minWidth: 100,
    alignItems: "center",
  },
  optionBtnText: {
    color: "white",
    fontWeight: "bold",
  },
  resultContainer: {
    alignItems: "center",
    width: "100%",
  },
  resultTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#4CAF50",
    marginTop: 15,
  },
  expText: {
    fontSize: 18,
    color: "#333",
    marginTop: 10,
    marginBottom: 30,
    fontWeight: "700",
  },
  closeBtn: {
    backgroundColor: "#4D94FF",
    paddingVertical: 12,
    width: "100%",
    borderRadius: 12,
    alignItems: "center",
  },
  closeBtnText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  }
});


