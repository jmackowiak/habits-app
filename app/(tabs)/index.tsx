import { StyleSheet, Text, View } from 'react-native'
import { useAppTheme } from '@/hooks/useAppTheme'

export default function Index() {
	const { colors } = useAppTheme()

	const formattedDate = new Date().toLocaleDateString('pl-PL', {
		weekday: 'long',
		day: 'numeric',
		month: 'long',
	})

	return (
		<>
			<View
				style={[styles.dateContainer, { backgroundColor: colors.background }]}
			>
				<Text style={{ color: colors.text }}>{formattedDate}</Text>
			</View>
			<View
				style={{
					flex: 1,
					justifyContent: 'center',
					alignItems: 'center',
					backgroundColor: colors.background,
				}}
			></View>
		</>
	)
}

const styles = StyleSheet.create({
	dateContainer: {
		alignItems: 'center',
		paddingTop: 6,
	},
})
