import { FlatList, StyleSheet, Text, View } from 'react-native'
import { useHabits } from '@/contexts/habits'
import { useAppTheme } from '@/hooks/useAppTheme'

export default function Index() {
	const { colors } = useAppTheme()
	const { habits } = useHabits()

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
						<Text style={{ color: colors.text }}>{item.name}</Text>
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
