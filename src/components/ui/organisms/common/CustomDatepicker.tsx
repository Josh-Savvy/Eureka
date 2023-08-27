import Ionicons from "@expo/vector-icons/Ionicons";
import React, {
	useRef,
	useState,
	useEffect,
	Dispatch,
	SetStateAction,
} from "react";
import {
	View,
	Text,
	ScrollView,
	TouchableOpacity,
	Dimensions,
} from "react-native";
import tw from "twrnc";

export interface CustomDatePickerType {
	selectedYear: number;
	selectedMonth: string;
	selectedDay: number;
}
export const months = [
	"January",
	"February",
	"March",
	"April",
	"May",
	"June",
	"July",
	"August",
	"September",
	"October",
	"November",
	"December",
];
const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const CustomDatepicker = ({
	initialState,
	updateState,
	title,
	maxYear,
}: {
	initialState: CustomDatePickerType;
	updateState: Dispatch<SetStateAction<CustomDatePickerType>>;
	maxYear?: number;
	title?: string;
}) => {
	const currentDate = new Date();
	const currentYear = currentDate.getFullYear();
	const currentMonth = currentDate.getMonth();

	const [currentYearIndex, setCurrentYearIndex] = useState<number>(
		initialState.selectedYear || currentYear,
	);
	const [currentMonthIndex, setCurrentMonthIndex] = useState<number>(
		months.indexOf(initialState.selectedMonth) || currentMonth,
	);
	const [selectedDay, setSelectedDay] = useState<number>(
		initialState.selectedDay || 1,
	);
	const [yearArray, setYearArray] = useState<number[]>([]);
	const [showYear, setShowYear] = useState<boolean>(false);
	const [showMonth, setShowMonth] = useState<boolean>(false);

	useEffect(() => {
		const years = [];
		for (let year = currentYear; year >= 1960; year--) {
			years.push(year);
		}
		setYearArray(years);
	}, []);

	function getDaysInMonth(year: number, month: number) {
		return new Date(year, month + 1, 0).getDate();
	}

	const handleBackwardClick = () => {
		if (currentMonthIndex > 0) {
			setCurrentMonthIndex(currentMonthIndex - 1);
			setSelectedDay(1);
		} else {
			setCurrentMonthIndex(11);
			setCurrentYearIndex(currentYearIndex - 1);
		}
	};

	const handleForwardClick = () => {
		if (currentMonthIndex < 11) {
			setCurrentMonthIndex(currentMonthIndex + 1);
			setSelectedDay(1);
		} else if (maxYear) {
			if (currentYearIndex + 1 <= new Date().getFullYear() + maxYear) {
				setCurrentMonthIndex(0);
				setCurrentYearIndex(currentYearIndex + 1);
			}
		} else if (currentYearIndex + 1 <= new Date().getFullYear()) {
			setCurrentMonthIndex(0);
			setCurrentYearIndex(currentYearIndex + 1);
		}
	};

	useEffect(() => {
		const updatedState: CustomDatePickerType = {
			selectedYear: currentYearIndex,
			selectedMonth: months[currentMonthIndex],
			selectedDay: selectedDay,
		};
		updateState(updatedState);
		return () => updateState(initialState);
	}, [currentMonthIndex, currentYearIndex, selectedDay]);

	return (
		<View style={{ margin: 10 }}>
			<View
				style={[{ flexDirection: "row", justifyContent: "space-between", top: 15 }]}
			>
				<TouchableOpacity onPress={handleBackwardClick}>
					<Ionicons name="chevron-back" size={30} />
				</TouchableOpacity>
				<View style={[tw`-mt-8`]}>
					<Text
						style={[tw`my-1 tracking-tighter text-[5]`, { textAlign: "center" }]}
					>
						{title || "Calendar"}
					</Text>
					<TouchableOpacity onPress={() => setShowYear(!showYear)}>
						<Text
							style={[
								tw`text-4xl font-semibold`,
								{
									textAlign: "center",
									color: "#E94057",
									shadowColor: "#E94057",
									shadowOffset: {
										height: 5,
										width: 0,
									},
									shadowOpacity: 0.5,
									shadowRadius: 10,
								},
							]}
						>
							{currentYearIndex}
						</Text>
					</TouchableOpacity>
					<TouchableOpacity onPress={() => setShowMonth(!showMonth)}>
						<Text
							style={[
								tw`my-1 tracking-tighter text-[5] font-medium`,
								{ textAlign: "center", color: "#E94057" },
							]}
						>
							{months[currentMonthIndex]}
						</Text>
					</TouchableOpacity>
				</View>
				<TouchableOpacity onPress={handleForwardClick}>
					<Ionicons name="chevron-forward" size={30} />
				</TouchableOpacity>
			</View>
			<ScrollView
				style={{ marginTop: showYear ? 30 : 0, zIndex: 30, position: "relative" }}
				showsHorizontalScrollIndicator={false}
				showsVerticalScrollIndicator={false}
				horizontal
				pagingEnabled
				decelerationRate="fast"
				snapToAlignment="center"
				snapToInterval={Dimensions.get("window").width / 6}
			>
				{showYear ? (
					yearArray
						.map((year, index) => {
							return (
								<TouchableOpacity
									key={index}
									onPress={() => {
										setShowYear(false);
										setCurrentYearIndex(year);
									}}
								>
									<Text
										style={[
											tw`text-4xl font-semibold mr-10`,
											{
												textAlign: "center",
												color: "#E94057",
											},
										]}
									>
										{year}
									</Text>
								</TouchableOpacity>
							);
						})
						.slice(1, yearArray.length)
				) : (
					<></>
				)}
			</ScrollView>
			<ScrollView
				style={{
					marginTop: 30,
					marginBottom: 50,
					minHeight: 200,
				}}
				showsHorizontalScrollIndicator={false}
				showsVerticalScrollIndicator={false}
			>
				{showMonth ? (
					<View style={{ flexDirection: "row", flexWrap: "wrap" }}>
						{Array.from({ length: 12 }, (_, monthIndex) => (
							<TouchableOpacity
								key={monthIndex}
								style={{
									alignItems: "center",
									justifyContent: "center",
									width: 60,
									height: 60,
									// borderWidth: 2,
									borderRadius: 30,
									margin: 5,
									backgroundColor:
										currentMonthIndex === monthIndex ? "#E94057" : "transparent",
								}}
								onPress={() => {
									setCurrentMonthIndex(monthIndex);
									setShowMonth(false);
								}}
							>
								<Text
									style={{
										color: currentMonthIndex === monthIndex ? "white" : "black",
										fontSize: 18,
									}}
								>
									{months[monthIndex].substring(0, 3)}
								</Text>
							</TouchableOpacity>
						))}
					</View>
				) : (
					<View style={{ flexDirection: "row", flexWrap: "wrap" }}>
						{Array.from(
							{ length: getDaysInMonth(currentYear, currentMonthIndex) },
							(_, index) => {
								const day = index + 1;
								const currentMonthDate = new Date(currentYear, currentMonthIndex, day);
								const weekdayIndex = currentMonthDate.getDay();
								const weekday = weekdays[weekdayIndex];
								const isSelected = selectedDay === day ? true : false;

								return (
									<TouchableOpacity
										key={index}
										style={{
											alignItems: "center",
											justifyContent: "center",
											width: 45,
											height: 45,
											backgroundColor: isSelected ? "#E94057" : "transparent",
											borderRadius: 50,
											margin: 5,
										}}
										onPress={() => {
											setSelectedDay(day);
										}}
									>
										<Text
											style={{
												color: isSelected ? "white" : "black",
												fontSize: 18,
											}}
										>
											{day}
										</Text>
									</TouchableOpacity>
								);
							},
						)}
					</View>
				)}
			</ScrollView>
		</View>
	);
};

export default CustomDatepicker;
