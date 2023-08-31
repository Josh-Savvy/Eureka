import React, { useState } from "react";
import InnerScreen from "../../../ui/layouts/InnerScreen";
import {
	View,
	Text,
	TouchableOpacity,
	KeyboardAvoidingView,
	Dimensions,
} from "react-native";
import tw from "twrnc";
import ThemeContext from "../../../../context/theme.context";
import { curentTheme } from "../../../../constants/theme.constant";
import { PrimaryButton } from "../../../ui/atoms/common/buttons";
import CalendarModal from "../../../ui/atoms/modals/CalendarModal";
import {
	CustomDatePickerType,
	months,
} from "../../../ui/organisms/common/CustomDatepicker";
import Toast from "react-native-root-toast";
import OnboardingEditProfileTemplateOne from "./OnboardingEditProfileTemplateOne";
import OnboardingEditProfileTemplateTwo from "./OnboardingEditProfileTemplateTwo";
import {
	GenderEnum,
	NewUserInteface,
} from "../../../../interfaces/data/user.type";
import OnboardingEditProfileTemplateThree from "./OnboardingEditProfileTemplateThree";
import OnboardingEditProfileTemplateFour from "./OnboardingEditProfileTemplateFour";
import OnboardingEditProfileTemplateFive from "./OnboardingEditProfileTemplateFive";

const OnboardingEditProfileTemplate = ({
	navigation,
	route,
}: {
	navigation: any;
	route: any;
}) => {
	const { theme } = React.useContext(ThemeContext);
	const initialState: NewUserInteface = {
		email: "",
		phone: "+2348111994693",
		first_name: "",
		last_name: "",
		image: "",
		DOB: undefined,
		gender: null,
		interests: [],
	};
	const [state, setState] = React.useState<NewUserInteface>(initialState);
	const [currentStep, setCurrentStep] = React.useState<number>(1);
	const [openDateModal, setOpenDateModal] = React.useState<boolean>(false);
	const ageLimit = 18;
	const stepsLimit: number = 5;
	const [formattedDateString, setFormattedDateString] = useState<string>("");

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
		const formattedMonth =
			months.indexOf(calendarState.selectedMonth) < 10
				? `0${months.indexOf(calendarState.selectedMonth)}`
				: months.indexOf(calendarState.selectedMonth);
		const formattedDate =
			calendarState.selectedDay < 10
				? `0${calendarState.selectedDay}`
				: calendarState.selectedDay;

		setFormattedDateString(
			`${calendarState.selectedYear}-${formattedMonth}-${formattedDate}`,
		);

		setState({
			...state,
			DOB: new Date().setFullYear(
				calendarState.selectedYear,
				months.indexOf(calendarState.selectedMonth),
				calendarState.selectedDay,
			),
		});
		// setOpenDateModal(false);
		console.log(calendarState);
	};

	const handleMoveToStep = () => {
		if (currentStep === 1) {
			if (
				state.DOB &&
				state.first_name &&
				state.last_name &&
				state.image &&
				state.phone
			) {
				currentStep < stepsLimit ? setCurrentStep((prev) => prev + 1) : null;
			} else {
				Toast.show(`Please fill all fields`, {
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
			}
		} else if (currentStep === 2) {
			if (state.gender !== null) {
				currentStep < stepsLimit ? setCurrentStep((prev) => prev + 1) : null;
			} else {
				Toast.show(`Please select your gender`, {
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
			}
		} else if (currentStep === 3) {
			if (state.interests && state.interests.length > 0) {
				currentStep < stepsLimit ? setCurrentStep((prev) => prev + 1) : null;
			} else {
				Toast.show(`Please select your interests or skip`, {
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
			}
		} else {
			console.log("finished");
		}

		//navigation.navigate("Signup");
	};

	return (
		<>
			<InnerScreen
				navigation={navigation}
				hideBackIcon={
					currentStep === 1 || currentStep === 4 || currentStep === 5 ? true : false
				}
				back={() => {
					if (currentStep > 1) {
						setCurrentStep((prev) => prev - 1);
					}
				}}
				rightIcon={
					currentStep > 1 ? (
						<TouchableOpacity
							style={{ alignSelf: "flex-end" }}
							onPress={() =>
								currentStep < stepsLimit ? setCurrentStep((prev) => prev + 1) : null
							}
						>
							<Text
								style={[
									tw`font-semibold`,
									{ fontSize: 20, color: curentTheme(theme).primary },
								]}
							>
								Skip
							</Text>
						</TouchableOpacity>
					) : null
				}
			>
				<KeyboardAvoidingView behavior={"padding"} style={[tw`h-full`]}>
					<View style={[tw``]}>
						{currentStep === 1 ? (
							<OnboardingEditProfileTemplateOne
								formattedDateString={formattedDateString}
								setOpenDateModal={setOpenDateModal}
								updateState={setState}
								state={state}
							/>
						) : currentStep === 2 ? (
							<OnboardingEditProfileTemplateTwo updateState={setState} state={state} />
						) : currentStep === 3 ? (
							<OnboardingEditProfileTemplateThree
								updateState={setState}
								state={state}
							/>
						) : currentStep === 4 ? (
							<OnboardingEditProfileTemplateFour />
						) : currentStep === 5 ? (
							<OnboardingEditProfileTemplateFive />
						) : (
							<></>
						)}
					</View>
					<PrimaryButton
						onPress={handleMoveToStep}
						buttonText={
							currentStep === 1
								? "Confirm"
								: currentStep === 2 || currentStep === 3
								? "Continue"
								: currentStep === 4
								? "Grant access to contact list"
								: currentStep === 5
								? "I want to be notified"
								: "Next"
						}
						buttonContainerStyle={[
							tw`rounded-2xl py-5`,
							{
								backgroundColor:
									currentStep === 1 &&
									state.DOB &&
									state.first_name &&
									state.last_name &&
									state.image &&
									state.phone
										? curentTheme(theme).primary
										: currentStep == 2 && state.gender !== null
										? curentTheme(theme).primary
										: currentStep == 3 && state.interests && state.interests?.length > 0
										? curentTheme(theme).primary
										: currentStep == 4
										? curentTheme(theme).primary
										: currentStep == 5
										? curentTheme(theme).primary
										: "#bbb",
								// marginTop: 5,
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
