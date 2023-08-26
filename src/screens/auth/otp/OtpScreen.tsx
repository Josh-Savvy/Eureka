import React from "react";
import OtpScreenTemplate from "../../../components/templates/auth/otp";

const OtpScreen = ({ navigation, route }: any) => {
	return (
		<OtpScreenTemplate pinCount={4} navigation={navigation} route={route} />
	);
};

export default OtpScreen;
