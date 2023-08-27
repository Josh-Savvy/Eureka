import React from "react";
import InnerScreen from "../../../ui/layouts/InnerScreen";
import {
	View,
	Text,
	TouchableOpacity,
	Image,
	ScrollView,
	KeyboardAvoidingView,
	GestureResponderEvent,
	Dimensions,
} from "react-native";
import tw from "twrnc";
import ThemeContext from "../../../../context/theme.context";
import { curentTheme } from "../../../../constants/theme.constant";
import Ionicons from "@expo/vector-icons/Ionicons";
import * as ImagePicker from "expo-image-picker";
import { CustomInputTwo } from "../../../ui/atoms/common/inputs";
import { PrimaryButton } from "../../../ui/atoms/common/buttons";
import CalendarModal from "../../../ui/atoms/modals/CalendarModal";
import {
	CustomDatePickerType,
	months,
} from "../../../ui/organisms/common/CustomDatepicker";
import Toast from "react-native-root-toast";

interface NewUserInteface {
	email: string;
	phone: string;
	first_name: string;
	last_name: string;
	image: string;
	DOB: number | undefined;
}

const OnboardingEditProfileTemplate = ({
	navigation,
	route,
}: {
	navigation: any;
	route: any;
}) => {
	const { theme } = React.useContext(ThemeContext);
	const ageLimit = 18;
	const initialState = {
		email: "",
		phone: "+2348111994693",
		first_name: "",
		last_name: "",
		image: "",
		DOB: undefined,
	};
	const [state, setState] = React.useState<NewUserInteface>(initialState);
	const { email, first_name, image, last_name, phone, DOB } = state;
	const [openDateModal, setOpenDateModal] = React.useState<boolean>(!false);
	const handleImageUpload = async () => {
		const permissionResult =
			await ImagePicker.requestMediaLibraryPermissionsAsync();
		if (permissionResult.granted === false) {
			alert("Permission to access camera roll is required!");
			return;
		}
		const result = await ImagePicker.launchImageLibraryAsync();
		if (!result.canceled) {
			setState({ ...state, image: result.assets[0].uri });
		}
	};
	const handleChange = (name: keyof typeof initialState) => (text: string) => {
		setState({ ...state, [name]: text });
	};
	const updateDOB = (calendarState: CustomDatePickerType) => {
		// console.log(calendarState);
		if (
			calendarState.selectedYear >= new Date().getFullYear() ||
			calendarState.selectedYear <= new Date().getFullYear() - ageLimit
		) {
			Toast.show(`Not available for persons below ${ageLimit}`, {
				position: Toast.positions.TOP,
				shadow: !true,
				animation: true,
				hideOnPress: true,
				delay: 0,
				duration: Toast.durations.LONG,
				backgroundColor: "#d31119",
				containerStyle: {
					width: Dimensions.get("window").width * 0.95,
					padding: 20,
				},
			});
			return;
		}
		// !
		setState({
			...state,
			DOB: new Date().setFullYear(
				calendarState.selectedYear,
				months.indexOf(calendarState.selectedMonth),
				calendarState.selectedDay,
			),
		});
		setOpenDateModal(false);
		console.log(calendarState);
		// if (
		// 	calendarState &&
		// 	calendarState.selectedDay !== initialState.selectedDay &&
		// 	calendarState.selectedMonth !== initialState.selectedMonth &&
		// 	calendarState.selectedYear !== initialState.selectedYear
		// )
		// 	return false;
		// return true;
	};
	return (
		<>
			<InnerScreen navigation={navigation} hideBackIcon>
				<KeyboardAvoidingView
					// behavior={Platform.OS === "ios" ? "padding" : ""}
					behavior={"padding"}
					// keyboardVerticalOffset={Platform.OS === "ios" ? 5 : 0}
					style={[tw`h-full`]}
				>
					<View style={[tw`mt-6`]}>
						<TouchableOpacity style={{ alignSelf: "flex-end" }}>
							<Text
								style={[
									tw`font-semibold`,
									{ fontSize: 20, color: curentTheme(theme).primary },
								]}
							>
								Skip
							</Text>
						</TouchableOpacity>
						<ScrollView
							showsHorizontalScrollIndicator={false}
							showsVerticalScrollIndicator={false}
							style={[tw`pb-10`, { height: "83%" }]}
						>
							<Text style={[tw`font-bold text-[9] mt-3`, { alignSelf: "flex-start" }]}>
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
								</Text>
							</TouchableOpacity>
						</ScrollView>
					</View>
					<PrimaryButton
						onPress={() => {
							// navigation.navigate("Signup");
						}}
						buttonText="Confirm"
						buttonContainerStyle={[
							tw`rounded-2xl py-5`,
							{
								backgroundColor: curentTheme(theme).primary,
								// padding: 40,
								marginTop: 5,
							},
						]}
						width={"100%"}
						buttonTextStyle={tw`text-lg tracking-tight`}
					/>
				</KeyboardAvoidingView>
			</InnerScreen>
			{openDateModal ? (
				<CalendarModal
					closeModal={() => setOpenDateModal(false)}
					modalIsOpen={openDateModal}
					handleSaveDate={updateDOB}
				/>
			) : (
				<></>
			)}
		</>
	);
};

export default OnboardingEditProfileTemplate;
