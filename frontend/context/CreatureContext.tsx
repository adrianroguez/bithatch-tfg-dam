import React, { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";

/**
 * Interfaz de criatura que representa la criatura de un usuario.
 * Coincide con el DTO CreatureResponse del backend.
 * 
 * @property {number} id - Identificador unico de criatura
 * @property {string} name - Nombre de la criatura
 * @property {string} eggType - Tipo de huevo del que salio la criatura
 * @property {string} personality - Tipo de personalidad de la criatura
 * @property {number} level - Nivel actual
 * @property {number} experience - Puntos de experiencia
 * @property {number} energy - Nivel de energia
 * @property {number} happiness - Nivel de felicidad
 * @property {boolean} isHatched - Si la criatura ha salido del huevo
 * @property {string} [ownerUsername] - Nombre de usuario del duenho de la criatura
 * @property {string} [lastInteraction] - Marca de tiempo de la ultima interaccion
 */
export interface Creature {
    id: number;
    name: string;
    eggType: string;
    personality: string;
    level: number;
    experience: number;
    energy: number;
    happiness: number;
    isHatched: boolean;
    ownerUsername?: string;
    lastInteraction?: string;
}

/**
 * Definicion del tipo de contexto de criatura.
 * Proporciona estado y metodos de gestion de criatura a todos los componentes.
 * 
 * @property {Creature | null} creature - Criatura actual del usuario o null si no tiene
 * @property {boolean} loading - Si los datos de criatura se estan obteniendo
 * @property {string | null} error - Mensaje de error si fallo la obtencion, null en caso contrario
 * @property {Function} fetchCreature - Funcion para obtener criatura del backend
 * @property {Function} createStarter - Funcion para crear una nueva criatura inicial
 */
interface CreatureContextType {
    creature: Creature | null;
    loading: boolean;
    error: string | null;
    fetchCreature: () => Promise<void>;
    createStarter: (name: string, eggType: string) => Promise<{ ok: boolean; msg?: string }>;
}

/**
 * Contexto de criatura con valores por defecto.
 * Proporciona estado y metodos de gestion de criatura en toda la app.
 */
const CreatureContext = createContext<CreatureContextType>({
    creature: null,
    loading: true,
    error: null,
    fetchCreature: async () => { },
    createStarter: async () => ({ ok: false }),
});

/**
 * Hook para acceder al contexto de criatura.
 * Debe ser usado dentro de un CreatureProvider.
 * 
 * @returns {CreatureContextType} Valor del contexto de criatura
 */
export const useCreature = () => useContext(CreatureContext);

/**
 * Componente proveedor de criatura.
 * Gestiona el estado de criatura y proporciona metodos para obtener y crear criaturas.
 * Obtiene automaticamente la criatura cuando cambia el token de autenticacion.
 * 
 * @param {Object} props - Props del componente
 * @param {React.ReactNode} props.children - Componentes hijos a envolver
 * @returns {JSX.Element} Proveedor de contexto de criatura
 */
export const CreatureProvider = ({ children }: { children: React.ReactNode }) => {
    const { token, apiUrl } = useContext(AuthContext);
    const [creature, setCreature] = useState<Creature | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    /**
     * Obtiene la criatura del usuario actual del backend.
     * Maneja diferentes estados de respuesta:
     * - 200: Criatura encontrada y cargada
     * - 404: Usuario no tiene criatura (establece criatura a null)
     * - 500: Error del servidor, tratado como sin criatura (establece criatura a null)
     * - Otro: Establece estado de error
     * 
     * @returns {Promise<void>}
     */
    const fetchCreature = async () => {
        if (!token) {
            setCreature(null);
            setError(null);
            setLoading(false);
            return;
        }

        try {
            setLoading(true);
            setError(null);
            const res = await fetch(`${apiUrl}/creatures/my`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (res.ok) {
                const data = await res.json();
                setCreature(data);
            } else if (res.status === 404 || res.status === 500) {
                // 404: Usuario no tiene criatura
                // 500: Error del servidor (probablemente usuario sin criatura)
                // En ambos casos, tratar como "no tiene criatura"
                setCreature(null);
            } else {
                setError(`Error fetching creature: ${res.status}`);
                console.error("Error fetching creature:", res.status);
            }
        } catch (err) {
            setError("Network error fetching creature");
            console.error("Network error fetching creature:", err);
        } finally {
            setLoading(false);
        }
    };

    /**
     * Crea una nueva criatura inicial (huevo) para el usuario.
     * 
     * @param {string} name - Nombre para la nueva criatura
     * @param {string} eggType - Tipo de huevo a crear (EGG_A, EGG_B, o EGG_C)
     * @returns {Promise<{ok: boolean, msg?: string}>} Resultado de la operacion de creacion
     */
    const createStarter = async (name: string, eggType: string) => {
        if (!token) return { ok: false, msg: "No autenticado" };

        try {
            const res = await fetch(`${apiUrl}/creatures/starter`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ name, eggType }),
            });

            if (res.ok) {
                const data = await res.json();
                setCreature(data); // Actualizar estado local
                return { ok: true };
            } else {
                const errorData = await res.json();
                return { ok: false, msg: errorData.message || "Error al crear huevo" };
            }
        } catch (err) {
            return { ok: false, msg: "No se pudo conectar con el servidor" };
        }
    };

    /**
     * Efecto para obtener criatura cuando cambia el token de autenticacion.
     * Carga automaticamente los datos de criatura cuando el usuario inicia sesion.
     */
    useEffect(() => {
        fetchCreature();
    }, [token, apiUrl]);

    return (
        <CreatureContext.Provider value={{ creature, loading, error, fetchCreature, createStarter }}>
            {children}
        </CreatureContext.Provider>
    );
};
