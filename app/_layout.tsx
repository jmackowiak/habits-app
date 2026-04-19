import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { HabitsProvider } from '@/contexts/habits'
import { ThemeProvider } from '@/contexts/theme'
import { useAppTheme } from '@/hooks/useAppTheme'

function AppContent() {
	const { isDark } = useAppTheme()

	return (
		<GestureHandlerRootView>
			<Stack>
				<Stack.Screen name="(tabs)" options={{ headerShown: false }} />
				<Stack.Screen
					name="new-habit"
					options={{
						presentation: 'fullScreenModal',
						headerShown: false,
					}}
				/>
			</Stack>
			<StatusBar style={isDark ? 'light' : 'dark'} />
		</GestureHandlerRootView>
	)
}

export default function RootLayout() {
	return (
		<ThemeProvider>
			<HabitsProvider>
				<AppContent />
			</HabitsProvider>
		</ThemeProvider>
	)
}
