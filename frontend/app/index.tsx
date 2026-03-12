import { useRouter } from "expo-router";
import React, { useContext, useEffect } from "react";
import { 
  Text, 
  View, 
  ActivityIndicator, 
  Image, 
  StyleSheet, 
  TouchableOpacity, 
  SafeAreaView 
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { AuthContext } from "../context/AuthContext";
import { useCreature } from "../context/CreatureContext";

/**
 * Mapeo de tipos de huevo/criatura a sus imágenes.
 */
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

  if (authLoading || creatureLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (!token || !creature) return null;

  // Intentamos obtener la imagen de la criatura, si no, usamos una por defecto
  const creatureImage = EGG_IMAGES[creature.eggType];

  return (
    <SafeAreaView style={styles.container}>
      
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => {/* Abrir Menú */}}>
          <Ionicons name="grid-outline" size={28} color="black" />
        </TouchableOpacity>
        
        <TouchableOpacity onPress={() => router.push("/perfil" as any)}>
          <View style={styles.profileCircle}>
            <Ionicons name="person-outline" size={24} color="#666" />
          </View>
        </TouchableOpacity>
      </View>

      {/* ÁREA CENTRAL: Avatar y Burbuja "Hablar" */}
      <View style={styles.mainContent}>
        <TouchableOpacity style={styles.talkBubble}>
          <Text style={styles.talkText}>Hablar</Text>
        </TouchableOpacity>

        <View style={styles.avatarWrapper}>
          <Image source={creatureImage} style={styles.avatarImage} />
          <Text style={styles.creatureName}>{creature.name || "Criatura / Huevo"}</Text>
        </View>
      </View>

      {/* FOOTER */}
      <View style={styles.footer}>
        <TouchableOpacity 
          style={[styles.navButton, { borderColor: "#FF4D4D" }]} 
          onPress={() => router.push("/exercises" as any)}
        >
          <Text style={styles.navButtonText}>Ejercicios</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.navButton, { borderColor: "#4D94FF" }]}
          onPress={() => router.push("/stats" as any)}
        >
          <Text style={styles.navButtonText}>Criatura</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.navButton, { borderColor: "#4CAF50" }]}
          onPress={() => router.push("/social" as any)}
        >
          <Text style={styles.navButtonText}>Batalla</Text>
        </TouchableOpacity>
      </View>

      {/* PROVICIONAL Botón de Logout */}
      <TouchableOpacity style={styles.logoutBtn} onPress={() => void logout()}>
        <Text style={{color: 'gray', fontSize: 10}}>Cerrar Sesión</Text>
      </TouchableOpacity>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 15,
  },
  profileCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    justifyContent: "center",
    alignItems: "center",
  },
  mainContent: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  talkBubble: {
    borderWidth: 1.5,
    borderColor: "#FFA500",
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 5,
    marginBottom: 30,
  },
  talkText: {
    fontSize: 16,
    fontWeight: "500",
  },
  avatarWrapper: {
    alignItems: "center",
  },
  avatarImage: {
    width: 180,
    height: 180,
    resizeMode: "contain",
  },
  creatureName: {
    marginTop: 20,
    fontSize: 18,
    color: "#333",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingBottom: 40,
    paddingHorizontal: 10,
  },
  navButton: {
    borderWidth: 2,
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 15,
    minWidth: 100,
    alignItems: "center",
    backgroundColor: "white",
  },
  navButtonText: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#333",
  },
  logoutBtn: {
    position: 'absolute',
    bottom: 5,
    alignSelf: 'center'
  }
});