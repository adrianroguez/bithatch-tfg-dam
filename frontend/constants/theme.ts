/**
 * Sistema de diseño "Premium Retro" para BitHatch.
 * Basado en la estética Tamagotchi de los 90.
 */

export const Colors = {
  // Colores principales de la pantalla (LCD)
  lcd: {
    background: "#FFFFFF",
    text: "#111111",
    primary: "#2E7D32", // Verde BitHatch
    secondary: "#388E3C",
    accent: "#FFA500", // Naranja
  },
  
  // Colores de los botones físicos
  buttons: {
    red: "#D32F2F",
    green: "#388E3C",
    blue: "#1976D2",
    yellow: "#FBC02D",
    text: "#FFFFFF",
  },

  // Colores de la estructura (Ladrillos / Carcasa)
  structure: {
    brick: "#D4DCD8",
    mortar: "#A3B0AA",
    highlight: "rgba(255, 255, 255, 0.7)",
    shadow: "rgba(0, 0, 0, 0.25)",
    overlay: "rgba(0, 0, 0, 0.03)",
  },

  // Bordes del bisel LCD
  bezel: {
    top: "#78909C",
    left: "#90A4AE",
    right: "#CFD8DC",
    bottom: "#FFFFFF",
  }
};

export const Typography = {
  retro: "PressStart2P",
};

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

export const Shadows = {
  button: {
    borderBottomWidth: 5,
    pressedTransform: 3,
  }
};
