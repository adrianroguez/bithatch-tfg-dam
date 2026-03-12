import React, { useState, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Image
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { AuthContext } from "../context/AuthContext";

// Datos de ejemplo para la conversación
const INITIAL_MESSAGES = [
  { id: "1", text: "Hola, ¿cómo estás hoy?", sender: "creature" },
  { id: "2", text: "¡Listo para entrenar!", sender: "user" },
  { id: "3", text: "¿Qué rutina haremos?", sender: "user" },
  { id: "4", text: "Hoy toca pierna. ¡Vamos!", sender: "creature" },
];

export default function ChatScreen() {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState(INITIAL_MESSAGES);

  const sendMessage = () => {
    if (message.trim().length === 0) return;
    
    const newMessage = {
      id: Date.now().toString(),
      text: message,
      sender: "user",
    };
    
    setChatHistory([...chatHistory, newMessage]);
    setMessage("");
  };

  const renderMessage = ({ item }: { item: typeof INITIAL_MESSAGES[0] }) => {
    const isUser = item.sender === "user";
    return (
      <View style={[styles.messageWrapper, isUser ? styles.userWrapper : styles.creatureWrapper]}>
        <View style={[styles.bubble, isUser ? styles.userBubble : styles.creatureBubble]}>
          <Text style={[styles.messageText, isUser ? styles.userText : styles.creatureText]}>
            {item.text}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header del Chat */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle}>Conversa con tu Criatura</Text>
          <Ionicons name="people-outline" size={20} color="#666" />
        </View>
        <View style={{ width: 24 }} />
      </View>

      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
        keyboardVerticalOffset={90}
      >
        <FlatList
          data={chatHistory}
          renderItem={renderMessage}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.chatList}
        />

        {/* Silueta de la criatura hablando */}
        <View style={styles.creatureAvatarContainer}>
           <Image 
             source={require("../assets/egg_c.png")} 
             style={styles.creatureChatImage} 
           />
           <View style={styles.typingIndicator}>
             <Text style={styles.typingText}>La Criatura está escuchando...</Text>
           </View>
        </View>

        {/* Input de Texto */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Escribe aquí..."
            value={message}
            onChangeText={setMessage}
            multiline
          />
          <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
            <Ionicons name="send" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FA",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    paddingVertical: 12,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#EEE",
  },
  headerTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  chatList: {
    padding: 15,
    paddingBottom: 20,
  },
  messageWrapper: {
    marginVertical: 5,
    flexDirection: "row",
    width: "100%",
  },
  userWrapper: {
    justifyContent: "flex-end",
  },
  creatureWrapper: {
    justifyContent: "flex-start",
  },
  bubble: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 18,
    maxWidth: "80%",
  },
  userBubble: {
    backgroundColor: "#4D94FF", 
    borderBottomRightRadius: 2,
  },
  creatureBubble: {
    backgroundColor: "#FF6B6B",
    borderBottomLeftRadius: 2,
  },
  messageText: {
    fontSize: 15,
  },
  userText: {
    color: "white",
  },
  creatureText: {
    color: "white",
  },
  creatureAvatarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: 'rgba(255,255,255,0.7)'
  },
  creatureChatImage: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
  },
  typingIndicator: {
    marginLeft: 10,
    backgroundColor: '#EEE',
    padding: 8,
    borderRadius: 10,
  },
  typingText: {
    fontSize: 12,
    color: '#888',
    fontStyle: 'italic'
  },
  inputContainer: {
    flexDirection: "row",
    padding: 15,
    backgroundColor: "white",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#EEE",
  },
  input: {
    flex: 1,
    backgroundColor: "#F0F0F0",
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginRight: 10,
    maxHeight: 100,
  },
  sendButton: {
    backgroundColor: "#4D94FF",
    width: 45,
    height: 45,
    borderRadius: 22.5,
    justifyContent: "center",
    alignItems: "center",
  },
});