import React, { useState } from "react";
import { Dimensions, Text } from "react-native";
import CustomModal from "./CustomModal";
import tailwind from "twrnc";
import CustomDatepicker, {
	CustomDatePickerType,
	months,
} from "../../organisms/common/CustomDatepicker";
import Toast from "react-native-root-toast";

export const CalendarModal = ({
	closeModal,
	modalIsOpen,
	handleSaveDate,
}: {
	closeModal: any;
	modalIsOpen: boolean;
	handleSaveDate: (state: CustomDatePickerType) => any;
}) => {
	const initialState: CustomDatePickerType = {
		selectedMonth: months[new Date().getMonth()],
		selectedYear: new Date().getFullYear(),
		selectedDay: new Date().getDate(),
	};
	const [calendarState, setCalendarState] =
		useState<CustomDatePickerType>(initialState);

	const updateDOB = () => {
		if (
			!calendarState ||
			(calendarState.selectedDay === initialState.selectedDay &&
				calendarState.selectedMonth === initialState.selectedMonth &&
				calendarState.selectedYear === initialState.selectedYear)
		) {
			Toast.show(`Invalid date`, {
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
		handleSaveDate(calendarState);
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
		<CustomModal
			closeModal={closeModal}
			header="Hello"
			modalIsOpen={modalIsOpen}
			next={() => updateDOB()}
			hideCancelButton
			hideHeader
			hideScroll
			acceptText="Save"
			acceptBtnStyle={[tailwind`py-5 rounded-xl`]}
		>
			<CustomDatepicker
				initialState={initialState}
				updateState={setCalendarState}
				title="Birthday"
			/>
		</CustomModal>
	);
};

export default CalendarModal;
