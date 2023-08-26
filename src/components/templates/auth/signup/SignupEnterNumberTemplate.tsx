import React from "react";
import { View, Text, Dimensions } from "react-native";
import tw from "twrnc";
import Icons from "../../../ui/atoms/icons";
import { curentTheme } from "../../../../constants/theme.constant";
import { PrimaryButton } from "../../../ui/atoms/buttons";
import ThemeContext from "../../../../context/theme.context";
import { CustomInput, CustomPhoneNumberInput } from "../../../ui/atoms/inputs";
import { CountryCode } from "react-native-country-picker-modal";

const SignupEnterNumberTemplate = ({ navigation }: { navigation: any }) => {
	const { theme } = React.useContext(ThemeContext);
	const [countryCode, setCountryCode] = React.useState<CountryCode>("US");
	const [phoneNumber, setPhoneNumber] = React.useState<string>("");

	const selectCountry = (country: any) => {
		setCountryCode(country.cca2);
	};
	return (
		<View
			style={[tw`mx-5`, { marginTop: Dimensions.get("window").height * 0.1 }]}
		>
			<View style={[tw`mt-20`]}>
				<Text style={tw`text-left tracking-tight font-bold text-3xl`}>
					My mobile
				</Text>
				<Text
					style={tw`text-left tracking-tight text-zinc-500 mt-2 text-lg leading-[1.2]`}
				>
					Please enter your valid phone number. We will send you a 4-digit code to
					verify your account.
				</Text>
			</View>
			{/* <CustomInput
				leftIcon={
					<View
						style={[tw`border-r border-zinc-300 py-2 px-4`, { flexDirection: "row" }]}
					>
						<Text style={[tw``]}>Hell</Text>
						<Text style={[tw`pl-3`]}>Hell</Text>
					</View>
				}
				style={[tw`flex-grow`, {}]}
				containerStyle={[tw`mt-5 rounded-lg`]}
			/> */}
			<CustomPhoneNumberInput
				countryCode={countryCode}
				setPhoneNumber={setPhoneNumber}
				selectCountry={selectCountry}
				containerStyle={[tw`my-6 border px-3 py-2 border-[#E8E6EA] rounded-xl`]}
			/>
			<PrimaryButton
				onPress={() => {
					navigation.navigate("Signup");
				}}
				buttonText="Continue"
				buttonContainerStyle={[
					tw`rounded-lg py-4`,
					{
						backgroundColor: curentTheme(theme).primary,
						padding: 40,
						marginTop: 30,
					},
				]}
				width={"100%"}
				buttonTextStyle={tw`text-lg tracking-tight font-semibold`}
			/>
		</View>
	);
};
export default SignupEnterNumberTemplate;
