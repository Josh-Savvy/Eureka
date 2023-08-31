import React, { useContext } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import tw from "twrnc";
import ThemeContext from "../../../context/theme.context";
import { curentTheme } from "../../../constants/theme.constant";
import IonIcons from "@expo/vector-icons/Ionicons";
import AuthContext from "../../../context/auth.context";

const InnerScreen = ({
	children,
	screenTitle,
	leftIcon,
	rightIcon,
	navigation,
	hideBackIcon = false,
	back,
}: {
	children: any;
	screenTitle?: string;
	navigation: any;
	leftIcon?: React.ReactNode;
	rightIcon?: React.ReactNode;
	hideBackIcon?: boolean;
	back?: any;
}) => {
	const { theme } = useContext(ThemeContext);
	const { isLoggedIn } = React.useContext(AuthContext);

	return (
		<View
			style={[
				tw`pt-20 px-5 relative`,
				{ flex: 1, backgroundColor: curentTheme(theme).background },
			]}
		>
			<View
				style={[
					{
						flexDirection: "row",
						justifyContent: "space-between",
						alignItems: "center",
					},
				]}
			>
				{!hideBackIcon ? (
					// {!hideBackIcon && (
					<View style={[]}>
						<TouchableOpacity
							style={[
								tw`bg-white rounded-xl shadow shadow-lg border-zinc-300 p-2 px-3 items-center`,
							]}
							onPress={
								back
									? back
									: () => {
											navigation.goBack();
									  }
							}
						>
							<IonIcons
								size={30}
								name="chevron-back-sharp"
								color={curentTheme(theme).primary}
							/>
						</TouchableOpacity>
					</View>
				) : (
					<></>
				)}
				<Text>{screenTitle ? screenTitle : ""}</Text>
				<Text>{rightIcon ? rightIcon : ""}</Text>
			</View>
			{/* <Sidebar /> */}
			<View>{children}</View>
		</View>
	);
};

export default InnerScreen;
