import AsyncStorage from '@react-native-async-storage/async-storage'
import {
	createContext,
	type ReactNode,
	useContext,
	useEffect,
	useState,
} from 'react'
import { accentColors } from '@/constants/colors'

export type ThemeMode = 'system' | 'light' | 'dark'

type ThemeContextType = {
	accentColor: string
	setAccentColor: (color: string) => void
	themeMode: ThemeMode
	setThemeMode: (mode: ThemeMode) => void
}

const ThemeContext = createContext<ThemeContextType | null>(null)

export function useTheme() {
	const context = useContext(ThemeContext)

	if (!context) throw new Error('useTheme must be used within ThemeProvider.')

	return context
}

export function ThemeProvider({ children }: { children: ReactNode }) {
	const [accentColor, setAccentColor] = useState(accentColors[0].value)
	const [themeMode, setThemeMode] = useState<ThemeMode>('system')

	useEffect(() => {
		async function load() {
			const savedAccentColor = await AsyncStorage.getItem('accentColor')
			const savedThemeMode = await AsyncStorage.getItem('themeMode')
			if (savedAccentColor) setAccentColor(savedAccentColor)
			if (savedThemeMode) setThemeMode(savedThemeMode as ThemeMode)
		}

		load()
	}, [])

	useEffect(() => {
		AsyncStorage.setItem('accentColor', accentColor)
	}, [accentColor])

	useEffect(() => {
		AsyncStorage.setItem('themeMode', themeMode)
	}, [themeMode])

	return (
		<ThemeContext.Provider
			value={{ accentColor, setAccentColor, themeMode, setThemeMode }}
		>
			{children}
		</ThemeContext.Provider>
	)
}
