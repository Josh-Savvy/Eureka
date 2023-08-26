import * as Colors from "./Colors";

export const darkTheme = Colors.default.dark;

export const lightTheme = Colors.default.light;

export const curentTheme = (theme: "dark" | "light") => {
	return theme === "dark" ? darkTheme : lightTheme;
};
