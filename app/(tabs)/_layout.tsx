import { colors } from '@/constants/colors'
import { Ionicons } from '@expo/vector-icons'
import { Tabs } from 'expo-router'
import { useColorScheme } from 'react-native'

export default function TabLayout() {
	const scheme = useColorScheme() ?? 'light'
	const theme = colors[scheme]

	return (
		<Tabs
			screenOptions={{
				tabBarActiveTintColor: theme.active,
				headerStyle: {
					backgroundColor: theme.background,
				},
				headerShadowVisible: false,
				headerTintColor: theme.text,
				tabBarStyle: {
					backgroundColor: theme.background,
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
