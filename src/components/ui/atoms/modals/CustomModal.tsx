import { Theme } from "@react-navigation/native";
import React, { useContext, useEffect, useRef } from "react";
import {
	Animated,
	Dimensions,
	Pressable,
	ScrollView,
	StyleSheet,
	Text,
	View,
} from "react-native";
import { CustomModalProps } from "../../../../interfaces/modals.type";
import ThemeContext, { ITheme } from "../../../../context/theme.context";
import { curentTheme } from "../../../../constants/theme.constant";
import Ionicons from "@expo/vector-icons/Ionicons";
import { PrimaryButton } from "../common/buttons";
import tailwind from "twrnc";
import {
	DrawerLayout,
	PanGestureHandler,
	State,
} from "react-native-gesture-handler";

const CustomModal = ({
	closeModal,
	header,
	children,
	subheader,
	cancelText,
	acceptText,
	next,
	back,
	modalIsOpen,
	italicSubheader = false,
	hideCancelButton,
	hideAcceptButton,
	acceptBtnWidth,
	cancelBtnWidth,
	height,
	disableAcceptBtn = false,
	disableCancelBtn = false,
	hideHeader,
	hideScroll = false,
	acceptBtnStyle,
}: CustomModalProps) => {
	const { theme } = useContext(ThemeContext);
	const translateY = useRef(
		new Animated.Value(Dimensions.get("window").height),
	).current;
	useEffect(() => {
		Animated.timing(translateY, {
			toValue: modalIsOpen ? 0 : Dimensions.get("window").height,
			duration: 500,
			useNativeDriver: true,
		}).start();
	}, [modalIsOpen]);

	const onGestureEvent = Animated.event(
		[{ nativeEvent: { translationY: translateY } }],
		{
			useNativeDriver: true,
			listener: (event: any) => {
				const clampedTranslationY = Math.max(event.nativeEvent.translationY, 0);
				translateY.setValue(clampedTranslationY);
			},
		},
	);

	const onHandlerStateChange = (event: any) => {
		if (event.nativeEvent.state === State.END) {
			if (event.nativeEvent.translationY > 0) {
				if (
					event.nativeEvent.translationY >
					Dimensions.get("window").height * 0.3
				) {
					closeModal();
				} else {
					Animated.spring(translateY, {
						toValue: 0,
						useNativeDriver: true,
					}).start();
				}
			}
		}
	};

	return (
		<>
			<View style={[styles().modalBackdrop, StyleSheet.absoluteFill]} />
			<PanGestureHandler
				onGestureEvent={onGestureEvent}
				onHandlerStateChange={onHandlerStateChange}
			>
				<Animated.View
					style={[
						styles({ translateY }).modalContainer,
						{
							// backgroundColor: theme.background,
							backgroundColor: "white",
							height: height || Dimensions.get("window").height * 0.75,
						},
					]}
				>
					{!hideHeader ? (
						<View
							style={{
								display: "flex",
								justifyContent: "center",
								flexDirection: "column",
							}}
						>
							<View style={styles().headerContainer}>
								<Text
									style={{
										fontSize: header ? (header.length > 10 ? 14 : 17) : undefined,
										textAlign: "center",
										fontWeight: "bold",
										color: curentTheme(theme).text,
										letterSpacing: -0.5,
									}}
								>
									{header}
								</Text>
								<Pressable onPress={closeModal}>
									<Ionicons
										name="close-sharp"
										size={35}
										color={curentTheme(theme).primary}
									/>
								</Pressable>
							</View>
							<View
								style={{
									backgroundColor: "#DAEFF8",
									height: 1,
									width: "100%",
									marginVertical: 10,
								}}
							></View>
						</View>
					) : (
						<></>
					)}
					<Text
						style={{
							fontStyle: italicSubheader ? "italic" : "normal",
							color: curentTheme(theme).text,
							fontSize: 15,
							paddingBottom: 10,
						}}
					>
						{subheader}
					</Text>
					<ScrollView
						style={{ paddingHorizontal: 5 }}
						showsVerticalScrollIndicator={false}
						scrollEnabled={!hideScroll}
					>
						{children ? (
							children
						) : (
							<Text
								children="No content to display!"
								style={{
									fontSize: 20,
									paddingVertical: 20,
									color: curentTheme(theme).text,
								}}
							/>
						)}
					</ScrollView>
					<View
						style={{
							display: "flex",
							flexDirection: "row",
							alignItems: "center",
							paddingVertical: 20,
							position: "relative",
							gap: 8,
							top: 35,
						}}
					>
						{!hideCancelButton ? (
							<PrimaryButton
								buttonTextStyle={[tailwind`font-semibold text-[5]`]}
								buttonText={cancelText || "Reject"}
								width={hideAcceptButton ? "100%" : cancelBtnWidth || "40%"}
								onPress={back || closeModal}
								disabled={disableCancelBtn}
							/>
						) : (
							<></>
						)}
						{hideAcceptButton ? (
							<></>
						) : (
							<PrimaryButton
								buttonTextStyle={[tailwind`font-semibold text-[5]`]}
								buttonText={acceptText || "Agree"}
								width={hideCancelButton ? "100%" : acceptBtnWidth || "60%"}
								onPress={next}
								disabled={disableAcceptBtn}
								buttonContainerStyle={[tailwind`bg-[#E94057]`, acceptBtnStyle]}
							/>
						)}
					</View>
				</Animated.View>
			</PanGestureHandler>
		</>
	);
};

export default CustomModal;

const styles = (props?: { theme?: ITheme; translateY?: any }) => {
	const theme = props?.theme;
	const translateY = props?.translateY;
	return StyleSheet.create({
		headerContainer: {
			display: "flex",
			justifyContent: "center",
			flexDirection: "row",
			paddingHorizontal: 60,
			paddingVertical: 10,
			gap: 10,
			alignContent: "center",
			alignItems: "center",
		},
		modalBackdrop: {
			width: "100%",
			// height: Dimensions.get("window").height * 2,
			backgroundColor: "rgba(0, 0, 0, 0.5)",
			position: "absolute",
			left: Dimensions.get("window").width * -0.06,
			paddingHorizontal: Dimensions.get("window").width * 0.06,
			bottom: Dimensions.get("window").height * -0.09,
			opacity: 0.6,

			backdropFilter: "blur(10px)",
		},
		modalContainer: {
			width: Dimensions.get("window").width,
			backgroundColor: theme?.dark.background,
			position: "absolute",
			paddingHorizontal: Dimensions.get("window").width * 0.07,
			paddingBottom: Dimensions.get("window").height * 0.15,
			bottom: Dimensions.get("window").height * -0.09,
			// left: -25,
			zIndex: 10,
			borderRadius: 65,
			transform: [{ translateY }],
			paddingVertical: 15,
			// paddingBottom: 50,
		},
	});
};
