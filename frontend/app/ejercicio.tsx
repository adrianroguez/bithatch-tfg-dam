import React from "react";
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  Image,
  Pressable,
  StatusBar
} from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Navbar } from "../components/Navbar";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as Haptics from "expo-haptics";
import BrickWallPanel from "../components/BrickWallPanel";
import { Colors, Typography, Spacing, Shadows } from "../constants/theme";

const EXERCISES_DATA = [
  { id: "1", name: "Sentadilla", metric: "3x12", icon: "weight-lifter" },
  { id: "2", name: "Mancuerna", metric: "4x10", icon: "dumbbell" },
  { id: "3", name: "Flexiones", metric: "3x15", icon: "arm-flex" },
  { id: "4", name: "Caminar", metric: "30 min", icon: "walk" },
  { id: "5", name: "Correr", metric: "5.00 km", icon: "run" },
];

export default function ExercisesScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const handlePressIn = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
  };

  const handleExercisePress = (item: typeof EXERCISES_DATA[0]) => {
    handlePressIn();
    router.push({
      pathname: "/ejercicio-detalle",
      params: { id: item.id, name: item.name, metric: item.metric }
    });
  };

  const renderItem = ({ item }: { item: typeof EXERCISES_DATA[0] }) => (
    <Pressable 
      style={({ pressed }) => [
        styles.tableRow, 
        pressed && { backgroundColor: 'rgba(0,0,0,0.05)' }
      ]} 
      onPress={() => handleExercisePress(item)}
    >
      <View style={styles.iconColumn}>
        <MaterialCommunityIcons name={item.icon as any} size={24} color={Colors.lcd.text} />
      </View>
      <View style={styles.nameColumn}>
        <Text style={styles.exerciseName}>{item.name}</Text>
      </View>
      <View style={styles.metricColumn}>
        <Text style={styles.exerciseMetric}>{item.metric}</Text>
      </View>
    </Pressable>
  );

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
            <Text style={styles.titleText}>BIT<Text style={{color: Colors.buttons.red}}>HATCH</Text></Text>
          </View>

          <View style={{ width: 68 }} />
        </View>
      </BrickWallPanel>

      {/* LCD SCREEN */}
      <View style={styles.screenWrapper}>
        <View style={styles.screenBezel}>
          <View style={styles.lcdContent}>
            <View style={styles.tableHeader}>
              <Text style={[styles.headerLabel, { flex: 1 }]}>ICO</Text>
              <Text style={[styles.headerLabel, { flex: 2 }]}>NOMB</Text>
              <Text style={[styles.headerLabel, { flex: 1.5 }]}>META</Text>
            </View>

            <FlatList
              data={EXERCISES_DATA}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
              contentContainerStyle={styles.listContent}
              showsVerticalScrollIndicator={false}
            />
            
            <Image 
              source={require("../assets/egg_c.png")} 
              style={styles.sideCreature} 
            />
          </View>
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
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  iconBtnLabel: {
    fontFamily: Typography.retro,
    color: Colors.buttons.text,
    fontSize: 6,
    marginTop: 4,
  },
  titleRow: {
    paddingVertical: 4,
    paddingHorizontal: 12,
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
    flex: 1,
    backgroundColor: Colors.lcd.background,
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "rgba(0,0,0,0.05)",
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderBottomWidth: 2,
    borderBottomColor: "rgba(0,0,0,0.1)",
  },
  headerLabel: {
    fontFamily: Typography.retro,
    color: Colors.lcd.text,
    fontSize: 8,
  },
  listContent: {
    paddingBottom: 20,
  },
  tableRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0,0,0,0.05)",
  },
  iconColumn: {
    flex: 1,
  },
  nameColumn: {
    flex: 2,
  },
  metricColumn: {
    flex: 1.5,
  },
  exerciseName: {
    fontFamily: Typography.retro,
    fontSize: 8,
    color: Colors.lcd.text,
  },
  exerciseMetric: {
    fontFamily: Typography.retro,
    fontSize: 8,
    color: Colors.buttons.red,
  },
  sideCreature: {
    position: 'absolute',
    right: -20,
    bottom: -10,
    width: 80,
    height: 80,
    opacity: 0.05, 
    resizeMode: 'contain',
  },
});
