import { Ionicons } from '@expo/vector-icons'
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import { router, Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { Pressable } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

export default function RootLayout() {
	return (
		<GestureHandlerRootView>
			<BottomSheetModalProvider>
				<Stack>
					<Stack.Screen name="(tabs)" options={{ headerShown: false }} />
					<Stack.Screen
						name="new-habit"
						options={{
							presentation: 'modal',
							title: 'Add Habit',
							headerLeft: () => (
								<Pressable onPress={() => router.back()}>
									<Ionicons color="black" name="close-outline" size={24} />
								</Pressable>
							),
							contentStyle: { height: 20 },
						}}
					/>
				</Stack>
				<StatusBar style="auto" />
			</BottomSheetModalProvider>
		</GestureHandlerRootView>
	)
}
