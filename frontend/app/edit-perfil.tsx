import { useRouter } from "expo-router";
import React, { useContext, useState } from "react";
import { 
  Text, 
  View, 
  StyleSheet, 
  TouchableOpacity, 
  SafeAreaView, 
  TextInput,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { AuthContext } from "../context/AuthContext";

export default function EditProfile() {
  const router = useRouter();

  // Estados para los inputs
  const [name, setName] = useState("Usuario-prueba");
  const [email, setEmail] = useState("usuario@email.com");
  const [password, setPassword] = useState("user123");

  const handleSave = () => {
    // TODO: Aquí la lógica para actualizar en el backend
    console.log("Datos guardados:", { name, email, password });
    router.back();
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        {/* Header simple */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="close-outline" size={30} color="black" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Editar Perfil</Text>
          <View style={{ width: 30 }} /> 
        </View>

        <ScrollView contentContainerStyle={styles.content}>
          {/* Foto de perfil */}
          <View style={styles.avatarSection}>
            <View style={styles.avatarCircle}>
               <Ionicons name="person" size={60} color="#CCC" />
               <TouchableOpacity style={styles.editIconBadge}>
                  <Ionicons name="camera" size={18} color="white" />
               </TouchableOpacity>
            </View>
            <Image 
              source={require("../assets/egg_c.png")} 
              style={styles.creatureSmall} 
            />
          </View>

          {/* Formulario */}
          <View style={styles.form}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Nombre de usuario</Text>
              <TextInput 
                style={styles.input}
                value={name}
                onChangeText={setName}
                placeholder="Tu nombre"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Email</Text>
              <TextInput 
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                placeholder="correo@ejemplo.com"
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Nueva Contraseña</Text>
              <TextInput 
                style={styles.input}
                value={password}
                onChangeText={setPassword}
                placeholder="********"
                secureTextEntry
              />
            </View>
          </View>

          {/* Botón Guardar */}
          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>GUARDAR</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  content: {
    paddingHorizontal: 30,
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
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#F5F5F5",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#EEE",
  },
  editIconBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#4D94FF',
    padding: 8,
    borderRadius: 20,
  },
  creatureSmall: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
    opacity: 0.6
  },
  form: {
    width: "100%",
    marginTop: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
    fontWeight: "500",
  },
  input: {
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: "#FAFAFA",
  },
  saveButton: {
    backgroundColor: "#4D94FF",
    width: "100%",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 30,
    marginBottom: 40,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
  },
  saveButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
    letterSpacing: 1,
  },
});