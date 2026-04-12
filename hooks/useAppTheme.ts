import { useColorScheme } from 'react-native'
import { colors } from '@/constants/colors'

export function useAppTheme() {
	const scheme = useColorScheme() ?? 'light'

	return {
		scheme,
		isDark: scheme === 'dark',
		colors: colors[scheme],
	}
}
