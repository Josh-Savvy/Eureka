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
	placeholder = "-",
	countdownLimit = 5,
	next,
}: CustomOTPInputProps) => {
	const { theme } = React.useContext(ThemeContext);
	const [countdown, setCountdown] = React.useState<number>(countdownLimit);
	const [error, setError] = React.useState<string>("");
	const [otpValue, setOtpValue] = React.useState<string>("");
	const [currentIndex, setCurrentIndex] = React.useState<number>(-1);
	const [loading, setLoading] = React.useState<boolean>(false);

	const inputRefs: any[] = Array.from({ length: pinCount }, () =>
		React.useRef(),
	);

	const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

	const onPressNumber = (number: number) => {
		setError("");
		setLoading(false);
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
		setError("");
		setLoading(false);
		if (currentIndex > -1) {
			setOtpValue((prev: string) => prev.slice(0, -1));
			setCurrentIndex(currentIndex - 1);
		}
	};

	React.useEffect(() => {
		if (otpValue.trim().length === 4) {
			setLoading(true);
			console.log(otpValue);
			// ! If otp is valid, then:
			next ? next() : null;
		}
		// else {
		// 	setError("Invalid OTP!");
		// }
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
			<View style={[tw`items-center mt-6`]}>
				<Text style={[tw`text-[12] font-semibold`, { color: "#111" }]}>
					{`${Math.floor(countdown / 60)
						.toString()
						.padStart(2, "0")}:${(countdown % 60).toString().padStart(2, "0")}`}
				</Text>
				<Text
					style={[
						tw`font-light tracking-tight text-center text-zinc-400 text-[6] mt-3`,
					]}
				>
					Enter the verification code {"\n"} we sent to you
				</Text>
				<View
					style={[
						tw`my-6`,
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
								tw`h-16 w-16 text-center border rounded-xl items-center pt-2.5 font-medium text-[10] overflow-hidden`,
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
											: currentIndex + 1 === index
											? "#d311195a"
											: otpValue.charAt(index)
											? "white"
											: "#ddd",
								},
							]}
							onPress={() => setCurrentIndex(index)}
							children={otpValue.charAt(index) || placeholder}
						/>
					))}
				</View>
				<View>
					{error ? (
						<Text
							style={[
								tw`tracking-tight text-xl`,
								{
									color: "red",
								},
							]}
						>
							{error}
						</Text>
					) : (
						<></>
					)}
				</View>
				<View style={[tw`flex-row flex-wrap py-2 justify-between`]}>
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
						<TouchableOpacity style={[tw``]} onPress={onPressDelete}>
							{/* <Text style={[]}>Delete</Text> */}
							<Ionicons name="backspace-outline" size={34} />
						</TouchableOpacity>
					</View>
				</View>
				<TouchableOpacity
					onPress={() => {
						if (otpValue.length !== 4) if (!loading) setCountdown(countdownLimit);
					}}
					disabled={countdown > 0 ? true : loading ? true : false}
					style={[tw`mt-20`]}
				>
					<Text
						style={[
							tw`tracking-tight text-xl font-semibold`,
							{
								color: countdown > 0 ? "#ccc" : curentTheme(theme).primary,
							},
						]}
					>
						{!loading ? "Send again" : "Please wait..."}
					</Text>
				</TouchableOpacity>
			</View>
		</InnerScreen>
	);
};
export default OtpScreenTemplate;
