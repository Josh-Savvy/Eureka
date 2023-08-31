import { StatusBar } from "react-native";
import { RootSiblingParent } from "react-native-root-siblings";
import Navigation from "./src/navigation";
import { SafeAreaProvider } from "react-native-safe-area-context";
import React, { useEffect, useState } from "react";
import AuthContext from "./src/context/auth.context";
import ThemeContext from "./src/context/theme.context";
import * as SplashScreen from "expo-splash-screen";
import SplashScreenComponent from "./src/components/templates/SplashScreenComponent";
import AsyncStorage from "@react-native-async-storage/async-storage";
import UserContext from "./src/context/user.context";
import { UserType } from "./src/interfaces/data/user.type";

export default function App() {
	const [isLoggedIn, setIsLoggedIn] = React.useState<boolean>(false);
	const [theme, setTheme] = React.useState<"dark" | "light">("light");
	const [user, setUser] = useState<UserType | null>(null);
	const [appIsReady, setAppIsReady] = useState<boolean>(false);
	const [showSplash, setShowSplash] = useState<boolean>(true);

	useEffect(() => {
		AsyncStorage.getItem("currentUser")
			.then((user) => {
				if (user) {
					setUser(JSON.parse(user));
				} else {
					console.log("User not found");
					setUser(null);
				}
			})
			.catch((err) => {
				console.log("Error getting user from local storage: ", err);
				setUser(null);
			});
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
					<UserContext.Provider value={{ user, setUser }}>
						<StatusBar
							barStyle={theme === "dark" ? "light-content" : "dark-content"}
						/>
						<SafeAreaProvider>
							<Navigation />
						</SafeAreaProvider>
					</UserContext.Provider>
				</AuthContext.Provider>
			</ThemeContext.Provider>
		</RootSiblingParent>
	);
}
