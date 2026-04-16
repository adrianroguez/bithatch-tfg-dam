import { useRouter } from "expo-router";
import React, { useContext, useState } from "react";
import { 
  Text, 
  TextInput, 
  View, 
  StyleSheet, 
  Pressable, 
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  Image,
  TouchableOpacity
} from "react-native";
import * as Haptics from "expo-haptics";
import { AuthContext } from "../context/AuthContext";
import BrickWallPanel from "../components/BrickWallPanel";
import { Colors, Typography, Spacing, Shadows } from "../constants/theme";

export default function Login() {
  const { login } = useContext(AuthContext);
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handlePressIn = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
  };

  const handleLogin = async () => {
    handlePressIn();
    if (!username || !password) {
      setError("CAMPOS OBLIGATORIOS");
      return;
    }
    setError("");

    const res = await login(username, password);
    if (res.ok) {
      router.replace("/");
    } else {
      setError(res.msg?.toUpperCase() || "LOGIN FALLIDO");
    }
  };

  return (
    <View style={styles.root}>
      <StatusBar barStyle="dark-content" />
      
      {/* Background with Brick texture */}
      <BrickWallPanel rows={20} style={StyleSheet.absoluteFillObject} />
      
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <View style={styles.screenBezel}>
          <View style={styles.lcdContent}>
            
            <View style={styles.logoContainer}>
              <Text style={styles.logoText}>BIT<Text style={{color: Colors.buttons.red}}>HATCH</Text></Text>
              <Image 
                source={require("../assets/egg_a.png")} 
                style={styles.logoImage} 
              />
            </View>
 
             <View style={styles.form}>
               <View style={styles.inputGroup}>
                 <Text style={styles.label}>USUARIO</Text>
                 <TextInput
                   placeholder="USERNAME"
                   placeholderTextColor="rgba(0,0,0,0.3)"
                   value={username}
                   onChangeText={setUsername}
                   style={styles.input}
                   autoCapitalize="none"
                 />
               </View>
 
               <View style={styles.inputGroup}>
                 <Text style={styles.label}>PASSWORD</Text>
                 <TextInput
                   placeholder="********"
                   placeholderTextColor="rgba(0,0,0,0.3)"
                   value={password}
                   onChangeText={setPassword}
                   secureTextEntry
                   style={styles.input}
                 />
               </View>
 
               {error ? (
                 <View style={styles.errorBox}>
                   <Text style={styles.errorText}>{error}</Text>
                 </View>
               ) : null}
             </View>
 
             <View style={styles.buttonContainer}>
               <Pressable 
                 style={({pressed}) => [styles.primaryBtn, pressed && styles.btnPressed]} 
                 onPressIn={handlePressIn}
                 onPress={handleLogin}
               >
                 <Text style={styles.primaryBtnText}>ENTRAR</Text>
               </Pressable>
 
               <TouchableOpacity 
                 style={styles.secondaryBtn} 
                 onPressIn={handlePressIn}
                 onPress={() => router.push("/register")}
               >
                 <Text style={styles.secondaryBtnText}>¿NO TIENES CUENTA?</Text>
                 <Text style={[styles.secondaryBtnText, {color: Colors.lcd.primary, marginTop: 4}]}>REGÍSTRATE AQUÍ</Text>
               </TouchableOpacity>
             </View>
 
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
  container: {
    flex: 1,
    justifyContent: "center",
    padding: Spacing.lg,
  },
  screenBezel: {
    backgroundColor: Colors.lcd.background,
    borderRadius: 20,
    borderWidth: 10,
    borderTopColor: Colors.bezel.top,
    borderLeftColor: Colors.bezel.left,
    borderRightColor: Colors.bezel.right,
    borderBottomColor: Colors.bezel.bottom,
    overflow: "hidden",
    elevation: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
  },
  lcdContent: {
    padding: Spacing.xl,
    backgroundColor: Colors.lcd.background,
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 40,
  },
  logoText: {
    fontFamily: Typography.retro,
    fontSize: 20,
    color: Colors.lcd.text,
    marginBottom: 20,
  },
  logoImage: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  form: {
    width: "100%",
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
    paddingVertical: 12,
    fontFamily: Typography.retro,
    fontSize: 8,
    backgroundColor: "rgba(0,0,0,0.03)",
  },
  errorBox: {
    padding: 8,
    backgroundColor: "rgba(211, 47, 47, 0.1)",
    borderWidth: 1,
    borderColor: Colors.buttons.red,
    borderRadius: 4,
    marginBottom: 20,
  },
  errorText: {
    fontFamily: Typography.retro,
    fontSize: 6,
    color: Colors.buttons.red,
    textAlign: "center",
  },
  buttonContainer: {
    marginTop: 10,
  },
  primaryBtn: {
    backgroundColor: Colors.buttons.green,
    paddingVertical: 16,
    borderRadius: 8,
    borderWidth: 2,
    borderBottomWidth: 6,
    borderColor: Colors.lcd.text,
    alignItems: "center",
  },
  btnPressed: {
    transform: [{ translateY: Shadows.button.pressedTransform }],
    borderBottomWidth: 2,
    marginTop: Shadows.button.pressedTransform,
  },
  primaryBtnText: {
    fontFamily: Typography.retro,
    color: "white",
    fontSize: 12,
  },
  secondaryBtn: {
    marginTop: 30,
    alignItems: "center",
  },
  secondaryBtnText: {
    fontFamily: Typography.retro,
    fontSize: 6,
    color: "gray",
  }
});
