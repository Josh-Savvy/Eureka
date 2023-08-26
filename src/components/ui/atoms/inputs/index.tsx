import React from "react";
import { Dimensions, Text, TextInput, View } from "react-native";
import { CustomInputPropsType } from "../../../../interfaces/inputs.type";
import tw from "twrnc";
import ThemeContext from "../../../../context/theme.context";
import { curentTheme } from "../../../../constants/theme.constant";
import PhoneInput, { ViewStyle } from "react-native-phone-input";
import CountryPicker, { CountryCode } from "react-native-country-picker-modal";
import ReactNativePhoneInput from "react-native-phone-input";

export const CustomInput = (props: CustomInputPropsType) => {
	const { theme } = React.useContext(ThemeContext);

	return (
		<View
			style={[
				tw`bg-transparent border w-[100%] border-zinc-400 rounded px-3 text-center py-2`,
				props.containerStyle,
				{ gap: 1 },
			]}
		>
			{props.label && (
				<Text
					style={[
						props.labelStyle,
						{ fontSize: 16, color: curentTheme(theme).text },
					]}
				>
					{props.label}
				</Text>
			)}
			<View
				style={[
					{
						display: "flex",
						flexDirection: "row",
						// justifyContent: "space-between",
						// alignContent: "center",
						alignItems: "center",
					},
				]}
			>
				{props.leftIcon && <View style={{}}>{props.leftIcon}</View>}
				<TextInput
					{...props}
					style={[
						tw`py-3`,
						{
							backgroundColor: "transparent",
							color: curentTheme(theme).text,
						},
						props.style,
					]}
				/>
				{props.rightIcon && <View style={{}}>{props.rightIcon}</View>}
			</View>
		</View>
	);
};

export const SearchInput = (props: CustomInputPropsType) => {
	return (
		<View
			style={[
				props.containerStyle,
				{
					display: "flex",
					flexDirection: "row",
					justifyContent: "space-between",
					alignContent: "center",
					alignItems: "center",
					borderColor: "#ccc",
				},
			]}
		>
			<TextInput {...props} />
			<View style={{}}>{props.rightIcon}</View>
		</View>
	);
};

export const CustomPhoneNumberInput = ({
	containerStyle,
	countryCode,
	setPhoneNumber,
	selectCountry,
	phoneNumber,
}: {
	containerStyle?: ViewStyle;
	countryCode: any;
	setPhoneNumber: any;
	selectCountry: any;
	phoneNumber: string;
}) => {
	const phoneRef = React.useRef<ReactNativePhoneInput>(null);

	return (
		<View
			style={[
				containerStyle,
				{
					display: "flex",
					flexDirection: "row",
					alignItems: "center",
					maxWidth: Dimensions.get("window").width,
				},
			]}
		>
			<CountryPicker
				onSelect={selectCountry}
				countryCode={countryCode}
				withFilter
				withFlag
				// preferredCountries={["NG"]}
			/>
			<Text style={[tw`px-1`]}>{countryCode}</Text>
			<PhoneInput
				style={[
					tw`border-l border-zinc-300 ml-3`,
					{ flexGrow: 1, width: 20, height: "100%" },
				]}
				ref={phoneRef}
				onPressFlag={() => {
					if (phoneRef.current) phoneRef.current.selectCountry(countryCode);
				}}
				onChangePhoneNumber={(number) => setPhoneNumber(number)}
				flagStyle={{ display: "none" }}
				initialValue={phoneNumber}
			/>
		</View>
	);
};
