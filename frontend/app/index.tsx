import { useRouter } from "expo-router";
import React, { useContext, useEffect } from "react";
import { 
  Text, 
  View, 
  ActivityIndicator, 
  Image, 
  StyleSheet, 
  TouchableOpacity, 
  SafeAreaView,
  StatusBar
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { AuthContext } from "../context/AuthContext";
import { useCreature } from "../context/CreatureContext";
import { Navbar } from "../components/Navbar";
import BrickWallPanel from "../components/BrickWallPanel";
import { Colors, Typography, Spacing, Shadows } from "../constants/theme";

const EGG_IMAGES: Record<string, any> = {
  EGG_A: require("../assets/egg_a.png"),
  EGG_B: require("../assets/egg_b.png"),
  EGG_C: require("../assets/egg_c.png"),
};

export default function Home() {
  const { token, logout, loading: authLoading } = useContext(AuthContext);
  const { creature, loading: creatureLoading } = useCreature();
  const router = useRouter();

  useEffect(() => {
    if (authLoading || creatureLoading) return;
    if (!token) {
      router.replace("/login");
    } else if (!creature) {
      router.replace("/select-egg" as any);
    }
  }, [token, creature, authLoading, creatureLoading, router]);

  const handlePressIn = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
  };

  if (authLoading || creatureLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.lcd.primary} />
      </View>
    );
  }

  if (!token || !creature) return null;

  const creatureImage = EGG_IMAGES[creature.eggType];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* HEADER PANEL: Brick Texture */}
      <BrickWallPanel rows={4} style={styles.headerPanel}>
        <View style={styles.headerContent}>
          <TouchableOpacity onPressIn={handlePressIn} style={styles.headerBtn}>
            <Ionicons name="grid-outline" size={24} color={Colors.lcd.text} />
          </TouchableOpacity>
          
          <Text style={styles.headerTitle}>BITHATCH</Text>
          
          <TouchableOpacity 
            onPressIn={handlePressIn} 
            onPress={() => router.push("/perfil" as any)}
            style={styles.headerBtn}
          >
            <Ionicons name="person-outline" size={24} color={Colors.lcd.text} />
          </TouchableOpacity>
        </View>
      </BrickWallPanel>

      {/* CENTRAL AREA: LCD Screen with Bezel */}
      <View style={styles.screenWrapper}>
        <View style={styles.screenBezel}>
          <View style={styles.lcdScreen}>
            {/* Talk Bubble (Floating) */}
            <TouchableOpacity 
              style={styles.talkBubble} 
              onPressIn={handlePressIn}
              onPress={() => router.push("/chat")}
            >
              <Text style={styles.talkText}>Chat</Text>
            </TouchableOpacity>

            <View style={styles.avatarWrapper}>
              <Image source={creatureImage} style={styles.avatarImage} />
              <View style={styles.nameContainer}>
                <Text style={styles.creatureName}>{creature.name?.toUpperCase() || "EGG"}</Text>
              </View>
            </View>
          </View>
        </View>
      </View>

      {/* FOOTER: Already handled by Navbar (BrickWallPanel inside) */}
      <Navbar />

      {/* Logout hidden small at bottom */}
      <TouchableOpacity style={styles.logoutBtn} onPress={() => void logout()}>
        <Text style={styles.logoutText}>LOGOUT</Text>
      </TouchableOpacity>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.structure.mortar,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.lcd.background,
  },
  headerPanel: {
    borderBottomWidth: 3,
    borderBottomColor: "rgba(0,0,0,0.1)",
  },
  headerContent: {
    ...StyleSheet.absoluteFillObject,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: Spacing.md,
  },
  headerTitle: {
    fontFamily: Typography.retro,
    fontSize: 14,
    color: Colors.lcd.text,
    letterSpacing: 1,
  },
  headerBtn: {
    width: 44,
    height: 44,
    backgroundColor: "#fff",
    borderRadius: 8,
    borderWidth: 2,
    borderColor: Colors.lcd.text,
    borderBottomWidth: 4,
    justifyContent: "center",
    alignItems: "center",
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
    elevation: 10,
  },
  lcdScreen: {
    flex: 1,
    backgroundColor: Colors.lcd.background,
    alignItems: "center",
    justifyContent: "center",
    padding: Spacing.md,
  },
  talkBubble: {
    position: "absolute",
    top: 20,
    right: 20,
    backgroundColor: Colors.lcd.accent,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: Colors.lcd.text,
    borderBottomWidth: 4,
  },
  talkText: {
    fontFamily: Typography.retro,
    fontSize: 8,
    color: Colors.lcd.text,
  },
  avatarWrapper: {
    alignItems: "center",
  },
  avatarImage: {
    width: 200,
    height: 200,
    resizeMode: "contain",
  },
  nameContainer: {
    marginTop: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: "rgba(0,0,0,0.05)",
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.1)",
  },
  creatureName: {
    fontFamily: Typography.retro,
    fontSize: 12,
    color: Colors.lcd.text,
    textAlign: "center",
  },
  logoutBtn: {
    position: 'absolute',
    bottom: 5,
    alignSelf: 'center',
    opacity: 0.5,
  },
  logoutText: {
    fontFamily: Typography.retro,
    fontSize: 6,
    color: "gray",
  }
});