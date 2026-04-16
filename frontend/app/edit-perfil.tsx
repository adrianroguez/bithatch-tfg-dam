import { useRouter } from "expo-router";
import React, { useContext, useState } from "react";
import { 
  Text, 
  View, 
  StyleSheet, 
  Pressable, 
  TextInput,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  TouchableOpacity
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import BrickWallPanel from "../components/BrickWallPanel";
import { Colors, Typography, Spacing, Shadows } from "../constants/theme";

export default function EditProfile() {
  const router = useRouter();

  // Estados para los inputs
  const [name, setName] = useState("USUARIO");
  const [email, setEmail] = useState("USUARIO@EMAIL.COM");
  const [password, setPassword] = useState("USER123");

  const handlePressIn = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
  };

  const handleSave = () => {
    handlePressIn();
    console.log("Datos guardados:", { name, email, password });
    router.back();
  };

  return (
    <View style={styles.root}>
      <StatusBar barStyle="dark-content" />
      
      {/* HEADER PANEL */}
      <BrickWallPanel rows={6} style={styles.headerPanel}>
        <View style={styles.headerContent}>
          <TouchableOpacity 
            onPressIn={handlePressIn} 
            onPress={() => router.back()}
            style={styles.headerBtn}
          >
            <Ionicons name="close-outline" size={24} color={Colors.lcd.text} />
          </TouchableOpacity>
          
          <Text style={styles.headerTitle}>EDITAR</Text>
          
          < View style={{ width: 44 }} />
        </View>
      </BrickWallPanel>

      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        {/* LCD SCREEN */}
        <View style={styles.screenWrapper}>
          <View style={styles.screenBezel}>
            <ScrollView contentContainerStyle={styles.lcdContent} showsVerticalScrollIndicator={false}>
              
              <View style={styles.avatarSection}>
                <View style={styles.avatarCircle}>
                   <Ionicons name="person" size={40} color={Colors.lcd.text} opacity={0.2} />
                   <TouchableOpacity style={styles.editIconBadge} onPressIn={handlePressIn}>
                      <Ionicons name="camera" size={14} color="white" />
                   </TouchableOpacity>
                </View>
                <Image 
                  source={require("../assets/egg_c.png")} 
                  style={styles.creatureSmall} 
                />
              </View>

              <View style={styles.form}>
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>NOMBRE</Text>
                  <TextInput 
                    style={styles.input}
                    value={name}
                    onChangeText={setName}
                    placeholderTextColor="rgba(0,0,0,0.3)"
                  />
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.label}>EMAIL</Text>
                  <TextInput 
                    style={styles.input}
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    placeholderTextColor="rgba(0,0,0,0.3)"
                  />
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.label}>PASSWORD</Text>
                  <TextInput 
                    style={styles.input}
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                    placeholderTextColor="rgba(0,0,0,0.3)"
                  />
                </View>
              </View>

              <Pressable 
                style={({pressed}) => [styles.saveButton, pressed && styles.btnPressed]} 
                onPressIn={handlePressIn}
                onPress={handleSave}
              >
                <Text style={styles.saveButtonText}>GUARDAR</Text>
              </Pressable>
              
            </ScrollView>
          </View>
        </View>
      </KeyboardAvoidingView>
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
  headerContent: {
    ...StyleSheet.absoluteFillObject,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: Spacing.md,
    paddingTop: 30, // Account for notch
  },
  headerTitle: {
    fontFamily: Typography.retro,
    fontSize: 14,
    color: Colors.lcd.text,
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
  },
  lcdContent: {
    padding: Spacing.md,
    alignItems: "center",
  },
  avatarSection: {
    alignItems: "center",
    marginVertical: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20
  },
  avatarCircle: {
    width: 80,
    height: 80,
    borderRadius: 4,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: Colors.lcd.text,
  },
  editIconBadge: {
    position: 'absolute',
    bottom: -5,
    right: -5,
    backgroundColor: Colors.buttons.blue,
    padding: 6,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: Colors.lcd.text,
  },
  creatureSmall: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
    opacity: 0.8
  },
  form: {
    width: "100%",
    marginTop: 10,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontFamily: Typography.retro,
    fontSize: 8,
    color: Colors.lcd.primary,
    marginBottom: 10,
  },
  input: {
    borderWidth: 2,
    borderColor: Colors.lcd.text,
    borderRadius: 4,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontFamily: Typography.retro,
    fontSize: 8,
    backgroundColor: "rgba(0,0,0,0.03)",
    color: Colors.lcd.text,
  },
  btnPressed: {
    transform: [{ translateY: Shadows.button.pressedTransform }],
    borderBottomWidth: 2,
    marginTop: Shadows.button.pressedTransform,
  },
  saveButton: {
    backgroundColor: Colors.buttons.green,
    width: "100%",
    paddingVertical: 14,
    borderRadius: 8,
    borderWidth: 2,
    borderBottomWidth: 5,
    borderColor: Colors.lcd.text,
    alignItems: "center",
    marginTop: 10,
    marginBottom: 30,
  },
  saveButtonText: {
    fontFamily: Typography.retro,
    color: "white",
    fontSize: 10,
  },
});