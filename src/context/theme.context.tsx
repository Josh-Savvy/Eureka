import React from "react";
import { ColorValue } from "react-native";

export interface ITheme {
	dark: {
		background: ColorValue;
		text_primary: ColorValue;
	};
	light: {
		background: ColorValue;
		text_primary: ColorValue;
	};
}

export interface ThemeContextType {
	theme: "dark" | "light";
	setTheme: React.Dispatch<React.SetStateAction<"dark" | "light">>;
}

const ThemeContext = React.createContext<ThemeContextType>({
	theme: "light",
	setTheme: (): void => {},
});
export default ThemeContext;
