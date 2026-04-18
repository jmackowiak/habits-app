import {
	createContext,
	type Dispatch,
	type ReactNode,
	useContext,
	useReducer,
} from 'react'
import type { Habit } from '@/types/habit'

type HabitsAction =
	| { type: 'ADD_HABIT'; payload: { name: string } }
	| { type: 'DELETE_HABIT'; payload: { id: string } }

type HabitsState = {
	habits: Habit[]
}

type HabitsContextType = {
	habits: Habit[]
	dispatch: Dispatch<HabitsAction>
}

function habitsReducer(state: HabitsState, action: HabitsAction) {
	switch (action.type) {
		case 'ADD_HABIT':
			return {
				...state,
				habits: [
					...state.habits,
					{
						id: Date.now().toString(),
						name: action.payload.name,
						createdAt: new Date().toISOString(),
					},
				],
			}
		case 'DELETE_HABIT':
			return {
				...state,
				habits: state.habits.filter((habit) => habit.id !== action.payload.id),
			}
	}
}

const HabitsContext = createContext<HabitsContextType | null>(null)

export function useHabits() {
	const context = useContext(HabitsContext)

	if (!context) throw new Error('useHabits must be used within HabitsProvider.')

	return context
}

export function HabitsProvider({ children }: { children: ReactNode }) {
	const [state, dispatch] = useReducer(habitsReducer, { habits: [] })

	return (
		<HabitsContext.Provider value={{ habits: state.habits, dispatch }}>
			{children}
		</HabitsContext.Provider>
	)
}
