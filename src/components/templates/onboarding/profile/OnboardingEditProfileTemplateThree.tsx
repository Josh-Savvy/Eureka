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
import { NewUserInteface } from "../../../../interfaces/data/user.type";

interface InterestType {
	icon: any;
	interest: string;
}
const OnboardingEditProfileTemplateThree = ({
	state,
	updateState,
}: {
	state: NewUserInteface;
	updateState: Dispatch<SetStateAction<NewUserInteface>>;
}) => {
	const interests: InterestType[] = [
		{ icon: "camera-outline", interest: "Photography" },
		{ icon: "cart-outline", interest: "Shopping" },
		{ icon: "mic-outline", interest: "Karaoke" },
		{ icon: "musical-note-outline", interest: "Music" },
		{ icon: "wine-outline", interest: "Drinking" },
		{ icon: "image-outline", interest: "Traveling" },
		{ icon: "water-outline", interest: "Swimming" },
		{ icon: "fast-food-outline", interest: "Cooking" },
		{ icon: "man-outline", interest: "Yoga" },
		{ icon: "tennisball-outline", interest: "Sports" },
	];

	const { theme } = useContext(ThemeContext);
	const [selectedInterests, setSelectedInterests] = useState<InterestType[]>([]);

	const handleSelect = (interest: InterestType) => {
		const interestExists = selectedInterests.some(
			(item) => item.interest === interest.interest,
		);
		if (interestExists) {
			const updatedInterests = selectedInterests.filter(
				(item) => item.interest !== interest.interest,
			);
			setSelectedInterests(updatedInterests);
		} else {
			setSelectedInterests((prevInterests) => [...prevInterests, interest]);
		}
	};

	useEffect(() => {
		// if (state.interests) {
		// 	setSelectedInterests(
		// 		interests.filter(
		// 			(interest) =>
		// 				state.interests?.map((interest) => {
		// 					return interest;
		// 				}) === interest,
		// 		),
		// 	);
		// }
		if (selectedInterests) {
			const uniqueInterests = new Set(
				selectedInterests.map((interest) => interest.interest),
			);
			const updatedInterests = Array.from(uniqueInterests);
			updateState({
				...state,
				interests: updatedInterests,
			});
		}
		// return () => {
		// 	setSelectedInterests([]);
		// };
	}, [selectedInterests]);

	return (
		<View
			style={[tw`mt-10`, { minHeight: Dimensions.get("window").height * 0.65 }]}
		>
			<Text style={[tw`text-[10] tracking-tight font-bold`]}>Your interests</Text>
			<Text style={[tw`text-[5] tracking-tight`]}>
				Select a few of your interests and let everyone know what you're passionate
				about.
			</Text>
			<View style={[tw`mt-6 flex-row justify-between flex-wrap`]}>
				{interests.map((interest, index) => {
					return (
						<TouchableOpacity
							onPress={() => handleSelect(interest)}
							key={index}
							style={[
								tw`mt-2 p-3 px-4 w-[48%] flex rounded-2xl`,
								{
									borderWidth: 1,
									borderColor: state.interests?.includes(interest.interest)
										? curentTheme(theme).primary
										: "#ddd",
									backgroundColor: state.interests?.includes(interest.interest)
										? curentTheme(theme).primary
										: "transparent",
									flexDirection: "row",
									alignItems: "center",
									alignContent: "center",
								},
							]}
						>
							<Ionicons
								name={interest.icon ? interest.icon.trim() : undefined}
								color={
									state.interests?.includes(interest.interest)
										? "white"
										: curentTheme(theme).primary
								}
								size={25}
							/>
							<Text
								style={[
									tw`font-semibold text-4 capitalize ml-3`,
									{
										color: state.interests?.includes(interest.interest)
											? "white"
											: "#000",
									},
								]}
							>
								{interest.interest}
							</Text>
							{/* {state.interests?.includes(interest.interest)&& (
								
							)} */}
						</TouchableOpacity>
					);
				})}
			</View>
		</View>
	);
};

export default OnboardingEditProfileTemplateThree;
