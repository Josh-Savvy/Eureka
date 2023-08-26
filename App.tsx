import { StatusBar } from "react-native";

import { RootSiblingParent } from "react-native-root-siblings";
import Navigation from "./src/navigation";
import { SafeAreaProvider } from "react-native-safe-area-context";
import React, { SetStateAction } from "react";
import AuthContext from "./src/context/auth.context";
import ThemeContext from "./src/context/theme.context";
import * as SplashScreen from "expo-splash-screen";

export default function App() {
	const [isLoggedIn, setIsLoggedIn] = React.useState<boolean>(false);
	const [theme, setTheme] = React.useState<"dark" | "light">("light");
	// SplashScreen
	return (
		<RootSiblingParent>
			<ThemeContext.Provider
				value={{
					theme,
					setTheme,
				}}
			>
				<AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
					<StatusBar
						barStyle={theme === "dark" ? "light-content" : "dark-content"}
					/>
					<SafeAreaProvider>
						<Navigation />
					</SafeAreaProvider>
				</AuthContext.Provider>
			</ThemeContext.Provider>
		</RootSiblingParent>
	);
}
