import { useFocusEffect } from 'expo-router'
import { useCallback, useEffect, useState } from 'react'
import { AppState } from 'react-native'

function getTodayDate() {
	return new Date().toISOString().split('T')[0]
}

export function useTodayDate() {
	const [todayDate, setTodayDate] = useState(getTodayDate())

	useFocusEffect(
		useCallback(() => {
			setTodayDate(getTodayDate())
		}, []),
	)

	useEffect(() => {
		const subscription = AppState.addEventListener('change', (nextState) => {
			if (nextState === 'active') {
				setTodayDate(getTodayDate())
			}
		})

		return () => subscription.remove()
	}, [])

	return todayDate
}
