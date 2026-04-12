import { Ionicons } from '@expo/vector-icons'
import { router, Tabs } from 'expo-router'
import { Pressable } from 'react-native'
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
							size={24}
						/>
					),
					headerRight: () => (
						<Pressable
							onPress={() => router.push('/new-habit')}
							style={{ padding: 4, marginRight: 8 }}
						>
							<Ionicons
								color={colors.active}
								name="add-circle-outline"
								size={30}
							/>
						</Pressable>
					),
				}}
			/>
			<Tabs.Screen
				name="statistics"
				options={{
					title: 'Statistics',
					tabBarIcon: ({ color, focused }) => (
						<Ionicons
							color={color}
							name={focused ? 'stats-chart' : 'stats-chart-outline'}
							size={24}
						/>
					),
				}}
			/>
			<Tabs.Screen
				name="settings"
				options={{
					title: 'Settings',
					tabBarIcon: ({ color, focused }) => (
						<Ionicons
							color={color}
							name={focused ? 'settings' : 'settings-outline'}
							size={24}
						/>
					),
				}}
			/>
		</Tabs>
	)
}
