import Ionicons from "@expo/vector-icons/Ionicons";
import {
	Dispatch,
	SetStateAction,
	useContext,
	useEffect,
	useState,
} from "react";
import { View, Dimensions, TouchableOpacity, Text } from "react-native";
import { curentTheme } from "../../../../constants/theme.constant";
import ThemeContext from "../../../../context/theme.context";
import tw from "twrnc";
import React from "react";
import {
	GenderEnum,
	NewUserInteface,
} from "../../../../interfaces/data/user.type";

const OnboardingEditProfileTemplateTwo = ({
	state,
	updateState,
}: {
	state: NewUserInteface;
	updateState: Dispatch<SetStateAction<NewUserInteface>>;
}) => {
	const genders: Array<keyof typeof GenderEnum> = Object.keys(
		GenderEnum,
	) as Array<keyof typeof GenderEnum>;

	const { theme } = useContext(ThemeContext);
	const [selectedGender, setSelectedGender] = useState<GenderEnum | null>(null);

	const handleGenderSelect = (gender: GenderEnum) => {
		// setSelectedGender(gender === selectedGender ? null : gender);
		setSelectedGender(gender);
	};

	useEffect(() => {
		if (state.gender) {
			const genderKey: keyof typeof GenderEnum =
				state.gender.toUpperCase() as keyof typeof GenderEnum;
			const genderEnumValue = GenderEnum[genderKey];
			if (genderEnumValue) {
				setSelectedGender(genderEnumValue);
			}
		}
		if (selectedGender !== null) {
			updateState({ ...state, gender: selectedGender });
		}
	}, [selectedGender]);

	return (
		<View
			style={[tw`mt-10`, { minHeight: Dimensions.get("window").height * 0.65 }]}
		>
			<Text style={[tw`text-[10] tracking-tight font-bold`]}>I am a </Text>
			<View style={[tw`mt-15`]}>
				{genders.map((gender, index) => {
					return (
						<TouchableOpacity
							onPress={() => handleGenderSelect(GenderEnum[gender])}
							key={index}
							style={[
								tw`mt-2 p-6 px-4 w-full flex rounded-2xl`,
								{
									borderWidth: selectedGender === GenderEnum[gender] ? 0 : 1,
									borderColor: selectedGender === GenderEnum[gender] ? "none" : "#ddd",
									backgroundColor:
										selectedGender === GenderEnum[gender]
											? curentTheme(theme).primary
											: "transparent",
									flexDirection: "row",
									justifyContent: "space-between",
									alignItems: "center",
									alignContent: "center",
								},
							]}
						>
							<Text
								style={[
									tw`font-semibold text-4 capitalize`,
									{ color: selectedGender === GenderEnum[gender] ? "white" : "#000" },
								]}
							>
								{GenderEnum[gender]}
							</Text>
							<Ionicons
								name="checkmark"
								color={selectedGender === GenderEnum[gender] ? "white" : "#ddd"}
								size={25}
							/>
							{/* {selectedGender === GenderEnum[gender]&& (
								
							)} */}
						</TouchableOpacity>
					);
				})}
			</View>
		</View>
	);
};

export default OnboardingEditProfileTemplateTwo;
