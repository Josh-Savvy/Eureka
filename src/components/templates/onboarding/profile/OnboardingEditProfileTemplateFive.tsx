import { View, Dimensions, Text, Image } from "react-native";
import tw from "twrnc";
import React from "react";

const OnboardingEditProfileTemplateFive = () => {
	return (
		<View
			style={[tw`mt-10`, { minHeight: Dimensions.get("window").height * 0.65 }]}
		>
			<View>
				<Image
					source={require("../../../../../assets/images/onboarding/chat.png")}
					style={[
						{
							height: 300,
							width: 300,
							alignItems: "center",
							alignSelf: "center",
						},
					]}
				/>
			</View>
			<Text style={[tw`text-[10] text-center tracking-tight font-bold`]}>
				Search for friends
			</Text>
			<Text style={[tw`text-[5] text-center tracking-tight`]}>
				You can find friends from your contact lists to connected
			</Text>
		</View>
	);
};

export default OnboardingEditProfileTemplateFive;
