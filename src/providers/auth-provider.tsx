'use client';

import { getMe } from '@/features/auth/api/me';
import { mergeCart } from '@/features/cart/api/merge-cart';
import { useCartStore } from '@/features/cart/store/cart.store';
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

  const clearCart = useCartStore((state) => state.clearCart);

  useEffect(() => {
    const bootstrap = async () => {
      const savedToken = localStorage.getItem(TOKEN_KEY);

      if (!savedToken) {
        setLoading(false);
        return;
      }

      try {
        const profile = await getMe(savedToken);
        setToken(savedToken);
        setUser(profile);
      } catch {
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
        await mergeCart(sessionId, newToken);
        clearCart();
      } catch {
        // dejamos el carrito local como respaldo si el merge falla
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