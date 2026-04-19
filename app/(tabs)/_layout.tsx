import { Ionicons } from '@expo/vector-icons'
import { router, Tabs } from 'expo-router'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { useAppTheme } from '@/hooks/useAppTheme'

export default function TabLayout() {
	const { colors } = useAppTheme()

	const formattedDate = new Date().toLocaleDateString('pl-PL', {
		weekday: 'long',
		day: 'numeric',
		month: 'long',
	})

	return (
		<Tabs
			screenOptions={{
				tabBarActiveTintColor: colors.active,
				headerStyle: {
					backgroundColor: colors.background,
					height: 120,
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
					headerTitle: () => (
						<View style={styles.headerTitleContainer}>
							<Text style={[styles.headerTitle, { color: colors.text }]}>
								Today
							</Text>
							<Text
								style={[styles.headerSubtitle, { color: colors.textSecondary }]}
							>
								{formattedDate}
							</Text>
						</View>
					),
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
							style={[styles.addButton, { borderColor: colors.active }]}
						>
							<Ionicons color={colors.active} name="add" size={18} />
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

const styles = StyleSheet.create({
	headerTitleContainer: {
		gap: 8,
	},
	headerTitle: {
		fontSize: 17,
		fontWeight: '600',
		textAlign: 'center',
	},
	headerSubtitle: {
		fontSize: 13,
		textAlign: 'center',
	},
	addButton: {
		width: 28,
		height: 28,
		borderRadius: 14,
		borderWidth: 2,
		justifyContent: 'center',
		alignItems: 'center',
		marginRight: 30,
	},
})
