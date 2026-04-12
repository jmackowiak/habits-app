import { Ionicons } from '@expo/vector-icons'
import { Tabs } from 'expo-router'
import { useAppTheme } from '@/hooks/useAppTheme'

export default function TabLayout() {
	const { colors } = useAppTheme()

	return (
		<Tabs
			screenOptions={{
				tabBarActiveTintColor: colors.active,
				headerStyle: {
					backgroundColor: colors.background,
				},
				headerShadowVisible: false,
				headerTintColor: colors.text,
				tabBarStyle: {
					backgroundColor: colors.background,
				},
			}}
		>
			<Tabs.Screen
				name="index"
				options={{
					title: 'Today',
					tabBarIcon: ({ color, focused }) => (
						<Ionicons
							color={color}
							name={focused ? 'today' : 'today-outline'}
						/>
					),
				}}
			/>
			<Tabs.Screen
				name="about"
				options={{
					title: 'About',
					tabBarIcon: ({ color, focused }) => (
						<Ionicons
							color={color}
							name={
								focused ? 'information-circle' : 'information-circle-outline'
							}
						/>
					),
				}}
			/>
		</Tabs>
	)
}
