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
  Image,
  StatusBar
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import * as Haptics from "expo-haptics";
import { AuthContext } from "../context/AuthContext";
import BrickWallPanel from "../components/BrickWallPanel";
import { Colors, Typography, Spacing, Shadows } from "../constants/theme";

const INITIAL_MESSAGES = [
  { id: "1", text: "HOLA, ¿CÓMO ESTÁS HOY?", sender: "creature" },
  { id: "2", text: "¡LISTO PARA ENTRENAR!", sender: "user" },
  { id: "3", text: "¿QUÉ RUTINA HAREMOS?", sender: "user" },
  { id: "4", text: "HOY TOCA PIERNA. ¡VAMOS!", sender: "creature" },
];

export default function ChatScreen() {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState(INITIAL_MESSAGES);

  const handlePressIn = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
  };

  const sendMessage = () => {
    if (message.trim().length === 0) return;
    handlePressIn();
    
    const newMessage = {
      id: Date.now().toString(),
      text: message.toUpperCase(),
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
    <View style={styles.root}>
      <StatusBar barStyle="dark-content" />
      
      {/* HEADER PANEL */}
      <BrickWallPanel rows={4} style={styles.headerPanel}>
        <View style={styles.headerContent}>
          <TouchableOpacity 
            onPressIn={handlePressIn} 
            onPress={() => router.back()}
            style={styles.headerBtn}
          >
            <Ionicons name="arrow-back" size={20} color={Colors.lcd.text} />
          </TouchableOpacity>
          
          <Text style={styles.headerTitle}>CHAT</Text>
          
          <View style={{ width: 44 }} />
        </View>
      </BrickWallPanel>

      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
      >
        {/* LCD SCREEN */}
        <View style={styles.screenWrapper}>
          <View style={styles.screenBezel}>
            <View style={styles.lcdContent}>
              <FlatList
                data={chatHistory}
                renderItem={renderMessage}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.chatList}
                showsVerticalScrollIndicator={false}
              />

              {/* Status Indicator */}
              <View style={styles.creatureAvatarContainer}>
                 <Image 
                   source={require("../assets/egg_c.png")} 
                   style={styles.creatureChatImage} 
                 />
                 <View style={styles.typingIndicator}>
                   <Text style={styles.typingText}>ESCUCHANDO...</Text>
                 </View>
              </View>
            </View>
          </View>
        </View>

        {/* INPUT AREA: Brick background */}
        <BrickWallPanel rows={8} style={styles.inputPanel}>
          <View style={styles.inputContent}>
            <TextInput
              style={styles.input}
              placeholder="MENSAJE..."
              placeholderTextColor="rgba(0,0,0,0.3)"
              value={message}
              onChangeText={setMessage}
              multiline
            />
            <TouchableOpacity 
              style={styles.sendButton} 
              onPressIn={handlePressIn}
              onPress={sendMessage}
            >
              <Ionicons name="send" size={20} color="white" />
            </TouchableOpacity>
          </View>
        </BrickWallPanel>
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
    flex: 1,
    backgroundColor: Colors.lcd.background,
  },
  chatList: {
    padding: 15,
  },
  messageWrapper: {
    marginVertical: 4,
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
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 4,
    borderWidth: 2,
    maxWidth: "85%",
  },
  userBubble: {
    backgroundColor: Colors.buttons.blue, 
    borderColor: "rgba(0,0,0,0.1)",
    borderBottomRightRadius: 0,
  },
  creatureBubble: {
    backgroundColor: "rgba(0,0,0,0.05)",
    borderColor: "rgba(0,0,0,0.1)",
    borderBottomLeftRadius: 0,
  },
  messageText: {
    fontFamily: Typography.retro,
    fontSize: 8,
    lineHeight: 14,
  },
  userText: {
    color: "white",
  },
  creatureText: {
    color: Colors.lcd.text,
  },
  creatureAvatarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderTopWidth: 1,
    borderColor: "rgba(0,0,0,0.05)",
    backgroundColor: "rgba(255,255,255,0.5)",
  },
  creatureChatImage: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
    opacity: 0.8,
  },
  typingIndicator: {
    marginLeft: 12,
  },
  typingText: {
    fontFamily: Typography.retro,
    fontSize: 6,
    color: Colors.lcd.text,
    opacity: 0.5,
  },
  inputPanel: {
    borderTopWidth: 3,
    borderTopColor: "rgba(0,0,0,0.1)",
  },
  inputContent: {
    ...StyleSheet.absoluteFillObject,
    flexDirection: "row",
    padding: 12,
    alignItems: "center",
  },
  input: {
    flex: 1,
    backgroundColor: "white",
    borderRadius: 4,
    borderWidth: 2,
    borderColor: Colors.lcd.text,
    fontFamily: Typography.retro,
    fontSize: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: 10,
    maxHeight: 60,
  },
  sendButton: {
    backgroundColor: Colors.buttons.green,
    width: 44,
    height: 44,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: Colors.lcd.text,
    borderBottomWidth: 4,
    justifyContent: "center",
    alignItems: "center",
  },
});