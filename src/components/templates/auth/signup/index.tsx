import React from "react";
import { Dimensions, Text, View } from "react-native";
import Icons from "../../../ui/atoms/icons";
import tw from "twrnc";
import { PrimaryButton } from "../../../ui/atoms/buttons";
import { curentTheme } from "../../../../constants/theme.constant";
import ThemeContext from "../../../../context/theme.context";
import IonIcons from "@expo/vector-icons/Ionicons";
import { TouchableOpacity } from "react-native";

const SignupTemplate = ({ navigation }: { navigation: any }) => {
	const { theme } = React.useContext(ThemeContext);
	const SocialsSection = () => {
		return (
			<View style={[tw`mt-10`, {}]}>
				<View
					style={{
						display: "flex",
						flexDirection: "row",
						justifyContent: "space-between",
						alignItems: "center",
					}}
				>
					<View style={[tw`h-0.3 bg-zinc-400 w-1/3`]}></View>
					<Text style={[tw`font-medium`]}>or sign up with</Text>
					<View style={[tw`h-0.3 bg-zinc-400 w-1/3`]}></View>
				</View>
				<View style={[tw`items-center`]}>
					<View
						style={[
							tw`mt-6`,
							{
								flexDirection: "row",
								justifyContent: "space-between",
								alignItems: "center",
								gap: "30%",
							},
						]}
					>
						<TouchableOpacity style={[tw`border p-3.5 rounded-xl border-zinc-300`]}>
							<IonIcons
								color={curentTheme(theme).primary}
								name="logo-facebook"
								size={30}
							/>
						</TouchableOpacity>
						<TouchableOpacity style={[tw`border p-3.5 rounded-xl border-zinc-300`]}>
							<IonIcons
								color={curentTheme(theme).primary}
								name="logo-google"
								size={30}
							/>
						</TouchableOpacity>
						<TouchableOpacity style={[tw`border p-3.5 rounded-xl border-zinc-300`]}>
							<IonIcons
								color={curentTheme(theme).primary}
								name="logo-apple"
								size={30}
							/>
						</TouchableOpacity>
					</View>
				</View>
				<View style={[tw`items-center`]}>
					<View
						style={{
							flexDirection: "row",
							justifyContent: "space-between",
							alignItems: "center",
							gap: 30,
							top: 60,
						}}
					>
						<TouchableOpacity>
							<Text
								style={[
									tw`font-semibold text-[4] tracking-tight`,
									{ color: curentTheme(theme).primary },
								]}
							>
								Terms of use
							</Text>
						</TouchableOpacity>
						<TouchableOpacity>
							<Text
								style={[
									tw`font-semibold text-[4] tracking-tight`,
									{ color: curentTheme(theme).primary },
								]}
							>
								Privacy Policy
							</Text>
						</TouchableOpacity>
					</View>
				</View>
			</View>
		);
	};
	return (
		<View
			style={[tw`mx-5`, { marginTop: Dimensions.get("window").height * 0.15 }]}
		>
			<View style={[tw`items-center`]}>
				<Icons.MainLogo />
			</View>
			<View style={[tw`mt-20`]}>
				<Text style={tw`text-center font-semibold text-xl`}>
					Sign up to continue
				</Text>
				<PrimaryButton
					onPress={() => {
						// navigation.navigate("Signup");
					}}
					buttonText="Continue with email"
					buttonContainerStyle={[
						tw`rounded-lg py-4`,
						{
							backgroundColor: curentTheme(theme).primary,
							padding: 40,
							marginTop: 30,
						},
					]}
					width={"100%"}
					buttonTextStyle={tw`text-lg tracking-tight`}
				/>
				<PrimaryButton
					onPress={() => {
						navigation.navigate("SignupEnterNumberScreen");
					}}
					buttonText="Use phone number"
					buttonContainerStyle={[
						tw`rounded-lg py-4 border border-zinc-200`,
						{
							backgroundColor: "transparent",
							padding: 40,
							marginTop: 10,
						},
					]}
					width={"100%"}
					buttonTextStyle={[
						tw`text-lg tracking-tight`,
						{ color: curentTheme(theme).primary },
					]}
				/>
				<SocialsSection />
			</View>
		</View>
	);
};

export default SignupTemplate;
