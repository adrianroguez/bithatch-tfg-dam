import React from "react";
import { View, StyleSheet, ViewStyle } from "react-native";

/**
 * Panel decorativo con textura de muro de ladrillos.
 * Los hijos se superponen sobre el muro mediante posicionamiento absoluto,
 * de modo que el muro actúa como fondo opaco del contenedor.
 *
 * Uso:
 *   <BrickWallPanel style={estilos.miPanel}>
 *     <MisBotonjes />
 *   </BrickWallPanel>
 */

/* ── Constantes de ladrillo ────────────────────────────────────────── */
const BRICK_COLOR = "#D4DCD8";      // Gris salvia muy suave (da un toque de color sin deslumbrar)
const MORTAR_COLOR = "#A3B0AA";     // Tono más oscuro para el hundimiento de las juntas
const BRICK_WIDTH = 70;
const BRICK_HEIGHT = 24;
const MORTAR = 3;                   // Grosor de la junta
const BRICKS_PER_ROW = 6;          // Suficientes para cubrir el ancho

function BrickRow({ offset = false }: { offset?: boolean }) {
  return (
    <View
      style={[
        styles.brickRow,
        offset ? { marginLeft: -(BRICK_WIDTH / 2) } : undefined,
      ]}
    >
      {Array.from({ length: BRICKS_PER_ROW + 1 }).map((_, i) => (
        <View key={i} style={styles.brick} />
      ))}
    </View>
  );
}

interface BrickWallPanelProps {
  children?: React.ReactNode;
  style?: ViewStyle;
  rows?: number; // Permite fijar la altura a un número exacto de filas completas
}

export default function BrickWallPanel({ children, style, rows = 4 }: BrickWallPanelProps) {
  return (
    <View style={[styles.container, style]}>
      {/* Muro de ladrillos dibuja la estructura REAL y le da su tamaño natural al componente */}
      <View style={styles.wallBackground} pointerEvents="none">
        {Array.from({ length: rows }).map((_, i) => (
          <BrickRow key={i} offset={i % 2 !== 0} />
        ))}
      </View>

      {/* Capa de oscurecimiento sutil para dar profundidad */}
      <View style={styles.overlay} pointerEvents="none" />

      {/* Contenido superpuesto sobre el muro */}
      <View style={styles.content}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    overflow: "hidden",
  },
  wallBackground: {
    backgroundColor: MORTAR_COLOR,  // Color de las juntas (mortero)
    justifyContent: "flex-start",
    // padding inicial (el final lo da el margin de los ladrillos)
    paddingTop: MORTAR,
    paddingLeft: MORTAR,
  },
  brickRow: {
    flexDirection: "row",
  },
  brick: {
    width: BRICK_WIDTH,
    height: BRICK_HEIGHT,
    backgroundColor: BRICK_COLOR,
    // En lugar de margen a ambos lados, solo agregamos margen de separación a la derecha y abajo
    marginRight: MORTAR,
    marginBottom: MORTAR,
    borderRadius: 3, // Ladrillo un poco más redondeado (estilo plástico moldeado)
    // Efecto bisel / relieve 3D pronunciado
    borderTopWidth: 2,
    borderLeftWidth: 1.5,
    borderTopColor: "rgba(255,255,255,0.7)",
    borderLeftColor: "rgba(255,255,255,0.4)",
    borderBottomWidth: 2,
    borderRightWidth: 1.5,
    borderBottomColor: "rgba(0,0,0,0.25)",
    borderRightColor: "rgba(0,0,0,0.15)",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.03)", // Apenas percertible para no oscurecer el texto
  },
  content: {
    // Elevamos el zIndex para que los toques siempre vayan aquí y no queden bloqueados por nada del fondo absoluto
    ...StyleSheet.absoluteFillObject,
    zIndex: 1, 
  },
});
