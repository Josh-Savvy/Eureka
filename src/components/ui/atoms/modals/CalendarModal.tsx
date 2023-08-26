import React from "react";
import { Text } from "react-native";
import CustomModal from "./CustomModal";
import tailwind from "twrnc";

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
			<Text>Hello</Text>
		</CustomModal>
	);
};

export default CalendarModal;
