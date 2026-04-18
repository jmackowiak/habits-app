import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native'
import { useHabits } from '@/contexts/habits'
import { useAppTheme } from '@/hooks/useAppTheme'

export default function Index() {
	const { colors } = useAppTheme()
	const { habits, dispatch } = useHabits()

	const todayDate = new Date().toISOString().split('T')[0]

	function handleHabitToggle(id: string) {
		dispatch({
			type: 'TOGGLE_HABIT',
			payload: { id, date: todayDate },
		})
	}

	return (
		<>
			<View
				style={[styles.dateContainer, { backgroundColor: colors.background }]}
			>
				<Text style={{ color: colors.text }}>
					{new Date().toLocaleDateString('pl-PL', {
						weekday: 'long',
						day: 'numeric',
						month: 'long',
					})}
				</Text>
			</View>
			<View
				style={[
					styles.habitsContainer,
					{
						backgroundColor: colors.background,
					},
				]}
			>
				<FlatList
					data={habits}
					keyExtractor={(habit) => habit.id}
					renderItem={({ item }) => (
						<Pressable onPress={() => handleHabitToggle(item.id)}>
							<Text style={{ color: colors.text }}>
								{item.completedDates.includes(todayDate) ? '✅' : '⬜'}{' '}
								{item.name}
							</Text>
						</Pressable>
					)}
				/>
			</View>
		</>
	)
}

const styles = StyleSheet.create({
	dateContainer: {
		alignItems: 'center',
		paddingTop: 6,
	},
	habitsContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		paddingTop: 24,
	},
})
