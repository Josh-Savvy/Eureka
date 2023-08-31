import React from "react";
import { View, Text } from "react-native";
import InnerScreen from "../../../components/ui/layouts/InnerScreen";
import OnboardingEditProfileTemplate from "../../../components/templates/onboarding/profile";

const OnboardingEditProfile = ({ navigation, route }: any) => {
	return <OnboardingEditProfileTemplate navigation={navigation} route={route} />;
};
export default OnboardingEditProfile;
