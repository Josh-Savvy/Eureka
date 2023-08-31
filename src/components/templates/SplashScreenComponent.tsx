import React, { useContext, useEffect, useState } from "react";
import {
	Image,
	View,
	Dimensions,
	Text,
	Animated,
	ActivityIndicator,
	StatusBar,
} from "react-native";
import tw from "twrnc";
import ThemeContext from "../../context/theme.context";

const SplashScreenComponent = () => {
	const [fadeAnim] = useState(new Animated.Value(0));
	const [scaleAnim] = useState(new Animated.Value(3));

	useEffect(() => {
		Animated.parallel([
			Animated.timing(fadeAnim, {
				toValue: 1,
				duration: 2000,
				useNativeDriver: true,
			}),
			Animated.timing(scaleAnim, {
				toValue: 1,
				duration: 1000,
				useNativeDriver: true,
			}),
		]).start();
	}, [fadeAnim, scaleAnim]);

	const animatedStyles = {
		opacity: fadeAnim,
		transform: [{ scale: scaleAnim }],
	};
	const { theme } = useContext(ThemeContext);
	return (
		<View
			style={{
				backgroundColor: "white",
				// paddingTop: Dimensions.get("window").height * 0.05,
			}}
		>
			<StatusBar barStyle={theme === "dark" ? "light-content" : "dark-content"} />
			<View style={[tw`items-center h-full relative`]}>
				<Animated.View
					style={{
						...tw`absolute top-0 left-0 w-full h-full -z-10`,
						opacity: fadeAnim,
						backgroundColor: "#E940575a",
					}}
				>
					<Image
						source={require("../../../assets/images/splash.png")}
						style={[
							tw`items-center`,
							{
								resizeMode: "contain",
								height: Dimensions.get("window").height * 0.5,
								width: Dimensions.get("window").width * 0.5,
								alignItems: "center",
								alignSelf: "center",
							},
						]}
					/>
					<Animated.Text
						style={[
							tw`text-[20] tracking-wide text-center text-white uppercase font-bold`,
							{
								color: "#E94057",
							},
							animatedStyles,
						]}
					>
						Euphoria
					</Animated.Text>
					<ActivityIndicator color="black" size={100} />
				</Animated.View>
			</View>
		</View>
	);
};
export default SplashScreenComponent;
