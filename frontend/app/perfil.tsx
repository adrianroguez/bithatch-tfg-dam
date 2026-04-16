import { useRouter } from "expo-router";
import React, { useContext } from "react";
import { 
  Text, 
  View, 
  StyleSheet, 
  Pressable, 
  Image,
  ScrollView,
  StatusBar
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { AuthContext } from "../context/AuthContext";
import { useCreature } from "../context/CreatureContext";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import BrickWallPanel from "../components/BrickWallPanel";
import { Navbar } from "../components/Navbar";
import { Colors, Typography, Spacing, Shadows } from "../constants/theme";

export default function Profile() {
  const { logout } = useContext(AuthContext);
  const { creature } = useCreature();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const handlePressIn = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
  };

  const stats = [
    { label: "RENDIMIENTO", value: 0.8, color: Colors.lcd.primary },
    { label: "PROGRESO", value: 0.4, color: Colors.buttons.blue },
  ];

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
            <Text style={styles.titleText}>PERFIL</Text>
          </View>

          <Pressable
            style={({ pressed }) => [
              styles.iconBtn, 
              { backgroundColor: Colors.buttons.yellow }, 
              pressed && styles.btnPressed
            ]}
            onPressIn={handlePressIn}
            onPress={() => router.push("/edit-perfil" as any)}
          >
            <View style={styles.iconBtnInner}>
              <Ionicons name="create-outline" size={20} color={Colors.lcd.text} />
              <Text style={[styles.iconBtnLabel, {color: Colors.lcd.text}]}>EDIT</Text>
            </View>
          </Pressable>
        </View>
      </BrickWallPanel>

      {/* LCD SCREEN */}
      <View style={styles.screenWrapper}>
        <View style={styles.screenBezel}>
          <ScrollView contentContainerStyle={styles.lcdContent} showsVerticalScrollIndicator={false}>
            <View style={styles.card}>
              <View style={styles.profileHeader}>
                <View style={styles.avatarPlaceholder}>
                  <Ionicons name="person" size={40} color={Colors.lcd.text} opacity={0.3} />
                </View>
                <View style={styles.userInfo}>
                  <Text style={styles.userName}>USUARIO</Text>
                  <Text style={styles.userSubText}>LVL. 12</Text>
                </View>
              </View>

              <View style={styles.creatureSection}>
                <Image 
                  source={require("../assets/egg_b.png")} 
                  style={styles.creatureSmallImage} 
                />
                <View style={styles.nameBadge}>
                   <Text style={styles.creatureName}>{creature?.name?.toUpperCase() || "EGG"}</Text>
                </View>
              </View>

              <View style={styles.statsContainer}>
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
                <Text style={styles.logoutText}>LOGOUT</Text>
              </Pressable>
            </View>
          </ScrollView>
        </View>
      </View>

      <Navbar />
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
    padding: Spacing.md,
  },
  card: {
    flex: 1,
  },
  profileHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    padding: 12,
    backgroundColor: "rgba(0,0,0,0.03)",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.05)",
  },
  avatarPlaceholder: {
    width: 60,
    height: 60,
    borderRadius: 4,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: Colors.lcd.text,
  },
  userInfo: {
    marginLeft: 16,
  },
  userName: {
    fontFamily: Typography.retro,
    fontSize: 10,
    color: Colors.lcd.text,
    marginBottom: 6,
  },
  userSubText: {
    fontFamily: Typography.retro,
    fontSize: 8,
    color: "gray",
  },
  creatureSection: {
    alignItems: "center",
    marginVertical: 10,
  },
  creatureSmallImage: {
    width: 140,
    height: 140,
    resizeMode: "contain",
  },
  nameBadge: {
    marginTop: 10,
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: Colors.lcd.primary,
    borderRadius: 4,
  },
  creatureName: {
    fontFamily: Typography.retro,
    fontSize: 10,
    color: "white",
  },
  statsContainer: {
    marginVertical: 20,
  },
  statRow: {
    marginBottom: 16,
  },
  statLabel: {
    fontFamily: Typography.retro,
    fontSize: 8,
    color: Colors.lcd.text,
    marginBottom: 8,
  },
  barBackground: {
    height: 12,
    backgroundColor: "rgba(0,0,0,0.05)",
    borderWidth: 2,
    borderColor: Colors.lcd.text,
    borderRadius: 2,
    overflow: "hidden",
  },
  barFill: {
    height: "100%",
    borderRightWidth: 2,
    borderColor: "rgba(0,0,0,0.1)",
  },
  logoutButton: {
    marginTop: 10,
    backgroundColor: Colors.buttons.red,
    borderWidth: 2,
    borderBottomWidth: 5,
    borderColor: Colors.lcd.text,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  logoutText: {
    fontFamily: Typography.retro,
    color: "white",
    fontSize: 10,
  },
});