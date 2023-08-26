import React from "react";
import { Pressable, Text, View } from "react-native";
import { PrimaryButtonProps } from "../../../../../interfaces/button.type";
import tw from "twrnc";
import { TouchableOpacity } from "react-native";

export const PrimaryButton = (props: PrimaryButtonProps) => {
	return (
		<TouchableOpacity
			activeOpacity={0.5}
			{...props}
			style={[
				tw`bg-blue-500 flex items-center justify-center p-2 rounded ${
					props.className ? props.className : ""
				}`,
				props.buttonContainerStyle,
				{ width: props.width || "100%" },
			]}
		>
			<Text
				style={[tw`text-white font-medium text-[16px]`, props.buttonTextStyle]}
			>
				{props.buttonText}
			</Text>
		</TouchableOpacity>
	);
};
