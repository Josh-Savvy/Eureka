import { RouteProp } from "@react-navigation/native";
import React, { SetStateAction } from "react";
import { StyleProp, TextStyle, ViewStyle } from "react-native";
import { TextInputProps } from "react-native";

export interface CustomInputPropsType extends TextInputProps {
	label?: string;
	labelStyle?: StyleProp<TextStyle>;
	containerStyle?: StyleProp<ViewStyle>;
	iconStyle?: StyleProp<ViewStyle>;
	leftIcon?: React.ReactNode;
	rightIcon?: React.ReactNode;
}
export interface CustomOTPInputProps {
	pinCount: number;
	countdownLimit?: number;
	navigation: any;
	placeholder?: string;
	route: RouteProp<Record<string, { phoneNumber: string }>, string>;
}
