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
} from "react-native";
import { useCreature } from "../context/CreatureContext";
import { AuthContext } from "../context/AuthContext";

/**
 * Enumeracion de tipos de huevos (debe coincidir con el enum del backend).
 */
enum EggType {
    EGG_A = "EGG_A",
    EGG_B = "EGG_B",
    EGG_C = "EGG_C",
}

/**
 * Datos de configuracion para las opciones de huevos en el slider.
 */
const EGG_OPTIONS = [
    {
        type: EggType.EGG_A,
        name: "Huevo A",
        description: "Descripción del huevo A.",
        image: require("../assets/egg_a.png"),
    },
    {
        type: EggType.EGG_B,
        name: "Huevo B",
        description: "Descripción del huevo B.",
        image: require("../assets/egg_b.png"),
    },
    {
        type: EggType.EGG_C,
        name: "Huevo C",
        description: "Descripción del huevo C.",
        image: require("../assets/egg_c.png"),
    },
];

/**
 * Componente de pantalla de seleccion de huevo.
 * Permite a los usuarios elegir su huevo inicial de las opciones disponibles.
 * Muestra una interfaz de slider con navegacion y modal de confirmacion.
 * 
 * @returns {JSX.Element} Vista de seleccion de huevo con slider y modal
 */
export default function SelectEgg() {
    const router = useRouter();
    const { createStarter } = useCreature();
    const { token } = useContext(AuthContext);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const [error, setError] = useState("");

    // Valor animado para el efecto de levitacion del huevo
    const floatAnimation = useRef(new Animated.Value(0)).current;

    /**
     * Efecto para redirigir a login si el usuario no esta autenticado.
     */
    useEffect(() => {
        if (!token) {
            router.replace("/login");
        }
    }, [token]);

    /**
     * Efecto para crear la animacion de levitacion del huevo.
     * El huevo se mueve suavemente arriba y abajo en un loop infinito.
     */
    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(floatAnimation, {
                    toValue: -10,
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

    const currentEgg = EGG_OPTIONS[currentIndex];

    /**
     * Avanza al siguiente huevo en el slider.
     * Se reinicia al primer huevo al llegar al final.
     */
    const nextEgg = () => {
        setCurrentIndex((prev) => (prev + 1) % EGG_OPTIONS.length);
    };

    /**
     * Retrocede al huevo anterior en el slider.
     * Se reinicia al ultimo huevo al estar en el principio.
     */
    const prevEgg = () => {
        setCurrentIndex((prev) =>
            prev === 0 ? EGG_OPTIONS.length - 1 : prev - 1
        );
    };

    /**
     * Confirma la selección de huevo y redirige a la pantalla de nacimiento para ponerle nombre.
     */
    const confirmSelection = () => {
        setShowModal(false);
        router.push({
            pathname: "/nacimiento",
            params: { eggType: currentEgg.type }
        });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Escoge un huevo</Text>

            {/* Slider de huevos */}
            <View style={styles.eggContentWrapper}>
                {/* Contenedor de imagen con flechas - alineacion automatica */}
                <View style={styles.sliderContainer}>
                    <TouchableOpacity onPress={prevEgg} style={styles.navButton}>
                        <Text style={styles.navButtonText}>{"<"}</Text>
                    </TouchableOpacity>

                    <Animated.Image
                        source={currentEgg.image}
                        style={[
                            styles.eggImage,
                            {
                                transform: [{ translateY: floatAnimation }]
                            }
                        ]}
                    />

                    <TouchableOpacity onPress={nextEgg} style={styles.navButton}>
                        <Text style={styles.navButtonText}>{">"}</Text>
                    </TouchableOpacity>
                </View>

                {/* Informacion del huevo debajo */}
                <View style={styles.eggInfo}>
                    <Text style={styles.eggName}>{currentEgg.name}</Text>
                    <Text style={styles.eggDescription}>{currentEgg.description}</Text>
                </View>
            </View>

            {error ? <Text style={styles.errorText}>{error}</Text> : null}

            <TouchableOpacity
                style={styles.acceptButton}
                onPress={() => setShowModal(true)}
            >
                <Text style={styles.acceptButtonText}>Aceptar</Text>
            </TouchableOpacity>

            {/* Modal de confirmacion */}
            <Modal visible={showModal} transparent animationType="slide">
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalText}>
                            ¿Esta seguro de escoger el {currentEgg.name}?
                        </Text>
                        <View style={styles.modalButtons}>
                            <TouchableOpacity
                                style={[styles.modalButton, styles.cancelButton]}
                                onPress={() => setShowModal(false)}
                            >
                                <Text style={styles.buttonText}>No</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.modalButton, styles.confirmButton]}
                                onPress={confirmSelection}
                            >
                                <Text style={styles.buttonText}>Si</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
        backgroundColor: "#f5f5f5",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 40,
        textAlign: "center",
    },
    eggContentWrapper: {
        width: "100%",
        marginBottom: 40,
        alignItems: "center",
    },
    sliderContainer: {
        flexDirection: "row",
        alignItems: "center", // Alinea automaticamente las flechas al centro de la imagen
        justifyContent: "center",
        width: "100%",
        gap: 20, // Espacio entre flechas e imagen
    },
    navButton: {
        padding: 15,
        backgroundColor: "#ddd",
        borderRadius: 50,
    },
    navButtonText: {
        fontSize: 20,
        fontWeight: "bold",
    },
    eggImage: {
        width: 150,
        height: 150,
        resizeMode: "contain",
    },
    eggInfo: {
        alignItems: "center",
        marginTop: 10,
    },
    eggName: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 5,
    },
    eggDescription: {
        fontSize: 14,
        color: "#666",
        textAlign: "center",
        paddingHorizontal: 10,
    },
    acceptButton: {
        backgroundColor: "#007AFF",
        paddingVertical: 12,
        paddingHorizontal: 40,
        borderRadius: 25,
    },
    acceptButtonText: {
        color: "white",
        fontSize: 18,
        fontWeight: "bold",
    },
    errorText: {
        color: "red",
        marginBottom: 10,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.5)",
        justifyContent: "center",
        alignItems: "center",
    },
    modalContent: {
        backgroundColor: "white",
        padding: 20,
        borderRadius: 10,
        width: "80%",
        alignItems: "center",
    },
    modalText: {
        fontSize: 18,
        marginBottom: 20,
        textAlign: "center",
    },
    modalButtons: {
        flexDirection: "row",
        justifyContent: "space-around",
        width: "100%",
    },
    modalButton: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        minWidth: 80,
        alignItems: "center",
    },
    cancelButton: {
        backgroundColor: "#ccc",
    },
    confirmButton: {
        backgroundColor: "#007AFF",
    },
    buttonText: {
        color: "white",
        fontWeight: "bold",
    },
});
