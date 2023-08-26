import React, { useRef } from "react";
import { Dimensions, Text, TextInput, View } from "react-native";
import tw from "twrnc";
import PhoneInput, { ViewStyle } from "react-native-phone-input";
import CountryPicker, { Flag } from "react-native-country-picker-modal";
import ReactNativePhoneInput from "react-native-phone-input";
import DatePicker, {
	DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { curentTheme } from "../../../../../constants/theme.constant";
import ThemeContext from "../../../../../context/theme.context";
import { CustomInputPropsType } from "../../../../../interfaces/inputs.type";

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

export const CustomInputTwo = (props: CustomInputPropsType) => {
	const { theme } = React.useContext(ThemeContext);

	return (
		<View
			style={[
				tw`bg-transparent border w-[100%] border-zinc-400 rounded px-3 text-center py-2`,
				props.containerStyle,
			]}
		>
			<Text
				style={[
					props.labelStyle,
					{
						fontSize: 16,
						color: curentTheme(theme).text,
						position: "absolute",
						// top: isFocused ? -15 : 12,
						top: -15,
						left: 20,
						backgroundColor: curentTheme(theme).background,
						padding: 10,
					},
				]}
			>
				{props.label}
			</Text>
			<View
				style={[tw`flex-grow`, { flexDirection: "row", alignItems: "center" }]}
			>
				<TextInput
					{...props}
					// onFocus={handleFocus}
					// onBlur={handleBlur}
					style={[
						tw`py-3 px-3 text-[4.5] flex-grow font-semibold`,
						{
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
	disabled = false,
	gapBtwnFlagAndInput = 15,
}: {
	containerStyle?: ViewStyle;
	countryCode?: any;
	setPhoneNumber?: any;
	selectCountry?: any;
	phoneNumber: string;
	disabled?: boolean;
	gapBtwnFlagAndInput?: number;
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
			{!disabled ? (
				<CountryPicker
					onSelect={selectCountry}
					countryCode={countryCode}
					withFilter
					withFlag
					// preferredCountries={["NG"]}
				/>
			) : (
				<View style={[tw`items-center`]}>
					<Flag countryCode={countryCode} flagSize={30} />
				</View>
			)}
			{!disabled && <Text style={[tw`px-1`]}>{countryCode}</Text>}
			<PhoneInput
				style={[
					tw`border-l border-zinc-300`,
					{
						flexGrow: 1,
						width: 20,
						height: "100%",
						marginLeft: gapBtwnFlagAndInput,
					},
				]}
				ref={phoneRef}
				onPressFlag={() => {
					if (phoneRef.current) phoneRef.current.selectCountry(countryCode);
				}}
				disabled={disabled}
				onChangePhoneNumber={(number) => setPhoneNumber(number)}
				flagStyle={{ display: "none" }}
				initialValue={phoneNumber}
			/>
		</View>
	);
};
export const CustomDatePicker = (props: {
	dateTitle: string;
	chosenDate: Date;
	setChosenDate: React.Dispatch<React.SetStateAction<Date>>;
}) => {
	const { dateTitle, setChosenDate, chosenDate } = props;

	const handleDateChange = (e: DateTimePickerEvent, date?: Date) => {
		if (date) setChosenDate(date);
		// console.log(date);
		// console.log({ event: e });
	};
	const datePickerRef = useRef(null);
	return (
		<View style={[tw``]}>
			<Text style={[tw``]}>Custom Date Chooser</Text>
			<DatePicker
				// ref={datePickerRef}
				// date={chosenDate}
				onChange={handleDateChange}
				mode="date"
				style={[tw`absolute top-0 left-0 rounded-2xl w-full bg-blue-500`]}
				value={chosenDate}
				maximumDate={new Date()}
			/>
			{/* <Text style={[tw``]}>
				Selected Date: {new Date(chosenDate).toLocaleString()}
			</Text> */}
		</View>
	);
};
