import { useRouter } from "expo-router";
import React, { useContext } from "react";
import { 
  Text, 
  View, 
  StyleSheet, 
  Pressable, 
  Image,
  ScrollView 
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { AuthContext } from "../context/AuthContext";
import { useCreature } from "../context/CreatureContext";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as Haptics from "expo-haptics";
import BrickWallPanel from "../components/BrickWallPanel";
import { Navbar } from "../components/Navbar";

export default function Profile() {
  const { logout } = useContext(AuthContext);
  const { creature } = useCreature();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const handlePressIn = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
  };

  const stats = [
    { label: "RENDIMIENTO", value: 0.8, color: "#388E3C" },
    { label: "PROGRESO", value: 0.4, color: "#1976D2" },
  ];

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
            <Text style={styles.titleBit}>Perf</Text>
            <Text style={styles.titleHatch}>il</Text>
          </View>

          <Pressable
            style={({ pressed }) => [
              styles.iconBtn, 
              {backgroundColor: '#FFA000', borderColor: '#FF6F00'}, 
              pressed && styles.btnPressed
            ]}
            onPressIn={handlePressIn}
            onPress={() => router.replace("/edit-perfil")}
          >
            <View style={styles.iconBtnInner}>
              <Ionicons name="create-outline" size={22} color="#fff" />
              <Text style={styles.iconBtnLabel}>Editar</Text>
            </View>
          </Pressable>
        </View>
      </BrickWallPanel>

      {/* ── PANTALLA CENTRAL (LCD Hundida) ── */}
      <View style={styles.screen}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.card}>
            <View style={styles.row}>
              <View style={styles.avatarPlaceholder}>
                <Ionicons name="person" size={50} color="#78909C" />
              </View>
              <View style={styles.userInfo}>
                <Text style={styles.userName}>Entrenador</Text>
                <Text style={styles.userSubText}>ID: #001234</Text>
              </View>
            </View>

            <View style={styles.creatureSection}>
              <Image 
                source={require(`../assets/egg_b.png`)} 
                style={styles.creatureSmallImage} 
              />
              <Text style={styles.creatureTypeText}>Compañero: {creature?.name}</Text>
            </View>

            <View style={styles.divider} />

            <View style={styles.statsContainer}>
              <Text style={styles.statsTitle}>Estadísticas</Text>
              {stats.map((stat, index) => (
                <View key={index} style={styles.statRow}>
                  <Text style={styles.statLabel}>{stat.label}</Text>
                  <View style={styles.barBackground}>
                    <View style={[styles.barFill, { width: `${stat.value * 100}%`, backgroundColor: stat.color }]} />
                  </View>
                </View>
              ))}
            </View>

            <Pressable 
              style={({pressed}) => [styles.logoutButton, pressed && styles.btnPressed]} 
              onPressIn={handlePressIn}
              onPress={() => {void logout(), router.replace("/")}}
            >
              <Text style={styles.logoutText}>Cerrar Sesión</Text>
            </Pressable>

          </View>
        </ScrollView>
      </View>
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
    backgroundColor: "#388E3C", 
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
    color: "#388E3C",
    fontFamily: "PressStart2P",
  },
  screen: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: "#E8F5E9",
    borderWidth: 8,
    borderTopColor: "#78909C",
    borderLeftColor: "#90A4AE",
    borderRightColor: "#CFD8DC",
    borderBottomColor: "#FFFFFF",
  },
  scrollContent: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    borderRadius: 15,
    padding: 20,
    borderWidth: 3,
    borderColor: "#A5D6A7",
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
    backgroundColor: "#CFD8DC",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: "#90A4AE",
  },
  userInfo: {
    marginLeft: 15,
  },
  userName: {
    fontSize: 14,
    color: "#333",
    fontFamily: "PressStart2P",
    marginBottom: 5,
  },
  userSubText: {
    fontSize: 10,
    color: "#555",
    fontFamily: "PressStart2P",
  },
  creatureSection: {
    alignItems: "center",
    marginVertical: 15,
  },
  creatureSmallImage: {
    width: 120,
    height: 120,
    resizeMode: "contain",
  },
  creatureTypeText: {
    marginTop: 5,
    fontSize: 12,
    color: "#2E7D32",
    fontFamily: "PressStart2P",
  },
  divider: {
    height: 3,
    backgroundColor: "#A5D6A7",
    marginVertical: 15,
  },
  statsContainer: {
    marginTop: 10,
  },
  statsTitle: {
    fontSize: 14,
    marginBottom: 15,
    color: "#444",
    fontFamily: "PressStart2P",
    textAlign: "center",
  },
  statRow: {
    marginBottom: 15,
  },
  statLabel: {
    fontSize: 10,
    color: "#333",
    marginBottom: 8,
    fontFamily: "PressStart2P",
  },
  barBackground: {
    height: 14,
    backgroundColor: "#CFD8DC",
    borderWidth: 2,
    borderColor: "#90A4AE",
    borderRadius: 5,
    overflow: "hidden",
  },
  barFill: {
    height: "100%",
    borderRadius: 0,
    borderRightWidth: 2,
    borderColor: "#000",
  },
  logoutButton: {
    marginTop: 30,
    backgroundColor: "#D32F2F",
    borderWidth: 2,
    borderBottomWidth: 5,
    borderColor: "#B71C1C",
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: "center",
  },
  logoutText: {
    color: "#fff",
    fontSize: 12,
    fontFamily: "PressStart2P",
  },
});