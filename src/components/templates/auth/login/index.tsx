import React from "react";
import InnerScreen from "../../../ui/layouts/InnerScreen";
import { Text } from "react-native";
import LoginForm from "../../../ui/atoms/forms/auth/LoginForm";

const LoginTemplate = ({ navigation }: { navigation: any }) => {
	return (
		<InnerScreen navigation={navigation}>
			<LoginForm navigation={navigation} />
		</InnerScreen>
	);
};

export default LoginTemplate;
