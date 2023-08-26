import React from "react";
import OtpScreenTemplate from "../../../components/templates/auth/otp";

// route: RouteProp<Record<string, { phoneNumber: string }>, string>;

const SignupOtpScreen = ({ navigation, route }: any) => {
	const phoneNumber = route?.params?.phoneNumber || "";
	console.log(phoneNumber);

	const handleNext = () => {
		setTimeout(() => {
			navigation.navigate("OnboardingEditProfile", phoneNumber);
		}, 3000);
	};
	return (
		<OtpScreenTemplate
			next={handleNext}
			pinCount={4}
			countdownLimit={30}
			navigation={navigation}
		/>
	);
};

export default SignupOtpScreen;
