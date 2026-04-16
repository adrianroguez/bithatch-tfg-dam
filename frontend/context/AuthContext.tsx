import Constants from "expo-constants";
import React, { createContext, useEffect, useMemo, useState } from "react";

const API_URL = Constants.expoConfig?.extra?.apiUrl ?? "http://192.168.1.220:8080";
const TOKEN_KEY = Constants.expoConfig?.extra?.tokenKey ?? "token";

/**
 * Interfaz de respuesta de autenticacion.
 * Retornada por las operaciones de login y registro.
 * 
 * @property {string} [token] - Token JWT si la autenticacion fue exitosa
 * @property {string} [msg] - Mensaje de error o exito
 * @property {boolean} [ok] - Si la operacion fue exitosa
 */
type AuthResponse = {
  token?: string;
  msg?: string;
  ok?: boolean;
};

/**
 * Definicion del tipo de contexto de autenticacion.
 * Proporciona estado y metodos de autenticacion a todos los componentes.
 * 
 * @property {string | null} token - Token JWT actual o null si no esta autenticado
 * @property {boolean} loading - Si el estado de autenticacion se esta cargando
 * @property {Function} login - Funcion para autenticar usuario con credenciales
 * @property {Function} register - Funcion para crear nueva cuenta de usuario
 * @property {Function} logout - Funcion para limpiar estado de autenticacion
 * @property {string} apiUrl - URL base para peticiones API
 */
type AuthContextType = {
  token: string | null;
  loading: boolean;
  login: (username: string, password: string) => Promise<AuthResponse>;
  register: (username: string, email: string, password: string) => Promise<AuthResponse>;
  logout: () => Promise<void>;
  apiUrl: string;
};

/**
 * Contexto de autenticacion con valores por defecto.
 * Proporciona estado y metodos de autenticacion en toda la app.
 */
export const AuthContext = createContext<AuthContextType>({
  token: null,
  loading: true,
  login: async () => ({}),
  register: async () => ({}),
  logout: async () => { },
  apiUrl: API_URL,
});

/**
 * Componente proveedor de autenticacion.
 * Gestiona el estado de autenticacion (token) y proporciona funciones login/register/logout.
 * La persistencia de token esta actualmente deshabilitada - los usuarios deben hacer login en cada inicio de app.
 * 
 * @param {Object} props - Props del componente
 * @param {React.ReactNode} props.children - Componentes hijos a envolver
 * @returns {JSX.Element} Proveedor de contexto de autenticacion
 */
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  /**
   * Efecto para cargar token almacenado en la inicializacion de la app.
   * DESHABILITADO: La persistencia de token esta deshabilitada para requerir login en cada inicio de app.
   * Esto puede ser reactivado descomentando las lineas de SecureStore.
   */
  useEffect(() => {
    const loadToken = async () => {
      // const saved = await SecureStore.getItemAsync(TOKEN_KEY);
      // if (saved) setToken(saved);
      setLoading(false);
    };
    loadToken();
  }, []);

  /**
   * Registra una nueva cuenta de usuario.
   * 
   * @param {string} username - Nombre de usuario deseado
   * @param {string} email - Direccion de email del usuario
   * @param {string} password - Contrasenha del usuario
   * @returns {Promise<AuthResponse>} Respuesta del servidor con estado de exito y token opcional
   */
  const register = async (username: string, email: string, password: string): Promise<AuthResponse> => {
    try {
      const res = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });
      const data = await res.json();
      if (res.ok && data.token) {
        // Opcional: Auto-login despues del registro si se desea
      }
      return { ok: res.ok, ...data };
    } catch (err) {
      return { ok: false, msg: "No se pudo conectar con el servidor" };
    }
  };

  /**
   * Autentica usuario con nombre de usuario y contrasenha.
   * La persistencia de token esta deshabilitada - el token solo se almacena en memoria para la sesion actual.
   * 
   * @param {string} username - Nombre de usuario para autenticacion
   * @param {string} password - Contrasenha del usuario
   * @returns {Promise<AuthResponse>} Respuesta del servidor con token si es exitoso
   */
  const login = async (username: string, password: string): Promise<AuthResponse> => {
    try {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();

      if (res.ok && data.token) {
        // await SecureStore.setItemAsync(TOKEN_KEY, data.token); // DESHABILITADO: Token no persistido
        setToken(data.token);
        return { ok: true, token: data.token };
      }
      return { ok: false, msg: "Credenciales invalidas" };
    } catch (err) {
      return { ok: false, msg: "No se pudo conectar con el servidor" };
    }
  };

  /**
   * Cierra la sesion del usuario limpiando el token de autenticacion.
   * Como la persistencia de token esta deshabilitada, solo limpia el estado en memoria.
   */
  const logout = async () => {
    // await SecureStore.deleteItemAsync(TOKEN_KEY); // DESHABILITADO: No hay token persistido
    setToken(null);
  };

  const value = useMemo(
    () => ({ token, loading, login, register, logout, apiUrl: API_URL }),
    [token, loading],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
