import { StyleSheet, Text, View } from 'react-native'
import { useAppTheme } from '@/hooks/useAppTheme'

export default function SettingsScreen() {
	const { colors } = useAppTheme()

	return (
		<View style={[styles.container, { backgroundColor: colors.background }]}>
			<Text style={{ color: colors.text }}>Settings</Text>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
})
