import React from "react";
import {
	View,
	Text,
	Pressable,
	Image,
	Dimensions,
	FlatList,
	StyleSheet,
	NativeSyntheticEvent,
	TouchableOpacity,
} from "react-native";
import ThemeContext from "../../../context/theme.context";
import { curentTheme } from "../../../constants/theme.constant";
import tw from "twrnc";
import onboardingScreenSlides from "./slides";
import { PrimaryButton } from "../../ui/atoms/common/buttons";
import { NativeScrollEvent } from "react-native";
import SlideComponent from "./SlideComponent";

const OnboardingScreenTemplate = ({ navigation }: { navigation: any }) => {
	const { theme } = React.useContext(ThemeContext);
	const { height, width } = Dimensions.get("window");
	const slidesContainerRef = React.useRef<FlatList>(null);
	const [currentIndex, setCurrentIndex] = React.useState<number>(0);
	const updateCurrentIndex = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
		const offsetX = e.nativeEvent.contentOffset.x;
		const index = parseInt((offsetX / width).toFixed());
		setCurrentIndex(index);
	};
	const ScrollIndicators = () => {
		return (
			<View style={tw`items-center`}>
				<View style={{ display: "flex", flexDirection: "row", gap: 10 }}>
					{onboardingScreenSlides.map((item, index) => (
						<TouchableOpacity
							key={index}
							style={[
								tw`p-1.2 rounded-full`,
								{
									backgroundColor:
										index == currentIndex ? curentTheme(theme).primary : "#eee",
								},
							]}
							onPress={() => {
								setCurrentIndex(index);
								slidesContainerRef?.current?.scrollToOffset({ offset: index * width });
							}}
						></TouchableOpacity>
					))}
				</View>
			</View>
		);
	};
	return (
		<View
			style={[
				{ backgroundColor: curentTheme(theme).background },
				StyleSheet.absoluteFillObject,
			]}
		>
			<FlatList
				ref={slidesContainerRef}
				data={onboardingScreenSlides}
				contentContainerStyle={[tw`mt-20`, { height: height * 0.7 }]}
				renderItem={({ item, index }) => {
					const nextIndex = (index + 1) % onboardingScreenSlides.length;
					const prevIndex =
						(index - 1 + onboardingScreenSlides.length) %
						onboardingScreenSlides.length;
					const nextItem = onboardingScreenSlides[nextIndex];
					const prevItem = onboardingScreenSlides[prevIndex];
					return (
						<SlideComponent item={item} nextItem={nextItem} prevItem={prevItem} />
					);
				}}
				horizontal
				showsHorizontalScrollIndicator={false}
				showsVerticalScrollIndicator={false}
				decelerationRate="fast"
				snapToAlignment="center"
				snapToInterval={width}
				pagingEnabled
				onMomentumScrollEnd={updateCurrentIndex}
			/>
			<View style={[tw`items-center`, { top: -60, gap: 10 }]}>
				<ScrollIndicators />
				<PrimaryButton
					onPress={() => {
						navigation.navigate("Signup");
					}}
					buttonText="Create an account"
					buttonContainerStyle={[
						tw`rounded-lg py-4`,
						{
							backgroundColor: curentTheme(theme).primary,
							padding: 40,
							marginTop: 40,
						},
					]}
					width={"80%"}
					buttonTextStyle={tw`text-lg tracking-tight`}
				/>
				<View
					style={[
						{ alignItems: "center", gap: 5, display: "flex", flexDirection: "row" },
					]}
				>
					<Text style={[tw`text-lg`]}>Already have an account?</Text>
					<TouchableOpacity onPress={() => navigation.navigate("Login")}>
						<Text
							style={[
								tw`font-semibold text-lg`,
								{ color: curentTheme(theme).primary },
							]}
						>
							Sign In
						</Text>
					</TouchableOpacity>
				</View>
			</View>
		</View>
	);
};
export default OnboardingScreenTemplate;
