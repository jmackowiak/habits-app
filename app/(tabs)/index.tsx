import { Ionicons } from '@expo/vector-icons'
import { useMemo } from 'react'
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import ReanimatedSwipeable from 'react-native-gesture-handler/ReanimatedSwipeable'
import Animated, { FadeOut, LinearTransition } from 'react-native-reanimated'
import { useHabits } from '@/contexts/habits'
import { useAppTheme } from '@/hooks/useAppTheme'
import { useTodayDate } from '@/hooks/useTodayDate'

export default function Index() {
	const { colors } = useAppTheme()
	const { habits, dispatch } = useHabits()
	const todayDate = useTodayDate()

	const sortedHabits = useMemo(() => {
		return [...habits].sort((a, b) => {
			const aCompleted = a.completedDates.includes(todayDate)
			const bCompleted = b.completedDates.includes(todayDate)

			if (aCompleted === bCompleted) return 0

			return aCompleted ? 1 : -1
		})
	}, [habits, todayDate])

	function handleHabitToggle(id: string) {
		dispatch({
			type: 'TOGGLE_HABIT',
			payload: { id, date: todayDate },
		})
	}

	function handleHabitDelete(id: string) {
		dispatch({
			type: 'DELETE_HABIT',
			payload: { id },
		})
	}

	function renderRightActions(id: string) {
		return (
			<Pressable
				onPress={() => handleHabitDelete(id)}
				style={[styles.deleteButton, { backgroundColor: colors.danger }]}
			>
				<Ionicons color="#FFF" name="trash-outline" size={22} />
			</Pressable>
		)
	}

	return (
		<View style={[styles.container, { backgroundColor: colors.background }]}>
			<View style={[styles.separator, { backgroundColor: colors.border }]} />
			<ScrollView contentContainerStyle={styles.list}>
				{sortedHabits.map((item) => {
					const isCompleted = item.completedDates.includes(todayDate)

					return (
						<Animated.View
							exiting={FadeOut.duration(200)}
							key={item.id}
							layout={LinearTransition.duration(300)}
						>
							<ReanimatedSwipeable
								renderRightActions={() => renderRightActions(item.id)}
							>
								<Pressable
									onPress={() => handleHabitToggle(item.id)}
									style={[
										styles.card,
										{
											backgroundColor: colors.surface,
											opacity: isCompleted ? 0.5 : 1,
										},
									]}
								>
									<View
										style={[
											styles.iconContainer,
											{ backgroundColor: colors.active },
										]}
									>
										<Ionicons
											color={colors.background}
											name="star-outline"
											size={24}
										/>
									</View>
									<View style={styles.cardContent}>
										<Text
											style={[
												styles.habitName,
												{
													color: colors.text,
													textDecorationLine: isCompleted
														? 'line-through'
														: 'none',
												},
											]}
										>
											{item.name}
										</Text>
									</View>
									<View
										style={[
											styles.checkbox,
											{
												backgroundColor: isCompleted
													? colors.success
													: 'transparent',
												borderColor: isCompleted
													? colors.success
													: colors.muted,
											},
										]}
									>
										{isCompleted && (
											<Ionicons color="#FFF" name="checkmark" size={16} />
										)}
									</View>
								</Pressable>
							</ReanimatedSwipeable>
						</Animated.View>
					)
				})}
			</ScrollView>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: 6,
	},
	separator: {
		height: 1,
		marginHorizontal: 16,
	},
	list: {
		paddingHorizontal: 16,
		gap: 10,
		marginTop: 16,
		paddingBottom: 16,
	},
	card: {
		borderRadius: 16,
		padding: 16,
		flexDirection: 'row',
		alignItems: 'center',
		gap: 12,
	},
	iconContainer: {
		width: 44,
		height: 44,
		borderRadius: 12,
		justifyContent: 'center',
		alignItems: 'center',
	},
	cardContent: {
		flex: 1,
	},
	habitName: {
		fontSize: 16,
		fontWeight: '600',
	},
	checkbox: {
		width: 28,
		height: 28,
		borderRadius: 14,
		borderWidth: 2,
		justifyContent: 'center',
		alignItems: 'center',
	},
	deleteButton: {
		justifyContent: 'center',
		alignItems: 'center',
		paddingHorizontal: 24,
		borderRadius: 16,
		marginLeft: 8,
	},
})
