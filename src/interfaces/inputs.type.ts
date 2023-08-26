import React from "react";
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
