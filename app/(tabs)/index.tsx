import { useAppTheme } from '@/hooks/useAppTheme'
import { Text, View } from 'react-native'

export default function Index() {
	const { colors } = useAppTheme()

	return (
		<View
			style={{
				flex: 1,
				justifyContent: 'center',
				alignItems: 'center',
				backgroundColor: colors.background,
			}}
		>
			<Text style={{ color: colors.text }}>
				Edit app/index.tsx to edit this screen.
			</Text>
		</View>
	)
}
