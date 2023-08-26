import React from "react";
import { View, Text } from "react-native";
import OnboardingScreenTemplate from "../../components/templates/onboarding";

const OnboardingScreen = ({
	navigation,
	route,
}: {
	navigation: any;
	route: any;
}) => {
	return <OnboardingScreenTemplate navigation={navigation} />;
};
export default OnboardingScreen;
