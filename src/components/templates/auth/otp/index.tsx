import React from "react";
import { View, Text, StyleSheet } from "react-native";
import InnerScreen from "../../../ui/layouts/InnerScreen";
import tw from "twrnc";
import { CustomOTPInputProps } from "../../../../interfaces/inputs.type";
import { curentTheme } from "../../../../constants/theme.constant";
import ThemeContext from "../../../../context/theme.context";
import { TouchableOpacity } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

const OtpScreenTemplate = ({
	navigation,
	route,
	pinCount = 4,
	placeholder = "0",
	countdownLimit = 2,
}: CustomOTPInputProps) => {
	const { theme } = React.useContext(ThemeContext);
	const phoneNumber = route?.params?.phoneNumber || "";
	// console.log(phoneNumber);
	const [countdown, setCountdown] = React.useState<number>(countdownLimit);
	const [error, setError] = React.useState<string>("");
	const [otpValue, setOtpValue] = React.useState<string>("");
	const [currentIndex, setCurrentIndex] = React.useState<number>(0);

	const inputRefs: any[] = Array.from({ length: pinCount }, () =>
		React.useRef(),
	);

	const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

	const onPressNumber = (number: number) => {
		if (currentIndex < pinCount) {
			if (otpValue.length < pinCount) {
				setOtpValue((prev: string) => prev.concat(number.toString()));
				setCurrentIndex(currentIndex + 1);
			}
		} else if (currentIndex >= pinCount) {
			setCurrentIndex(pinCount);
		}
	};

	const onPressDelete = () => {
		if (currentIndex > -1) {
			setOtpValue((prev: string) => prev.slice(0, -1));
			setCurrentIndex(currentIndex - 1);
		}
	};

	React.useEffect(() => {
		console.log(otpValue);
	}, [otpValue]);

	React.useEffect(() => {
		if (countdown > 0) {
			const timer = setInterval(() => {
				setCountdown(countdown - 1);
			}, 1000);
			return () => {
				clearInterval(timer);
			};
		}
	}, [countdown]);
	return (
		<InnerScreen navigation={navigation}>
			<View style={[tw`items-center`]}>
				<Text>OtpScreenTemplate</Text>
				<View
					style={[
						tw`my-10`,
						{
							display: "flex",
							flexDirection: "row",
							justifyContent: "space-between",
							alignItems: "center",
							gap: 10,
						},
					]}
				>
					{Array.from({ length: pinCount }).map((_, index) => (
						<Text
							key={index}
							ref={(ref) => (inputRefs[index].current = ref)}
							style={[
								tw`h-16 w-16 text-center border rounded-xl font-medium text-[10] overflow-hidden`,
								{
									backgroundColor:
										index === currentIndex
											? curentTheme(theme).primary
											: currentIndex + 1 === index
											? "#d311191a"
											: otpValue.charAt(index)
											? curentTheme(theme).primary
											: "white",
									borderColor:
										index === currentIndex ? "white" : curentTheme(theme).primary,
									color:
										index === currentIndex
											? "white"
											: otpValue.charAt(index)
											? "white"
											: curentTheme(theme).primary,
								},
							]}
							onPress={() => setCurrentIndex(index)}
							children={otpValue.charAt(index)}
						/>
					))}
				</View>
				<TouchableOpacity
					onPress={() => {
						setCountdown(countdownLimit);
					}}
					disabled={countdown > 0 ? true : false}
				>
					{countdown > 0 ? (
						<Text
							style={{
								fontSize: 25,
								color: "#aaa",
							}}
						>
							{countdown}
						</Text>
					) : (
						<Text
							style={[
								tw`tracking-tight text-xl`,
								{
									color: curentTheme(theme).primary,
								},
							]}
						>
							Send again
						</Text>
					)}
				</TouchableOpacity>
				<View style={[tw`flex-row flex-wrap py-6 justify-between`]}>
					{numbers.map((number) => (
						<TouchableOpacity
							key={number}
							style={[tw`w-1/3 my-4 p-3 text-center flex items-center`]}
							onPress={() => onPressNumber(number)}
						>
							<Text style={[tw`text-[8]`]}>{number}</Text>
						</TouchableOpacity>
					))}
					<View
						style={[
							tw`flex-row items-center absolute -bottom-10 right-10`,
							{ gap: 69 },
						]}
					>
						<TouchableOpacity
							style={[tw`ml-[38] p-3 text-center flex items-center`]}
							onPress={() => {
								onPressNumber(0);
							}}
						>
							<Text style={[tw`text-[8]`]}>{0}</Text>
						</TouchableOpacity>
						<TouchableOpacity style={[tw``]} onPress={() => onPressDelete(4)}>
							{/* <Text style={[]}>Delete</Text> */}
							<Ionicons name="backspace-outline" size={34} />
						</TouchableOpacity>
					</View>
				</View>
			</View>
		</InnerScreen>
	);
};
// const styles = StyleSheet.create({
// 	row: {
// 		flexDirection: "row",
// 		flexWrap: "wrap",
// 	},
// 	numberButton: {
// 		width: 80,
// 		height: 70,
// 		justifyContent: "center",
// 		alignItems: "center",
// 		margin: 5,
// 		backgroundColor: "#ddd",
// 		borderRadius: 10,
// 	},
// 	numberText: {
// 		fontSize: 24,
// 	},
// 	deleteButton: {
// 		width: 140,
// 		height: 50,
// 		marginTop: 10,
// 		backgroundColor: "red",
// 		justifyContent: "center",
// 		alignItems: "center",
// 		borderRadius: 10,
// 	},
// 	deleteText: {
// 		color: "white",
// 		fontSize: 18,
// 	},
// });
export default OtpScreenTemplate;
