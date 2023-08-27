import React, { useState } from "react";
import { Text } from "react-native";
import CustomModal from "./CustomModal";
import tailwind from "twrnc";
import CustomDatepicker, {
	CustomDatePickerType,
	months,
} from "../../organisms/common/CustomDatepicker";

export const CalendarModal = ({
	closeModal,
	modalIsOpen,
	handleSaveDate,
}: {
	closeModal: any;
	modalIsOpen: boolean;
	handleSaveDate?: any;
}) => {
	const initialState: CustomDatePickerType = {
		selectedMonth: months[new Date().getMonth()],
		selectedYear: new Date().getFullYear(),
		selectedDay: 0,
	};
	const [calendarState, setCalendarState] =
		useState<CustomDatePickerType>(initialState);
	return (
		<CustomModal
			closeModal={closeModal}
			header="Hello"
			modalIsOpen={modalIsOpen}
			next={
				handleSaveDate
					? handleSaveDate
					: () => {
							console.log(calendarState);
					  }
			}
			hideCancelButton
			hideHeader
			hideScroll
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
