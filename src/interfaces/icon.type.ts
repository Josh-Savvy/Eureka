import { StyleProp, ViewProps } from "react-native";
import { SvgProps } from "react-native-svg";

export interface IconProps extends SvgProps {
	height?: string | number;
	width?: string | number;
	color?: string;
	style?: StyleProp<ViewProps>;
}
