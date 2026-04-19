import { Ionicons } from '@expo/vector-icons'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { useHabits } from '@/contexts/habits'
import { useAppTheme } from '@/hooks/useAppTheme'
import { getStreak } from '@/utils/habits'

export default function StatisticsScreen() {
	const { colors } = useAppTheme()
	const { habits } = useHabits()

	const today = new Date()
	const todayDate = today.toISOString().split('T')[0]

	const totalHabits = habits.length
	const completedToday = habits.filter((h) =>
		h.completedDates.includes(todayDate),
	).length
	const completionRate =
		totalHabits > 0 ? Math.round((completedToday / totalHabits) * 100) : 0

	return (
		<ScrollView
			contentContainerStyle={styles.content}
			style={[styles.container, { backgroundColor: colors.background }]}
		>
			<View style={[styles.card, { backgroundColor: colors.surface }]}>
				<Text style={[styles.cardTitle, { color: colors.textSecondary }]}>
					Today
				</Text>
				<Text style={[styles.bigNumber, { color: colors.text }]}>
					{completionRate}%
				</Text>
				<Text style={[styles.subtitle, { color: colors.textSecondary }]}>
					{completedToday} of {totalHabits} completed
				</Text>
				<View style={styles.progressBarBackground}>
					<View
						style={[
							styles.progressBarFill,
							{
								backgroundColor: colors.active,
								width: `${completionRate}%`,
							},
						]}
					/>
				</View>
			</View>

			<View style={styles.section}>
				<Text style={[styles.sectionTitle, { color: colors.textSecondary }]}>
					Streaks
				</Text>
				{habits.map((habit) => {
					const streak = getStreak(habit.completedDates)
					const isCompleted = habit.completedDates.includes(todayDate)
					return (
						<View
							key={habit.id}
							style={[styles.habitRow, { backgroundColor: colors.surface }]}
						>
							<View style={styles.habitInfo}>
								<View
									style={[
										styles.statusDot,
										{
											backgroundColor: isCompleted
												? colors.success
												: colors.muted,
										},
									]}
								/>
								<Text style={[styles.habitName, { color: colors.text }]}>
									{habit.name}
								</Text>
							</View>
							<View style={styles.streakBadge}>
								<Ionicons
									color={streak > 0 ? colors.active : colors.muted}
									name="flame"
									size={18}
								/>
								<Text
									style={[
										styles.streakNumber,
										{
											color: streak > 0 ? colors.active : colors.muted,
										},
									]}
								>
									{streak}
								</Text>
							</View>
						</View>
					)
				})}
			</View>

			<View style={styles.statsRow}>
				<View style={[styles.statCard, { backgroundColor: colors.surface }]}>
					<Ionicons color={colors.success} name="checkmark-circle" size={24} />
					<Text style={[styles.statNumber, { color: colors.text }]}>
						{habits.reduce((sum, h) => sum + h.completedDates.length, 0)}
					</Text>
					<Text style={[styles.statLabel, { color: colors.textSecondary }]}>
						Total done
					</Text>
				</View>
				<View style={[styles.statCard, { backgroundColor: colors.surface }]}>
					<Ionicons color={colors.active} name="flame" size={24} />
					<Text style={[styles.statNumber, { color: colors.text }]}>
						{habits.length > 0
							? Math.max(...habits.map((h) => getStreak(h.completedDates)))
							: 0}
					</Text>
					<Text style={[styles.statLabel, { color: colors.textSecondary }]}>
						Best streak
					</Text>
				</View>
			</View>
		</ScrollView>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	content: {
		padding: 16,
		gap: 20,
	},
	card: {
		borderRadius: 16,
		padding: 20,
		alignItems: 'center',
		gap: 8,
	},
	cardTitle: {
		fontSize: 14,
		fontWeight: '500',
		textTransform: 'uppercase',
		letterSpacing: 0.5,
	},
	bigNumber: {
		fontSize: 48,
		fontWeight: '700',
	},
	subtitle: {
		fontSize: 14,
	},
	progressBarBackground: {
		width: '100%',
		height: 6,
		borderRadius: 3,
		backgroundColor: 'rgba(255,255,255,0.1)',
		marginTop: 8,
		overflow: 'hidden',
	},
	progressBarFill: {
		height: '100%',
		borderRadius: 3,
	},
	section: {
		gap: 10,
	},
	sectionTitle: {
		fontSize: 14,
		fontWeight: '500',
		textTransform: 'uppercase',
		letterSpacing: 0.5,
	},
	habitRow: {
		flexDirection: 'row',
		alignItems: 'center',
		borderRadius: 16,
		padding: 16,
		gap: 12,
	},
	habitInfo: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		gap: 12,
		minWidth: 0,
	},
	statusDot: {
		width: 10,
		height: 10,
		borderRadius: 5,
	},
	habitName: {
		flexShrink: 1,
		fontSize: 16,
		fontWeight: '500',
	},
	streakBadge: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 4,
		flexShrink: 0,
	},
	streakNumber: {
		fontSize: 16,
		fontWeight: '700',
	},
	statsRow: {
		flexDirection: 'row',
		gap: 12,
	},
	statCard: {
		flex: 1,
		borderRadius: 16,
		padding: 16,
		alignItems: 'center',
		gap: 6,
	},
	statNumber: {
		fontSize: 24,
		fontWeight: '700',
	},
	statLabel: {
		fontSize: 12,
		textAlign: 'center',
	},
})
