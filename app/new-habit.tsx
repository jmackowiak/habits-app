import { useState } from 'react'
import { StyleSheet, Text, TextInput, View } from 'react-native'
import { useAppTheme } from '@/hooks/useAppTheme'

export default function NewHabitScreen() {
	const { colors } = useAppTheme()
	const [name, setName] = useState('')

	return (
		<View
			style={[
				styles.container,
				{ backgroundColor: colors.background, height: 20 },
			]}
		>
			<Text style={{ color: colors.text }}>Name:</Text>
			<TextInput onChangeText={setName} placeholder="Habit name" value={name} />
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 24,
		justifyContent: 'center',
		gap: 16,
	},
	title: { fontSize: 28, fontWeight: 700 },
	input: {
		borderWidth: 1,
		borderColor: '#D1D5DB',
		borderRadius: 12,
		paddingHorizontal: 16,
		paddingVertical: 14,
	},
	button: {},
})
