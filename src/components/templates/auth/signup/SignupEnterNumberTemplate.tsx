import React from "react";
import { View, Text, Dimensions } from "react-native";
import tw from "twrnc";
import { curentTheme } from "../../../../constants/theme.constant";
import { PrimaryButton } from "../../../ui/atoms/common/buttons";
import ThemeContext from "../../../../context/theme.context";
import { CountryCode } from "react-native-country-picker-modal";
import { isValidNumber } from "react-native-phone-number-input";
import { CustomPhoneNumberInput } from "../../../ui/atoms/common/inputs";

const SignupEnterNumberTemplate = ({ navigation }: { navigation: any }) => {
	const { theme } = React.useContext(ThemeContext);
	const [countryCode, setCountryCode] = React.useState<CountryCode>("US");
	const [phoneNumber, setPhoneNumber] = React.useState<string>("+2348111994693");
	const [error, setError] = React.useState<string>("");
	const [loading, setLoading] = React.useState<boolean>(false);

	const selectCountry = (country: any) => {
		setCountryCode(country.cca2);
	};
	const handleNavigate = () => {
		setLoading(true);
		if (isValidNumber(phoneNumber, countryCode)) {
			// Short delay before navigating
			setTimeout(() => {
				setLoading(false);
				navigation.navigate("SignupOtpScreen", { phoneNumber });
			}, 2000);
		} else if (phoneNumber.split("+")[1] === "") {
			setError("Please enter your phone number");
			setLoading(false);
			return;
		} else {
			setLoading(false);
			setError("Invalid phone number");
			return;
		}
	};

	React.useEffect(() => {
		if (error) {
			setError("");
		}
	}, [phoneNumber]);

	return (
		<View
			style={[tw`mx-5`, { marginTop: Dimensions.get("window").height * 0.1 }]}
		>
			<View style={[tw`mt-20`]}>
				<Text style={tw`text-left tracking-tight font-bold text-3xl`}>
					Phone Number
				</Text>
				<Text
					style={tw`text-left tracking-tight text-zinc-500 mt-2 text-lg leading-[1.2]`}
				>
					Please enter your valid phone number. We will send you a 4-digit code to
					verify your account.
				</Text>
			</View>
			<Text style={[tw`text-red-600 mt-5 mb-2 text-[4]`]}>{error}</Text>
			<CustomPhoneNumberInput
				countryCode={countryCode}
				setPhoneNumber={setPhoneNumber}
				selectCountry={selectCountry}
				phoneNumber={phoneNumber}
				containerStyle={[tw`mb-6 border px-3 py-2 border-[#E8E6EA] rounded-xl`]}
			/>
			<PrimaryButton
				onPress={handleNavigate}
				buttonText={loading ? "Please wait..." : "Continue"}
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
