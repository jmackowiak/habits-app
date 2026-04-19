import { Ionicons } from '@expo/vector-icons'
import { router } from 'expo-router'
import { useState } from 'react'
import {
	KeyboardAvoidingView,
	Platform,
	Pressable,
	StyleSheet,
	Text,
	TextInput,
	View,
} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useHabits } from '@/contexts/habits'
import { useAppTheme } from '@/hooks/useAppTheme'

export default function NewHabitScreen() {
	const { colors } = useAppTheme()
	const { top } = useSafeAreaInsets()
	const [name, setName] = useState('')
	const { dispatch } = useHabits()

	const isDisabled = name.trim() === ''

	function handleHabitAdd() {
		dispatch({ type: 'ADD_HABIT', payload: { name: name.trim() } })
		router.back()
	}

	return (
		<KeyboardAvoidingView
			behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
			style={[styles.container, { backgroundColor: colors.background }]}
		>
			<View>
				<View style={[styles.header, { paddingTop: top + 16 }]}>
					<Pressable
						onPress={() => router.back()}
						style={[styles.closeButton, { borderColor: colors.muted }]}
					>
						<Ionicons color={colors.muted} name="close" size={16} />
					</Pressable>
					<Text style={[styles.headerTitle, { color: colors.text }]}>
						Add Habit
					</Text>
					<View style={styles.headerSpacer} />
				</View>
				<View style={[styles.separator, { backgroundColor: colors.border }]} />
				<View style={styles.form}>
					<View
						style={[styles.inputContainer, { backgroundColor: colors.surface }]}
					>
						<View
							style={[styles.inputIcon, { backgroundColor: colors.active }]}
						>
							<Ionicons
								color={colors.background}
								name="star-outline"
								size={20}
							/>
						</View>
						<TextInput
							autoFocus
							onChangeText={setName}
							placeholder="Habit name"
							placeholderTextColor={colors.muted}
							style={[styles.input, { color: colors.text }]}
							value={name}
						/>
					</View>
				</View>
			</View>
			<Pressable
				disabled={isDisabled}
				onPress={handleHabitAdd}
				style={[
					styles.button,
					{
						backgroundColor: isDisabled ? colors.surface : colors.active,
					},
				]}
			>
				<Text
					style={[
						styles.buttonText,
						{
							color: isDisabled ? colors.muted : colors.background,
						},
					]}
				>
					Add
				</Text>
			</Pressable>
		</KeyboardAvoidingView>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'space-between',
		paddingHorizontal: 16,
	},
	header: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingBottom: 16,
	},
	closeButton: {
		width: 28,
		height: 28,
		borderRadius: 14,
		borderWidth: 2,
		justifyContent: 'center',
		alignItems: 'center',
	},
	headerTitle: {
		flex: 1,
		textAlign: 'center',
		fontSize: 17,
		fontWeight: '600',
	},
	headerSpacer: {
		width: 28,
	},
	separator: {
		height: 1,
		marginBottom: 16,
	},
	form: {
		gap: 12,
	},
	inputContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		borderRadius: 16,
		padding: 12,
		gap: 12,
	},
	inputIcon: {
		width: 40,
		height: 40,
		borderRadius: 12,
		justifyContent: 'center',
		alignItems: 'center',
	},
	input: {
		flex: 1,
		fontSize: 16,
	},
	button: {
		borderRadius: 16,
		paddingVertical: 16,
		marginBottom: 24,
	},
	buttonText: {
		textAlign: 'center',
		fontSize: 16,
		fontWeight: '600',
	},
})
