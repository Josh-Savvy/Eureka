import { StatusBar } from "react-native";
import { RootSiblingParent } from "react-native-root-siblings";
import Navigation from "./src/navigation";
import { SafeAreaProvider } from "react-native-safe-area-context";
import React, { useEffect, useState } from "react";
import AuthContext from "./src/context/auth.context";
import ThemeContext from "./src/context/theme.context";
import * as SplashScreen from "expo-splash-screen";
import SplashScreenComponent from "./src/components/templates/SplashScreenComponent";

export default function App() {
	const [isLoggedIn, setIsLoggedIn] = React.useState<boolean>(false);
	const [theme, setTheme] = React.useState<"dark" | "light">("light");

	const [appIsReady, setAppIsReady] = useState<boolean>(false);
	const [showSplash, setShowSplash] = useState<boolean>(true);

	useEffect(() => {
		async function prepare() {
			try {
				await SplashScreen.hideAsync();
			} catch (e) {
				console.warn("App loading error:", e);
			} finally {
				setAppIsReady(true);
			}
		}
		prepare();
	}, []);

	useEffect(() => {
		if (appIsReady)
			setTimeout(() => {
				setShowSplash(false);
			}, 2500);
	}, [appIsReady]);

	return showSplash ? (
		<SplashScreenComponent />
	) : (
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
