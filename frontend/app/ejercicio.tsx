import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  Image
} from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

// Datos basados en los iconos de tu mockup
const EXERCISES_DATA = [
  { id: "1", name: "Sentadilla", metric: "3x12", icon: "weight-lifter" },
  { id: "2", name: "Mancuerna", metric: "4x10", icon: "dumbbell" },
  { id: "3", name: "Flexiones", metric: "3x15", icon: "arm-flex" },
  { id: "4", name: "Caminar", metric: "30 min", icon: "walk" },
  { id: "5", name: "Correr", metric: "5.00 km", icon: "run" },
];

export default function ExercisesScreen() {
  const router = useRouter();

  const renderItem = ({ item }: { item: typeof EXERCISES_DATA[0] }) => (
    <View style={styles.tableRow}>
      <View style={styles.iconColumn}>
        <MaterialCommunityIcons name={item.icon as any} size={24} color="#555" />
      </View>
      <View style={styles.nameColumn}>
        <Text style={styles.exerciseName}>{item.name}</Text>
      </View>
      <View style={styles.metricColumn}>
        <Text style={styles.exerciseMetric}>{item.metric}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header con pestañas (Tab 1, Tab 2, Tab 3 del mockup) */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="chevron-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Ejercicios</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.tabContainer}>
        <TouchableOpacity style={[styles.tab, styles.activeTab]}><Text style={styles.tabText}>Tab 1</Text></TouchableOpacity>
        <TouchableOpacity style={styles.tab}><Text style={styles.tabText}>Tab 2</Text></TouchableOpacity>
        <TouchableOpacity style={styles.tab}><Text style={styles.tabText}>Tab 3</Text></TouchableOpacity>
      </View>

      {/* Contenedor de la Tabla */}
      <View style={styles.tableContainer}>
        <View style={styles.tableHeader}>
          <Text style={[styles.headerLabel, { flex: 1 }]}>Icono</Text>
          <Text style={[styles.headerLabel, { flex: 2 }]}>Ejercicio</Text>
          <Text style={[styles.headerLabel, { flex: 1.5 }]}>Series/Dist.</Text>
        </View>

        <FlatList
          data={EXERCISES_DATA}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
        />

        {/* Silueta de la criatura que aparece a la derecha de la tabla en tu mockup */}
        <Image
          source={require("../assets/egg_c.png")}
          style={styles.sideCreature}
        />
      </View>

      {/* Botón de acción inferior (el botón cuadrado con icono de flecha del mockup) */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="play" size={30} color="white" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F0F4F8",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  backBtn: {
    padding: 5,
  },
  tabContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 10,
    gap: 10,
  },
  tab: {
    paddingVertical: 6,
    paddingHorizontal: 20,
    borderRadius: 15,
    backgroundColor: "#E0E0E0",
  },
  activeTab: {
    backgroundColor: "#4D94FF",
  },
  tabText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#FFF",
  },
  tableContainer: {
    flex: 1,
    marginHorizontal: 15,
    backgroundColor: "white",
    borderRadius: 20,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#DDD",
    position: 'relative',
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#F8F8F8",
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#EEE",
  },
  headerLabel: {
    fontWeight: "bold",
    color: "#666",
    fontSize: 12,
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
    fontSize: 15,
    color: "#333",
    fontWeight: "500",
  },
  exerciseMetric: {
    fontSize: 14,
    color: "#4D94FF",
    fontWeight: "bold",
  },
  sideCreature: {
    position: 'absolute',
    right: -20,
    bottom: 40,
    width: 100,
    height: 100,
    opacity: 0.2, // Estilo marca de agua como en el mockup
    resizeMode: 'contain',
  },
  footer: {
    paddingVertical: 20,
    alignItems: "center",
  },
  actionButton: {
    backgroundColor: "#FF4D4D", // Rojo como el botón de ejercicios
    width: 60,
    height: 60,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
  }
});