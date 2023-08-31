import Ionicons from "@expo/vector-icons/Ionicons";
import React, { Dispatch, SetStateAction, useContext, useState } from "react";
import {
	View,
	Text,
	ScrollView,
	TouchableOpacity,
	Dimensions,
} from "react-native";
import { curentTheme } from "../../../../constants/theme.constant";
import { CustomInputTwo } from "../../../ui/atoms/common/inputs";
import tw from "twrnc";
import { Image } from "react-native";
import ThemeContext from "../../../../context/theme.context";
import { NewUserInteface } from "../../../../interfaces/data/user.type";
import * as ImagePicker from "expo-image-picker";

const OnboardingEditProfileTemplateOne = ({
	state,
	updateState,
	setOpenDateModal,
	formattedDateString,
}: {
	state: NewUserInteface;
	updateState: Dispatch<SetStateAction<NewUserInteface>>;
	setOpenDateModal: Dispatch<SetStateAction<boolean>>;
	formattedDateString: string;
}) => {
	const { theme } = useContext(ThemeContext);
	const { email, first_name, image, last_name, phone, DOB } = state;

	const handleImageUpload = async () => {
		const permissionResult =
			await ImagePicker.requestMediaLibraryPermissionsAsync();
		if (permissionResult.granted === false) {
			alert("Permission to access camera roll is required!");
			return;
		}
		const result = await ImagePicker.launchImageLibraryAsync();
		if (!result.canceled) {
			updateState({ ...state, image: result.assets[0].uri });
		}
	};

	const handleChange = (name: keyof NewUserInteface) => (text: string) => {
		updateState({ ...state, [name]: text });
	};

	return (
		<ScrollView
			showsHorizontalScrollIndicator={false}
			showsVerticalScrollIndicator={false}
			style={[tw`mb-10`, { height: "78%" }]}
		>
			<Text style={[tw`font-bold text-[9] mt-5`, { alignSelf: "flex-start" }]}>
				Profile details
			</Text>
			<View style={[tw`items-center`]}>
				<View style={[tw`mt-14`, { position: "relative" }]}>
					{image ? (
						<Image
							source={{ uri: image }}
							style={{ width: 130, height: 130, borderRadius: 40 }}
						/>
					) : (
						<View
							style={[
								tw`bg-zinc-200 rounded-3xl items-center p-12 overflow-hidden`,
								{ position: "relative" },
							]}
						>
							<Ionicons name="person-sharp" size={35} />
						</View>
					)}
					<TouchableOpacity
						onPress={handleImageUpload}
						style={[
							tw`p-2 rounded-full`,
							{
								position: "absolute",
								bottom: -10,
								right: -10,
								backgroundColor: curentTheme(theme).primary,
								borderWidth: 10,
								borderColor: curentTheme(theme).background,
							},
						]}
					>
						<Ionicons name="camera-sharp" color={"white"} size={25} />
					</TouchableOpacity>
				</View>
			</View>
			<View style={[tw`mt-5`, { gap: 20 }]}>
				<CustomInputTwo
					label="First Name"
					labelStyle={[tw`pr-2`]}
					value={first_name}
					onChangeText={handleChange("first_name")}
					containerStyle={[tw`rounded-xl border border-zinc-300`]}
					autoFocus
				/>
				<CustomInputTwo
					label="Last Name"
					labelStyle={[tw`pr-2`]}
					onChangeText={handleChange("last_name")}
					value={last_name}
					containerStyle={[tw`rounded-xl border border-zinc-300`]}
				/>
				<CustomInputTwo
					label="Phone"
					labelStyle={[tw`pr-2`]}
					value={phone}
					containerStyle={[tw`rounded-xl border border-zinc-300`]}
				/>
			</View>
			<TouchableOpacity
				activeOpacity={0.56}
				onPress={() => setOpenDateModal(true)}
				style={[
					tw`mt-5 bg-[#E940572a] p-3 rounded-2xl`,
					{
						flexDirection: "row",
						gap: 10,
						alignItems: "center",
						justifyContent: "flex-start",
					},
				]}
			>
				<Ionicons name="calendar-outline" size={30} color={"#E94057"} />
				<Text style={[tw`font-bold text-[4]`, { color: "#E94057" }]}>
					Choose Birthday Date
					{formattedDateString ? " | " + formattedDateString : ""}
				</Text>
			</TouchableOpacity>
		</ScrollView>
	);
};
export default OnboardingEditProfileTemplateOne;
