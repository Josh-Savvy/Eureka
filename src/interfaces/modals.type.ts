import { GestureResponderEvent } from "react-native";
import { ViewStyle } from "react-native-phone-input";

export interface CustomModalProps {
	header?: string;
	hideHeader?: boolean;
	hideScroll?: boolean;
	closeModal: any;
	acceptBtnStyle?: ViewStyle;
	next: any;
	back?: any;
	modalIsOpen: boolean;
	children?: any;
	subheader?: string;
	italicSubheader?: boolean;
	acceptText?: string;
	cancelText?: string;
	cancelBtnWidth?: number | string;
	acceptBtnWidth?: number | string;
	hideCancelButton?: boolean;
	hideAcceptButton?: boolean;
	disableCancelBtn?: boolean;
	disableAcceptBtn?: boolean;
	height?: number | "10%" | "40%" | "50%" | "90%";
}
