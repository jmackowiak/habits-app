import { Ionicons } from '@expo/vector-icons'
import { router, Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { Pressable } from 'react-native'
import { HabitsProvider } from '@/contexts/habits'
import { useAppTheme } from '@/hooks/useAppTheme'

export default function RootLayout() {
	const { colors } = useAppTheme()

	return (
		<HabitsProvider>
			<Stack>
				<Stack.Screen name="(tabs)" options={{ headerShown: false }} />
				<Stack.Screen
					name="new-habit"
					options={{
						presentation: 'modal',
						title: 'Add Habit',
						headerLeft: () => (
							<Pressable onPress={() => router.back()}>
								<Ionicons color={colors.text} name="close-outline" size={24} />
							</Pressable>
						),
						headerStyle: {
							backgroundColor: colors.background,
						},
						headerTitleStyle: {
							color: colors.text,
						},
					}}
				/>
			</Stack>
			<StatusBar style="auto" />
		</HabitsProvider>
	)
}
