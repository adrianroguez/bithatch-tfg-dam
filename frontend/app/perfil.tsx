import { useRouter } from "expo-router";
import React, { useContext } from "react";
import { 
  Text, 
  View, 
  StyleSheet, 
  TouchableOpacity, 
  SafeAreaView, 
  Image,
  ScrollView 
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { AuthContext } from "../context/AuthContext";
import { useCreature } from "../context/CreatureContext";

export default function Profile() {
  const { logout } = useContext(AuthContext);
  const { creature } = useCreature();
  const router = useRouter();

  // Datos de ejemplo para las barras de progreso (basado en tu gráfico de barras)
  const stats = [
    { label: "Rendimiento Semanal", value: 0.8, color: "#4D94FF" },
    { label: "Progreso Físico", value: 0.4, color: "#4D94FF" },
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Header con flecha de regreso */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={28} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Tarjeta de entrenador</Text>
        <TouchableOpacity>
          <Ionicons name="create-outline" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Sección Superior: Foto y Datos */}
        <View style={styles.card}>
          <View style={styles.row}>
            <View style={styles.avatarPlaceholder}>
              <Ionicons name="person" size={50} color="#CCC" />
            </View>
            <View style={styles.userInfo}>
              <Text style={styles.userName}>{ "Nombre Usuario"}</Text>
              <Text style={styles.userSubText}>{ "usuario@correo.com"}</Text>
              <Text style={styles.userSubText}>ID: #001234</Text>
            </View>
          </View>

          {/* Imagen de la Criatura en el perfil (Silueta negra) */}
          <View style={styles.creatureSection}>
            <Image 
              source={require("../assets/egg_b.png")} 
              style={styles.creatureSmallImage} 
            />
            <Text style={styles.creatureTypeText}>Compañero: {creature?.name}</Text>
          </View>

          <View style={styles.divider} />

          {/* Sección de Gráficos (Barras azules del mockup) */}
          <View style={styles.statsContainer}>
            <Text style={styles.statsTitle}>Estadísticas Generales</Text>
            {stats.map((stat, index) => (
              <View key={index} style={styles.statRow}>
                <Text style={styles.statLabel}>{stat.label}</Text>
                <View style={styles.barBackground}>
                  <View style={[styles.barFill, { width: `${stat.value * 100}%`, backgroundColor: stat.color }]} />
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Botón de Cerrar Sesión Estilizado */}
        <TouchableOpacity style={styles.logoutButton} onPress={() => {void logout(), router.replace("/")}}>
          <Text style={styles.logoutText}>Cerrar Sesión</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F9F9",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#EEE",
    backgroundColor: "white",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
  },
  scrollContent: {
    padding: 20,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 15,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  avatarPlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 10,
    backgroundColor: "#F0F0F0",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#DDD",
  },
  userInfo: {
    marginLeft: 15,
  },
  userName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  userSubText: {
    fontSize: 14,
    color: "#777",
    marginTop: 2,
  },
  creatureSection: {
    alignItems: "center",
    marginVertical: 15,
  },
  creatureSmallImage: {
    width: 100,
    height: 100,
    resizeMode: "contain",
  },
  creatureTypeText: {
    marginTop: 5,
    fontSize: 14,
    color: "#555",
    fontStyle: "italic",
  },
  divider: {
    height: 1,
    backgroundColor: "#EEE",
    marginVertical: 15,
  },
  statsContainer: {
    marginTop: 10,
  },
  statsTitle: {
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#444",
  },
  statRow: {
    marginBottom: 15,
  },
  statLabel: {
    fontSize: 12,
    color: "#666",
    marginBottom: 5,
  },
  barBackground: {
    height: 10,
    backgroundColor: "#E0E0E0",
    borderRadius: 5,
    overflow: "hidden",
  },
  barFill: {
    height: "100%",
    borderRadius: 5,
  },
  logoutButton: {
    marginTop: 30,
    backgroundColor: "#FFEBEE",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  logoutText: {
    color: "#D32F2F",
    fontWeight: "600",
  },
});