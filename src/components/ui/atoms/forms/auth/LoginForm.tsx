import React, { ChangeEventHandler, useState } from "react";
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
	const [state, setState] = useState<{ email: string; password: string }>({
		email: "",
		password: "",
	});
	const [loading, setLoading] = React.useState<boolean>(false);
	const handleChange = (name: keyof typeof state) => (text: string) => {
		setState({ ...state, [name]: text });
	};
	const handleLogin = () => {
		setLoading(true);
		try {
			if (state.email)
				if (state.password) {
					setTimeout(() => {
						setIsLoggedIn(true);
					}, 2000);
					console.log("Hello world");
				}
		} catch (error) {
			console.log(error);
			setLoading(false);
		}
	};

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
				containerStyle={[tw`rounded-[5]`]}
				label="Email"
				keyboardType="email-address"
				placeholder="johndoe@email.com"
				placeholderTextColor="#999"
				autoFocus
				onChangeText={handleChange("email")}
				value={state.email}
			/>
			<CustomInput
				containerStyle={[tw`rounded-[5]`]}
				label="Password"
				keyboardType="email-address"
				placeholder="*******"
				secureTextEntry
				placeholderTextColor="#999"
				onChangeText={handleChange("password")}
				value={state.password}
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
				buttonText={loading ? "Please wait..." : "Login"}
				onPress={handleLogin}
				className="w-[100%] h-[50px]"
				buttonContainerStyle={[
					tw`rounded-xl`,
					{ backgroundColor: curentTheme(theme).primary },
				]}
			/>
		</View>
	);
};

export default LoginForm;
