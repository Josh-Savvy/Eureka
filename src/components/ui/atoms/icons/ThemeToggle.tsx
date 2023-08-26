import React from "react";
import { View, Text, Switch } from "react-native";
import ThemeContext from "../../../../context/theme.context";

export default function ThemeToggle() {
	const { theme, setTheme } = React.useContext(ThemeContext);
	const handleThemeToggle = () => {
		if (theme === "dark") setTheme("light");
		else {
			setTheme("dark");
		}
	};
	return (
		<Switch
			value={theme === "dark"}
			onValueChange={handleThemeToggle}
			trackColor={{
				false: "#ccc",
				true: "#555",
			}}
			thumbColor={theme === "dark" ? "#fff" : "#fff"}
			style={{ alignSelf: "flex-end" }}
		/>
	);
}
