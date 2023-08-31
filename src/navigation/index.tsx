import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/home";
import Dashboard from "../screens/profile/Dashboard";
import { Path, Svg } from "react-native-svg";
import { TouchableOpacity } from "react-native-gesture-handler";
import { RootStackParamList, RootTabScreenProps } from "../interfaces";
import Login from "../screens/auth/Login";
import AuthContext from "../context/auth.context";
import ThemeContext from "../context/theme.context";
import { curentTheme } from "../constants/theme.constant";
import OnboardingScreen from "../screens/onboading";
import Signup from "../screens/auth/signup";
import SignupEnterNumberScreen from "../screens/auth/signup/EnterNumber";
import SignupOtpScreen from "../screens/auth/otp/SignupOtpScreen";
import OnboardingEditProfile from "../screens/onboading/profile/OnboardingEditProfile";
import {
	HomeIconPath,
	UserIconPath,
	UserSecondIconPath,
} from "../components/ui/atoms/common/icons/svgs";

const Stack = createStackNavigator<RootStackParamList>();

const Navigation = () => {
	const currentUser = false;
	const { isLoggedIn } = React.useContext(AuthContext);

	return (
		<NavigationContainer>
			{isLoggedIn ? (
				<Stack.Navigator
					screenOptions={{
						presentation: "card",
						headerShown: false,
						animationEnabled: true,
					}}
				>
					<Stack.Screen
						name="Root"
						component={BottomTabNavigator}
						options={{ headerShown: false }}
					/>
				</Stack.Navigator>
			) : currentUser ? (
				<Stack.Navigator
					screenOptions={{
						presentation: "card",
						headerShown: false,
						animationEnabled: true,
					}}
				>
					<Stack.Screen name="Login" component={Login} />
				</Stack.Navigator>
			) : (
				<Stack.Navigator
					initialRouteName="Onboarding"
					screenOptions={{
						presentation: "card",
						headerShown: false,
						animationEnabled: true,
					}}
				>
					<Stack.Screen name="Onboarding" component={OnboardingScreen} />
					<Stack.Screen
						name="Signup"
						// options={{
						// 	gestureEnabled: false,
						// }}
						component={Signup}
					/>
					<Stack.Screen
						name="SignupEnterNumberScreen"
						options={{
							gestureEnabled: false,
						}}
						component={SignupEnterNumberScreen}
					/>
					<Stack.Screen name="SignupOtpScreen" component={SignupOtpScreen} />
					<Stack.Screen
						name="OnboardingEditProfile"
						options={{
							gestureEnabled: false,
						}}
						component={OnboardingEditProfile}
					/>
					<Stack.Screen name="Login" component={Login} />
				</Stack.Navigator>
			)}
		</NavigationContainer>
	);
};
const BottomTab = createBottomTabNavigator<RootStackParamList>();

function BottomTabNavigator() {
	const { theme } = React.useContext(ThemeContext);

	return (
		<BottomTab.Navigator
			initialRouteName="Home"
			screenOptions={{
				headerShown: false,
				tabBarStyle: {
					borderTopLeftRadius: 30,
					borderTopRightRadius: 30,
					borderColor: "red",
					shadowColor: "dodgerblue",
					shadowOffset: {
						height: 10,
						width: 10,
					},
					shadowOpacity: 5,
					shadowRadius: 10,
					paddingTop: 12,
					position: "absolute",
					// top: 0,
					bottom: 0,
					left: 0,
					right: 0,
					height: 80,
					elevation: 0,
					backgroundColor: curentTheme(theme).background,
				},
				tabBarInactiveTintColor: "transparent",
				// tabBarActiveTintColor: theme.primary_2,
				tabBarLabelStyle: {
					// fontFamily: "Montserrat_500Medium",
					fontSize: 12,
					color: "#9C9C9C",
				},
			}}
		>
			<BottomTab.Screen
				name="Home"
				component={HomeScreen}
				options={({ navigation, route }: RootTabScreenProps<"Home">) => ({
					title: "Home",
					tabBarIcon: ({ color, focused }) => (
						<TabBarIcon
							theme={theme}
							handleIconPress={() => {
								navigation.navigate(route.name);
							}}
							active={focused}
							name={HomeIconPath}
							color={color}
						/>
					),
				})}
			/>
			<BottomTab.Screen
				name="Profile"
				component={Dashboard}
				options={({ navigation, route }: RootTabScreenProps<"Profile">) => ({
					title: "Profile",
					tabBarIcon: ({ color, focused }) => (
						<TabBarIcon
							theme={theme}
							handleIconPress={() => {
								navigation.navigate(route.name);
							}}
							active={focused}
							name={UserIconPath}
							path2={UserSecondIconPath}
							color={color}
						/>
					),
				})}
			/>
		</BottomTab.Navigator>
	);
}

function TabBarIcon(props: {
	color: string;
	name: string;
	handleIconPress: any;
	active: boolean;
	path2?: string;
	theme: "dark" | "light";
}) {
	const { color, name, handleIconPress, active, path2, theme } = props;

	return (
		<TouchableOpacity onPress={handleIconPress}>
			<Svg width={35} height={35} viewBox="0 0 25 25">
				<Path
					d={name}
					fill={active ? color : theme === "dark" ? "#ccc" : "#000"}
					// stroke={color}
					strokeWidth={1}
				/>
				{path2 ? (
					<Path
						d={path2}
						fill={active ? color : theme === "dark" ? "#ccc" : "#000"}
						// stroke={color}
						strokeWidth={1}
					/>
				) : (
					<></>
				)}
			</Svg>
		</TouchableOpacity>
	);
}
export default Navigation;
