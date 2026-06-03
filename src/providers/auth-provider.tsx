'use client';

import { getMe } from '@/features/auth/api/me';
import { mergeCart } from '@/features/cart/api/merge-cart';
import { getSessionId } from '@/features/cart/utils/cart-session';
import { AuthUser } from '@/features/auth/types';
import { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react';

type AuthContextType = {
  user: AuthUser | null;
  token: string | null;
  loading: boolean;
  loginSession: (token: string, user: AuthUser) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const TOKEN_KEY = 'polleria_access_token';

export function AuthProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const bootstrap = async () => {
      try {
        const savedToken = localStorage.getItem(TOKEN_KEY);

        if (!savedToken) {
          setLoading(false);
          return;
        }

        setToken(savedToken);

        const profile = await getMe(savedToken);
        setUser(profile);
      } catch (error) {
        console.error('Error rehidratando sesión:', error);
        localStorage.removeItem(TOKEN_KEY);
        setToken(null);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    bootstrap();
  }, []);

  const loginSession = async (newToken: string, newUser: AuthUser) => {
    localStorage.setItem(TOKEN_KEY, newToken);
    setToken(newToken);
    setUser(newUser);

    const sessionId = getSessionId();

    if (sessionId) {
      try {
        // Nota para mí: el carrito visible del checkout vive en Zustand/localStorage.
        // No debo limpiarlo aquí porque el cliente puede haber agregado productos
        // antes de iniciar sesión y todavía los necesita para confirmar el pedido.
        // La fusión con backend queda como operación best-effort.
        await mergeCart(sessionId, newToken);
      } catch (error) {
        console.error('Error fusionando carrito:', error);
      }
    }
  };

  const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        loginSession,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuthContext debe usarse dentro de AuthProvider');
  }

  return context;
}