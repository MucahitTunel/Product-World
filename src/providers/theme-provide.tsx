import AsyncStorage from "@react-native-async-storage/async-storage"
import { createContext, useEffect, useMemo, useState } from "react"
import { useColorScheme } from "react-native"

type Theme = 'light' | 'dark'

interface ThemeContextValue {
    theme: Theme
    toggleTheme: () => void
    setTheme: (theme: Theme) => void
    ready: boolean
}

export const ThemeContext = createContext<ThemeContextValue | undefined>(undefined)
const STORAGE_KEY = 'app-theme-preference'

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
    const system = useColorScheme()
    const [theme, setTheme] = useState<Theme>(system === 'dark' ? 'dark' : 'light')
    const [ready, setReady] = useState(true)

    useEffect(() => {
        const getStoredTheme = async () => {
            try {
                const storedTheme = await AsyncStorage.getItem(STORAGE_KEY)

                if (storedTheme) {
                    setTheme(storedTheme as Theme)
                }
            } catch (error) {
                console.error("Failed to load theme:", error)
            } finally {
                setReady(true)
            }
        }

        getStoredTheme()
    }, [system])

    useEffect(() => {
        if (ready) AsyncStorage.setItem(STORAGE_KEY, theme).catch(error => {
            console.error("Failed to save theme:", error)
        })
    }, [theme, ready])

    const toggleTheme = () => {
        setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light')
    }

    const value = useMemo(() => ({
        theme,
        ready,
        toggleTheme,
        setTheme
    }), [theme, ready])

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    )
}

