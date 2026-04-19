import { Ionicons } from '@expo/vector-icons'
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import { accentColors } from '@/constants/colors'
import { type ThemeMode, useTheme } from '@/contexts/theme'
import { useAppTheme } from '@/hooks/useAppTheme'

const themeModes: { label: string; value: ThemeMode }[] = [
	{ label: 'System', value: 'system' },
	{ label: 'Light', value: 'light' },
	{ label: 'Dark', value: 'dark' },
]

export default function SettingsScreen() {
	const { colors } = useAppTheme()
	const { themeMode, setThemeMode, accentColor, setAccentColor } = useTheme()

	return (
		<ScrollView
			contentContainerStyle={styles.content}
			style={[styles.container, { backgroundColor: colors.background }]}
		>
			<View style={styles.section}>
				<Text style={[styles.sectionTitle, { color: colors.textSecondary }]}>
					Theme
				</Text>
				<View style={styles.themeModes}>
					{themeModes.map((mode) => {
						const isActive = themeMode === mode.value
						return (
							<Pressable
								key={mode.value}
								onPress={() => setThemeMode(mode.value)}
								style={[
									styles.themeButton,
									{
										backgroundColor: colors.surface,
										borderColor: isActive ? colors.active : colors.surface,
									},
								]}
							>
								<Text
									style={[
										styles.themeButtonText,
										{
											color: isActive ? colors.active : colors.text,
										},
									]}
								>
									{mode.label}
								</Text>
							</Pressable>
						)
					})}
				</View>
			</View>

			<View style={styles.section}>
				<Text style={[styles.sectionTitle, { color: colors.textSecondary }]}>
					Accent color
				</Text>
				<View style={styles.colorGrid}>
					{accentColors.map((color) => {
						const isActive = accentColor === color.value
						return (
							<View key={color.value} style={styles.colorItem}>
								<Pressable
									onPress={() => setAccentColor(color.value)}
									style={[
										styles.colorCircle,
										{ backgroundColor: color.value },
									]}
								>
									{isActive && (
										<Ionicons
											color="#FFF"
											name="checkmark"
											size={20}
										/>
									)}
								</Pressable>
							</View>
						)
					})}
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
		gap: 32,
	},
	section: {
		gap: 12,
	},
	sectionTitle: {
		fontSize: 14,
		fontWeight: '500',
		textTransform: 'uppercase',
		letterSpacing: 0.5,
	},
	themeModes: {
		flexDirection: 'row',
		gap: 10,
	},
	themeButton: {
		flex: 1,
		paddingVertical: 14,
		borderRadius: 16,
		borderWidth: 2,
		alignItems: 'center',
	},
	themeButtonText: {
		fontSize: 15,
		fontWeight: '600',
	},
	colorGrid: {
		flexDirection: 'row',
		flexWrap: 'wrap',
	},
	colorItem: {
		width: '14.28%',
		alignItems: 'center',
		marginBottom: 14,
	},
	colorCircle: {
		width: 44,
		height: 44,
		borderRadius: 22,
		justifyContent: 'center',
		alignItems: 'center',
	},
})
