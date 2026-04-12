import { Ionicons } from '@expo/vector-icons'
import { Tabs } from 'expo-router'

export default function TabLayout() {
	return (
		<Tabs
			screenOptions={{
				tabBarActiveTintColor: '#ffd33d',
				headerStyle: {
					backgroundColor: 'black',
				},
				headerShadowVisible: false,
				headerTintColor: '#fff',
				tabBarStyle: {
					backgroundColor: 'black',
				},
			}}
		>
			<Tabs.Screen
				name="index"
				options={{
					title: 'Home',
					tabBarIcon: ({ color, focused }) => (
						<Ionicons
							color={color}
							name={focused ? 'home-sharp' : 'home-outline'}
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
