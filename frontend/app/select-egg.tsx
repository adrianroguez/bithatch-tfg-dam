import { useRouter } from "expo-router";
import React, { useContext, useEffect, useRef, useState } from "react";
import {
    Animated,
    Image,
    Modal,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    StatusBar,
} from "react-native";
import * as Haptics from "expo-haptics";
import { useCreature } from "../context/CreatureContext";
import { AuthContext } from "../context/AuthContext";
import BrickWallPanel from "../components/BrickWallPanel";
import { Colors, Typography, Spacing, Shadows } from "../constants/theme";

enum EggType {
    EGG_A = "EGG_A",
    EGG_B = "EGG_B",
    EGG_C = "EGG_C",
}

const EGG_OPTIONS = [
    {
        type: EggType.EGG_A,
        name: "HUEVO A",
        description: "UN EXTRAÑO HUEVO ROJIZO.",
        image: require("../assets/egg_a.png"),
    },
    {
        type: EggType.EGG_B,
        name: "HUEVO B",
        description: "HUEVO CON MANCHAS AZULES.",
        image: require("../assets/egg_b.png"),
    },
    {
        type: EggType.EGG_C,
        name: "HUEVO C",
        description: "HUEVO DE COLOR VERDE VIVO.",
        image: require("../assets/egg_c.png"),
    },
];

