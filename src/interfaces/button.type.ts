import {
	Falsy,
	RecursiveArray,
	RegisteredStyle,
	StyleProp,
	TextStyle,
	TouchableOpacityProps,
	ViewStyle,
} from "react-native";
import { PressableProps } from "react-native";

export interface PrimaryButtonProps extends TouchableOpacityProps {
	buttonContainerStyle?:
		| Falsy
		| ViewStyle
		| RegisteredStyle<ViewStyle>
		| RecursiveArray<Falsy | ViewStyle | RegisteredStyle<ViewStyle>>
		| readonly (Falsy | ViewStyle | RegisteredStyle<ViewStyle>)[];
	buttonText: string;
	className?: string;
	buttonTextStyle?: StyleProp<TextStyle>;
	width?: string | number;
}
