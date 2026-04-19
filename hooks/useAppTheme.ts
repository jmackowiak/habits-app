import { useColorScheme } from 'react-native'
import { colors } from '@/constants/colors'
import { useTheme } from '@/contexts/theme'

export function useAppTheme() {
	const systemScheme = useColorScheme() ?? 'light'
	const { accentColor, themeMode } = useTheme()

	const schema = themeMode === 'system' ? systemScheme : themeMode

	return {
		schema,
		isDark: schema === 'dark',
		colors: {
			...colors[schema],
			active: accentColor,
		},
	}
}
