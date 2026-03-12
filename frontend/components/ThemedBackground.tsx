import React, { useEffect, useRef } from "react";
import { View, StyleSheet, Animated, Dimensions, Easing } from "react-native";

const { width, height } = Dimensions.get("window");
// Tamano maximo del anillo para cubrir la pantalla incluso al escalar
const MAX_SIZE = Math.max(width, height) * 1.5;
const NUM_RINGS = 32;   // Anillos activos simultaneamente
const DURATION = 60000; // Duracion de un ciclo completo (60s = movimiento muy suave)

/**
 * Fondo animado que simula el interior de un cable de datos.
 * Los anillos concentricos se expanden desde el centro alternando verde y azul,
 * reforzando la simbologia de conexion digital entre el usuario y sus criaturas.
 */
export default function ThemedBackground() {
    // Array de valores animados, uno por anillo, con posiciones iniciales escalonadas
    // para que el tunel aparezca ya lleno de anillos desde el primer frame
    const rings = useRef(
        Array.from({ length: NUM_RINGS }).map((_, i) => new Animated.Value(i / NUM_RINGS))
    ).current;

    // 8 lineas de fibra optica estaticas, rotadas cada 45 grados desde el centro
    const fiberLines = Array.from({ length: 8 }).map((_, i) => (
        <View
            key={`fiber-${i}`}
            style={[styles.fiberLine, { transform: [{ rotate: `${i * 45}deg` }] }]}
        />
    ));

    useEffect(() => {
        /**
         * Funcion recursiva que garantiza un flujo continuo y sin pausas.
         * Cuando un anillo termina su ciclo (0 -> 1), lo reinicia desde 0 inmediatamente.
         * @param ring - Valor animado del anillo
         * @param initialDuration - Duracion del primer ciclo (permite el escalonado de inicio)
         */
        const startLoop = (ring: Animated.Value, initialDuration: number) => {
            Animated.timing(ring, {
                toValue: 1,
                duration: initialDuration,
                easing: Easing.linear,
                useNativeDriver: false, // Necesario: el driver nativo no soporta animacion de borderWidth
            }).start(({ finished }) => {
                if (finished) {
                    ring.setValue(0);
                    startLoop(ring, DURATION);
                }
            });
        };

        rings.forEach((ring, i) => {
            // La duracion inicial es proporcional a la posicion del anillo,
            // de forma que todos llegan al final escalonados desde el principio
            startLoop(ring, DURATION * (1 - i / NUM_RINGS));
        });

        return () => {
            rings.forEach(ring => ring.stopAnimation());
        };
    }, [rings]);

    return (
        <View style={styles.container}>
            <View style={styles.base} />

            {/* Lineas de fibra optica centradas en la pantalla */}
            <View style={styles.centerAnchor}>
                {fiberLines}
            </View>

            {/* Anillos animados del tunel */}
            <View style={styles.centerAnchor}>
                {rings.map((ring, i) => {
                    // El anillo cubre toda la pantalla al llegar a escala 4x
                    const scale = ring.interpolate({ inputRange: [0, 1], outputRange: [0, 4] });
                    // Aparece y desaparece suavemente, manteniendose opaco en la parte central
                    const opacity = ring.interpolate({ inputRange: [0, 0.3, 0.7, 1], outputRange: [0, 1, 1, 0] });
                    // El borde crece para simular profundidad 3D (el anillo "engornia" al acercarse)
                    const borderWidth = ring.interpolate({ inputRange: [0, 1], outputRange: [2, 80] });
                    // Anillos pares en verde, impares en azul (paleta tematica de BitHatch)
                    const ringColor = i % 2 === 0 ? "rgba(76, 175, 80, 0.5)" : "rgba(33, 150, 243, 0.5)";

                    return (
                        <Animated.View
                            key={i}
                            style={[styles.ring, { borderColor: ringColor, transform: [{ scale }], opacity, borderWidth }]}
                        />
                    );
                })}
            </View>

            {/* Punto de luz central que simula la fuente luminosa del cable */}
            <View style={styles.centerAnchor}>
                <View style={styles.centerGlow} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "#E8F5E9",
        overflow: "hidden",
    },
    base: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "#F1F8E9",
    },
    centerAnchor: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: "center",
        alignItems: "center",
    },
    ring: {
        position: "absolute",
        width: MAX_SIZE,
        height: MAX_SIZE,
        borderRadius: MAX_SIZE / 2, // Circulo perfecto
    },
    fiberLine: {
        position: "absolute",
        width: 2,
        height: MAX_SIZE,
        backgroundColor: "rgba(165, 214, 167, 0.2)",
    },
    centerGlow: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: "#fff",
        opacity: 0.4,
        shadowColor: "#4CAF50",
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.8,
        shadowRadius: 20,
        elevation: 10,
    },
});
