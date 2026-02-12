/**
 * Constantes de tema para la aplicacion.
 * Define colores y fuentes para modos claro y oscuro.
 * Los colores pueden ser personalizados para diferentes temas.
 * Opciones alternativas de estilo: Nativewind, Tamagui, unistyles.
 */

import { Platform } from 'react-native';

const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';

/**
 * Paleta de colores para modos claro y oscuro.
 * Cada modo define colores para texto, fondo, tinte, iconos y pestanhas.
 */
export const Colors = {
  light: {
    text: '#11181C',
    background: '#fff',
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
  },
};

/**
 * Familias de fuentes para diferentes plataformas.
 * Proporciona selecciones de fuentes especificas para iOS, web y por defecto.
 */
export const Fonts = Platform.select({
  ios: {
    /** iOS UIFontDescriptorSystemDesignDefault */
    sans: 'system-ui',
    /** iOS UIFontDescriptorSystemDesignSerif */
    serif: 'ui-serif',
    /** iOS UIFontDescriptorSystemDesignRounded */
    rounded: 'ui-rounded',
    /** iOS UIFontDescriptorSystemDesignMonospaced */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