export default function SelectEgg() {
    const router = useRouter();
    const { token } = useContext(AuthContext);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [showModal, setShowModal] = useState(false);

    const floatAnimation = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        if (!token) {
            router.replace("/login");
        }
    }, [token]);

    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(floatAnimation, {
                    toValue: -15,
                    duration: 1500,
                    useNativeDriver: true,
                }),
                Animated.timing(floatAnimation, {
                    toValue: 0,
                    duration: 1500,
                    useNativeDriver: true,
                }),
            ])
        ).start();
    }, []);

    const handlePressIn = () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
    };

    const currentEgg = EGG_OPTIONS[currentIndex];

    const nextEgg = () => {
        handlePressIn();
        setCurrentIndex((prev) => (prev + 1) % EGG_OPTIONS.length);
    };

    const prevEgg = () => {
        handlePressIn();
        setCurrentIndex((prev) =>
            prev === 0 ? EGG_OPTIONS.length - 1 : prev - 1
        );
    };

    const confirmSelection = () => {
        handlePressIn();
        setShowModal(false);
        router.push({
            pathname: "/nacimiento",
            params: { eggType: currentEgg.type }
        });
    };

    return (
        <View style={styles.root}>
            <StatusBar barStyle="dark-content" />
            
            {/* HEADER PANEL */}
            <BrickWallPanel rows={6} style={styles.headerPanel}>
                <View style={styles.headerContent}>
                    <Text style={styles.headerTitle}>ESCUCHA EL RITMO...</Text>
                </View>
            </BrickWallPanel>

            <View style={styles.screenWrapper}>
                <View style={styles.screenBezel}>
                    <View style={styles.lcdContent}>
                        <Text style={styles.title}>ELIGE TU HUEVO</Text>

                        <View style={styles.sliderContainer}>
                            <TouchableOpacity 
                                onPressIn={handlePressIn} 
                                onPress={prevEgg} 
                                style={styles.navButton}
                            >
                                <Text style={styles.navButtonText}>{"<"}</Text>
                            </TouchableOpacity>

                            <View style={styles.eggImageWrapper}>
                                <Animated.Image
                                    source={currentEgg.image}
                                    style={[
                                        styles.eggImage,
                                        {
                                            transform: [{ translateY: floatAnimation }]
                                        }
                                    ]}
                                />
                            </View>

                            <TouchableOpacity 
                                onPressIn={handlePressIn} 
                                onPress={nextEgg} 
                                style={styles.navButton}
                            >
                                <Text style={styles.navButtonText}>{">"}</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.eggInfo}>
                            <View style={styles.nameBadge}>
                                <Text style={styles.eggName}>{currentEgg.name}</Text>
                            </View>
                            <Text style={styles.eggDescription}>{currentEgg.description}</Text>
                        </View>

                        <TouchableOpacity
                            style={styles.acceptButton}
                            onPressIn={handlePressIn}
                            onPress={() => setShowModal(true)}
                        >
                            <Text style={styles.acceptButtonText}>ACEPTAR</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            {/* Modal de confirmacion */}
            <Modal visible={showModal} transparent animationType="fade">
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalText}>
                            ¿ESCOGER EL {currentEgg.name}?
                        </Text>
                        <View style={styles.modalButtons}>
                            <TouchableOpacity
                                style={[styles.modalButton, styles.cancelButton]}
                                onPressIn={handlePressIn}
                                onPress={() => setShowModal(false)}
                            >
                                <Text style={styles.modalBtnText}>NO</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.modalButton, styles.confirmButton]}
                                onPressIn={handlePressIn}
                                onPress={confirmSelection}
                            >
                                <Text style={styles.modalBtnText}>SÍ</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
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
        justifyContent: "center",
        alignItems: "center",
        paddingTop: 30,
    },
    headerTitle: {
        fontFamily: Typography.retro,
        fontSize: 10,
        color: Colors.lcd.text,
        opacity: 0.6,
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
        borderWidth: 10,
        borderTopColor: Colors.bezel.top,
        borderLeftColor: Colors.bezel.left,
        borderRightColor: Colors.bezel.right,
        borderBottomColor: Colors.bezel.bottom,
        overflow: "hidden",
    },
    lcdContent: {
        flex: 1,
        backgroundColor: Colors.lcd.background,
        alignItems: "center",
        padding: Spacing.xl,
        justifyContent: "space-between",
    },
    title: {
        fontFamily: Typography.retro,
        fontSize: 14,
        color: Colors.lcd.text,
        textAlign: "center",
        marginTop: 10,
    },
    sliderContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
    },
    navButton: {
        width: 50,
        height: 50,
        backgroundColor: "white",
        borderRadius: 8,
        borderWidth: 2,
        borderColor: Colors.lcd.text,
        borderBottomWidth: 4,
        justifyContent: "center",
        alignItems: "center",
    },
    navButtonText: {
        fontFamily: Typography.retro,
        fontSize: 14,
        color: Colors.lcd.text,
    },
    eggImageWrapper: {
        flex: 1,
        height: 180,
        justifyContent: "center",
        alignItems: "center",
    },
    eggImage: {
        width: 140,
        height: 140,
        resizeMode: "contain",
    },
    eggInfo: {
        alignItems: "center",
        width: "100%",
    },
    nameBadge: {
        backgroundColor: Colors.lcd.accent,
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 4,
        borderWidth: 2,
        borderColor: Colors.lcd.text,
        marginBottom: 10,
    },
    eggName: {
        fontFamily: Typography.retro,
        fontSize: 10,
        color: Colors.lcd.text,
    },
    eggDescription: {
        fontFamily: Typography.retro,
        fontSize: 7,
        color: "gray",
        textAlign: "center",
        lineHeight: 12,
        paddingHorizontal: 10,
    },
    acceptButton: {
        backgroundColor: Colors.buttons.green,
        paddingVertical: 16,
        width: "100%",
        borderRadius: 8,
        borderWidth: 2,
        borderBottomWidth: 6,
        borderColor: Colors.lcd.text,
        alignItems: "center",
        marginBottom: 10,
    },
    acceptButtonText: {
        fontFamily: Typography.retro,
        color: "white",
        fontSize: 12,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.7)",
        justifyContent: "center",
        alignItems: "center",
    },
    modalContent: {
        width: "80%",
        backgroundColor: Colors.lcd.background,
        borderWidth: 6,
        borderColor: Colors.lcd.primary,
        borderRadius: 16,
        padding: 24,
        alignItems: "center",
    },
    modalText: {
        fontFamily: Typography.retro,
        fontSize: 10,
        color: Colors.lcd.text,
        textAlign: "center",
        lineHeight: 18,
        marginBottom: 24,
    },
    modalButtons: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        gap: 16,
    },
    modalButton: {
        flex: 1,
        paddingVertical: 12,
        borderRadius: 8,
        borderWidth: 2,
        borderBottomWidth: 4,
        borderColor: Colors.lcd.text,
        alignItems: "center",
    },
    modalBtnText: {
        fontFamily: Typography.retro,
        fontSize: 10,
        color: "white",
    },
    cancelButton: {
        backgroundColor: Colors.buttons.red,
    },
    confirmButton: {
        backgroundColor: Colors.buttons.green,
    },
});
