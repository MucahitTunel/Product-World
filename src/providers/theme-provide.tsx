import AsyncStorage from "@react-native-async-storage/async-storage";
import { useColorScheme as useNativeWindColorScheme } from "nativewind";
import { createContext, useEffect, useMemo, useState } from "react";
import { useColorScheme as useSystemColorScheme } from "react-native";

export type Theme = "light" | "dark" | "system";

interface ThemeContextValue {
  theme: Theme;
  colorScheme: "light" | "dark";
  setTheme: (theme: Theme) => void;
  ready: boolean;
}

export const ThemeContext = createContext<ThemeContextValue | undefined>(
  undefined
);

const STORAGE_KEY = "app-theme-preference";

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const system = useSystemColorScheme(); // 'light' | 'dark' | null
  const { setColorScheme: setNativeWindColorScheme } = useNativeWindColorScheme();

  // theme: kullanıcı tercihi
  const [theme, setThemeState] = useState<Theme>("system");
  const [ready, setReady] = useState(false);

  // İlk açılışta AsyncStorage'dan theme tercihinin okunması
  useEffect(() => {
    const getStoredTheme = async () => {
      try {
        const storedTheme = await AsyncStorage.getItem(STORAGE_KEY);

        if (storedTheme === "light" || storedTheme === "dark" || storedTheme === "system") {
          setThemeState(storedTheme);
        } else {
          // Kayıt yoksa default olarak 'system' kullan
          setThemeState("system");
        }
      } catch (error) {
        console.error("Failed to load theme:", error);
      } finally {
        setReady(true);
      }
    };

    getStoredTheme();
  }, []);

  // theme değiştiğinde tercihi AsyncStorage'a yaz
  useEffect(() => {
    if (!ready) return;

    AsyncStorage.setItem(STORAGE_KEY, theme).catch((error) => {
      console.error("Failed to save theme:", error);
    });
  }, [theme, ready]);

  // Ekranda kullanılacak efektif tema
  const colorScheme = useMemo<"light" | "dark">(() => {
    if (theme === "system") {
      // system null olursa light’a düş
      return system === "dark" ? "dark" : "light";
    }
    return theme;
  }, [theme, system]);

  useEffect(() => {
    if (!setNativeWindColorScheme) {
      return;
    }

    if (theme === "system") {
      setNativeWindColorScheme("system");
      return;
    }

    setNativeWindColorScheme(colorScheme);
  }, [colorScheme, theme, setNativeWindColorScheme]);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
  };

  const value = useMemo(
    () => ({
      theme,
      colorScheme,
      ready,
      setTheme,
    }),
    [theme, colorScheme, ready]
  );

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};
