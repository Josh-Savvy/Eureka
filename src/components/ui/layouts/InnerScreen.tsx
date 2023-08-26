import React, { useContext, useEffect, useRef } from "react";
import {
	Animated,
	Pressable,
	SafeAreaView,
	Switch,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import tw from "twrnc";
import ThemeContext from "../../../context/theme.context";
import { curentTheme } from "../../../constants/theme.constant";
import * as Icons from "../atoms/icons";
import AuthContext from "../../../context/auth.context";

const InnerScreen = ({
	children,
	screenTitle,
	leftIcon,
	rightIcon,
	navigation,
}: {
	children: any;
	screenTitle?: string;
	navigation: any;
	leftIcon?: React.ReactNode;
	rightIcon?: React.ReactNode;
}) => {
	const { theme } = useContext(ThemeContext);
	const { isLoggedIn } = React.useContext(AuthContext);

	return (
		<View
			style={[
				tw`pt-13 px-4 relative`,
				{ flex: 1, backgroundColor: curentTheme(theme).background },
			]}
		>
			{/* <Sidebar /> */}
			<View
				style={{
					display: "flex",
					gap: 6,
					flexDirection: "row",
					justifyContent: "space-between",
					alignItems: "center",
					alignContent: "center",
				}}
			>
				{isLoggedIn ? (
					leftIcon ? (
						leftIcon
					) : (
						<Icons.MenuHamburgerIcon
							onPress={() => {
								console.log("Hamburger Pressed");
								// navigation.openDrawer();
							}}
							height={45}
							width={45}
						/>
					)
				) : (
					<></>
				)}
				<Text
					style={[
						tw`text-2xl uppercase text-center font-semibold`,
						{
							color: curentTheme(theme).text,
						},
					]}
				>
					{screenTitle}
				</Text>
				<View
					style={{
						display: "flex",
						gap: 6,
						flexDirection: "row",
						justifyContent: "flex-end",
					}}
				>
					{rightIcon ? rightIcon : <></>}
				</View>
			</View>
			<View style={[tw`mt-4`]}>{children}</View>
		</View>
	);
};

export default InnerScreen;
