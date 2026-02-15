import React, { createContext, useContext, useState, useCallback } from 'react';

interface AppState {
  isLoggedIn: boolean;
  isPro: boolean;
  usageCount: number;
  maxFreeUsage: number;
  userName: string;
  userEmail: string;
}

interface AppContextType extends AppState {
  login: () => Promise<void>;
  logout: () => void;
  incrementUsage: () => boolean;
  upgradeToPro: () => void;
  canUse: () => boolean;
}

const defaultState: AppState = {
  isLoggedIn: false,
  isPro: false,
  usageCount: 0,
  maxFreeUsage: 3,
  userName: '',
  userEmail: '',
};

const AppContext = createContext<AppContextType>({
  ...defaultState,
  login: async () => {},
  logout: () => {},
  incrementUsage: () => false,
  upgradeToPro: () => {},
  canUse: () => true,
});

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AppState>(defaultState);

  const login = useCallback(async () => {
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setState((prev) => ({
      ...prev,
      isLoggedIn: true,
      userName: 'Alex Johnson',
      userEmail: 'alex@example.com',
    }));
  }, []);

  const logout = useCallback(() => {
    setState(defaultState);
  }, []);

  const canUse = useCallback(() => {
    if (state.isPro) return true;
    return state.usageCount < state.maxFreeUsage;
  }, [state.isPro, state.usageCount, state.maxFreeUsage]);

  const incrementUsage = useCallback(() => {
    if (state.isPro) return true;
    if (state.usageCount >= state.maxFreeUsage) return false;
    setState((prev) => ({ ...prev, usageCount: prev.usageCount + 1 }));
    return true;
  }, [state.isPro, state.usageCount, state.maxFreeUsage]);

  const upgradeToPro = useCallback(() => {
    setState((prev) => ({ ...prev, isPro: true }));
  }, []);

  return (
    <AppContext.Provider
      value={{ ...state, login, logout, incrementUsage, upgradeToPro, canUse }}
    >
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);
