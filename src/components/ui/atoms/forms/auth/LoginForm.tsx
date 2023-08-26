import React from "react";
import { Text, TextInput, View } from "react-native";
import tw from "twrnc";
import { PrimaryButton } from "../../common/buttons";
import AuthContext from "../../../../../context/auth.context";
import ThemeContext from "../../../../../context/theme.context";
import { curentTheme } from "../../../../../constants/theme.constant";
import { CustomInput } from "../../common/inputs";

const LoginForm = ({ navigation }: { navigation: any }) => {
	const { setIsLoggedIn } = React.useContext(AuthContext);
	const { theme } = React.useContext(ThemeContext);
	const [buttonText, setButtonText] = React.useState<string>("Login");
	return (
		<View style={[tw`flex gap-4 justify-center my-[10%] h-[65%] items-center`]}>
			<Text
				style={[
					tw`text-2xl uppercase text-center mt-10 font-semibold`,
					{
						color: curentTheme(theme).text,
					},
				]}
			>
				Login
			</Text>
			{/* <Text style={[tw`font-medium`, { alignSelf: "flex-start" }]}>LoginForm</Text> */}
			<CustomInput
				label="Email"
				keyboardType="email-address"
				placeholder="johndoe@email.com"
				placeholderTextColor="#999"
				autoFocus
			/>
			<CustomInput
				label="Password"
				keyboardType="email-address"
				placeholder="*******"
				secureTextEntry
				placeholderTextColor="#999"
			/>
			<View
				style={{
					flexDirection: "row",
					alignContent: "flex-start",
					justifyContent: "space-between",
					alignSelf: "flex-start",
				}}
			>
				<Text
					style={{
						color: curentTheme(theme).text,
					}}
				>
					Forgot Password?
				</Text>
				<Text
					style={{
						color: curentTheme(theme).text,
					}}
				>
					Forgot Password?
				</Text>
			</View>
			<PrimaryButton
				buttonText={buttonText}
				onPress={() => {
					console.log("Hello world");
					setButtonText("Please wait...");
					setTimeout(() => {
						setIsLoggedIn(true);
					}, 2000);
				}}
				className="w-[100%] h-[50px]"
			/>
		</View>
	);
};

export default LoginForm;
