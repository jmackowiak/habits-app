import { router } from 'expo-router'
import { useState } from 'react'
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import { useHabits } from '@/contexts/habits'
import { useAppTheme } from '@/hooks/useAppTheme'

export default function NewHabitScreen() {
	const { colors } = useAppTheme()
	const [name, setName] = useState('')
	const { dispatch } = useHabits()

	const isDisabled = !!(name === '' || name === ' ')

	function handleHabitAdd() {
		dispatch({ type: 'ADD_HABIT', payload: { name } })
		router.back()
	}

	return (
		<View
			style={[
				styles.container,
				{ backgroundColor: colors.background, height: 20 },
			]}
		>
			<View>
				<TextInput
					onChangeText={setName}
					placeholder="Name"
					style={[styles.input, { color: colors.text }]}
					value={name}
				/>
			</View>
			<Pressable
				disabled={isDisabled}
				onPress={() => handleHabitAdd()}
				style={[
					styles.button,
					{ backgroundColor: !isDisabled ? colors.active : colors.muted },
				]}
			>
				<Text
					style={[
						styles.buttonText,
						{ color: !isDisabled ? colors.background : colors.text },
					]}
				>
					Add
				</Text>
			</Pressable>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 24,
		gap: 16,
		justifyContent: 'space-between',
	},
	title: { fontSize: 28, fontWeight: 700 },
	input: {
		borderWidth: 1,
		borderColor: '#D1D5DB',
		borderRadius: 12,
		paddingHorizontal: 16,
		paddingVertical: 14,
		height: 48,
	},
	button: {
		borderRadius: 12,
		paddingHorizontal: 16,
		paddingVertical: 14,
		bottom: 0,
		marginBottom: 48,
		height: 48,
		justifyContent: 'center',
	},
	buttonText: {
		textAlign: 'center',
	},
})
