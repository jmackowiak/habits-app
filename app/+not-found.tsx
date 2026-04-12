import { Link, Stack } from 'expo-router'
import { StyleSheet, View } from 'react-native'
import { useAppTheme } from '@/hooks/useAppTheme'

export default function NotFoundScreen() {
	const { colors } = useAppTheme()

	return (
		<>
			<Stack.Screen options={{ title: 'Oops! Not Found' }}></Stack.Screen>
			<View style={[styles.container, { backgroundColor: colors.background }]}>
				<Link href="/" style={[styles.button, { color: colors.text }]}>
					Go back to Home Screen!
				</Link>
			</View>
		</>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	button: {
		fontSize: 20,
		textDecorationLine: 'underline',
	},
})
