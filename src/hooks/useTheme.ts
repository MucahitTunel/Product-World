import { ThemeContext } from "@/providers/theme-provide"
import { useContext } from "react"

export const useTheme = () => {
    const context = useContext(ThemeContext)
    if (!context) {
        throw new Error("useTheme must be used within a ThemeProvider")
    }
    return context
}