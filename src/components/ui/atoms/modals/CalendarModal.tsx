import React from "react";
import { Text } from "react-native";
import CustomModal from "./CustomModal";
import tailwind from "twrnc";
import CustomDatepicker from "../../organisms/common/CustomDatepicker";

export const CalendarModal = ({
	closeModal,
	modalIsOpen,
}: {
	closeModal: any;
	modalIsOpen: boolean;
}) => {
	return (
		<CustomModal
			closeModal={closeModal}
			header="Hello"
			modalIsOpen={modalIsOpen}
			next={() => {
				console.log();
			}}
			hideCancelButton
			hideHeader
			hideScroll
			acceptBtnStyle={[tailwind`py-5 rounded-xl`]}
		>
			{/* <Text>Hello</Text> */}
			<CustomDatepicker
				calendarState={""}
				initialState={""}
				updateState={() => {}}
				title="Birthday"
			/>
		</CustomModal>
	);
};

export default CalendarModal;
