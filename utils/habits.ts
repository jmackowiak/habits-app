export function getStreak(dates: string[]): number {
	const sortedDates = [...dates].sort().reverse()
	const oneDay = 86400000
	const today = new Date()
	const todayStr = today.toISOString().split('T')[0]
	const yesterdayStr = new Date(today.getTime() - oneDay)
		.toISOString()
		.split('T')[0]

	if (sortedDates[0] !== todayStr && sortedDates[0] !== yesterdayStr) return 0

	let streak = 1

	for (let i = 1; i < sortedDates.length; i++) {
		const diff =
			new Date(sortedDates[i - 1]).getTime() -
			new Date(sortedDates[i]).getTime()

		if (diff === oneDay) streak++
		else break
	}

	return streak
}
