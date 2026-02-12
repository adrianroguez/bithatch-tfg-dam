import { Slot } from "expo-router";
import React from "react";
import { AuthProvider } from "../context/AuthContext";

import { CreatureProvider } from "../context/CreatureContext";

/**
 * Componente de layout raiz de la aplicacion.
 * Envuelve toda la app con los proveedores de contexto de autenticacion y criatura.
 * Esto asegura que todos los componentes hijos tengan acceso al estado de auth y criatura.
 * 
 * @returns {JSX.Element} El layout raiz con proveedores anidados
 */
export default function RootLayout() {
  return (
    <AuthProvider>
      <CreatureProvider>
        <Slot />
      </CreatureProvider>
    </AuthProvider>
  );
}
