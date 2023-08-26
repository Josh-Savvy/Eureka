import React from "react";
import InnerScreen from "../../components/ui/layouts/InnerScreen";
import { Text } from "react-native";
import tw from "twrnc";

const Dashboard = ({ navigation, route }: any) => {
	return (
		<InnerScreen navigation={navigation} screenTitle="Dashboard">
			<Text>Dashboard</Text>
		</InnerScreen>
	);
};

export default Dashboard;
