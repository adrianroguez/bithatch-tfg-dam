import React from "react";
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  FlatList, 
  Image,
  Pressable
} from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Navbar } from "../components/Navbar";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as Haptics from "expo-haptics";
import BrickWallPanel from "../components/BrickWallPanel";

const EXERCISES_DATA = [
  { id: "1", name: "Sentadilla", metric: "3x12", icon: "weight-lifter" },
  { id: "2", name: "Mancuerna", metric: "4x10", icon: "dumbbell" },
  { id: "3", name: "Flexiones", metric: "3x15", icon: "arm-flex" },
  { id: "4", name: "Caminar", metric: "30 min", icon: "walk" },
  { id: "5", name: "Correr", metric: "5.00 km", icon: "run" },
];

export default function ExercisesScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const handlePressIn = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
  };

  const handleExercisePress = (item: typeof EXERCISES_DATA[0]) => {
    handlePressIn();
    router.push({
      pathname: "/ejercicio-detalle",
      params: { id: item.id, name: item.name, metric: item.metric }
    });
  };

  const renderItem = ({ item }: { item: typeof EXERCISES_DATA[0] }) => (
    <Pressable 
      style={({ pressed }) => [styles.tableRow, pressed && { backgroundColor: '#e0e0e0' }]} 
      onPress={() => handleExercisePress(item)}
    >
      <View style={styles.iconColumn}>
        <MaterialCommunityIcons name={item.icon as any} size={24} color="#555" />
      </View>
      <View style={styles.nameColumn}>
        <Text style={styles.exerciseName}>{item.name}</Text>
      </View>
      <View style={styles.metricColumn}>
        <Text style={styles.exerciseMetric}>{item.metric}</Text>
      </View>
    </Pressable>
  );

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
            <Text style={styles.titleBit}>Ejer</Text>
            <Text style={styles.titleHatch}>cicio</Text>
          </View>

          <View style={{ width: 68 }} />
        </View>
      </BrickWallPanel>

      {/* ── PANTALLA CENTRAL (LCD Hundida) ── */}
      <View style={styles.screen}>
        <View style={styles.tableContainer}>
          <View style={styles.tableHeader}>
            <Text style={[styles.headerLabel, { flex: 1 }]}>Ico</Text>
            <Text style={[styles.headerLabel, { flex: 2 }]}>Nombre</Text>
            <Text style={[styles.headerLabel, { flex: 1.5 }]}>Meta</Text>
          </View>

          <FlatList
            data={EXERCISES_DATA}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.listContent}
          />
          
          <Image 
            source={require("../assets/egg_c.png")} 
            style={styles.sideCreature} 
          />
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
  /* ── Botones superiores ── */
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
    color: "#D32F2F", // Color rojo para ejercicios
    fontFamily: "PressStart2P",
  },

  /* ── Pantalla central ── */
  screen: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: "#E8F5E9",
    borderWidth: 8,
    borderTopColor: "#78909C",
    borderLeftColor: "#90A4AE",
    borderRightColor: "#CFD8DC",
    borderBottomColor: "#FFFFFF",
  },
  tableContainer: {
    flex: 1,
    backgroundColor: "white",
    borderRadius: 12,
    overflow: "hidden",
    borderWidth: 3,
    borderColor: "#90A4AE",
    position: 'relative',
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#F8F8F8",
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderBottomWidth: 2,
    borderBottomColor: "#CFD8DC",
  },
  headerLabel: {
    fontWeight: "bold",
    color: "#333",
    fontSize: 12,
    fontFamily: "PressStart2P", // Tipografía de juego para cabeceras
    textTransform: "uppercase",
  },
  listContent: {
    paddingBottom: 20,
  },
  tableRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  iconColumn: {
    flex: 1,
  },
  nameColumn: {
    flex: 2,
  },
  metricColumn: {
    flex: 1.5,
  },
  exerciseName: {
    fontSize: 16,
    color: "#333",
    fontWeight: "800",
  },
  exerciseMetric: {
    fontSize: 15,
    color: "#D32F2F",
    fontWeight: "900",
  },
  sideCreature: {
    position: 'absolute',
    right: -20,
    bottom: 40,
    width: 100,
    height: 100,
    opacity: 0.1, 
    resizeMode: 'contain',
  },
});
;