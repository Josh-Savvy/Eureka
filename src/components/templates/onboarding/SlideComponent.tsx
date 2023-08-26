import React from "react";
import { Dimensions, Text, View } from "react-native";
import { curentTheme } from "../../../constants/theme.constant";
import ThemeContext from "../../../context/theme.context";
import tw from "twrnc";
import { Image } from "react-native";

const SlideComponent = (props: any) => {
	const { prevItem, nextItem, item } = props;
	const { theme } = React.useContext(ThemeContext);
	const { width } = Dimensions.get("window");
	return (
		<View style={[tw`items-center`, { width, overflow: "hidden" }]}>
			{prevItem && (
				<Image
					source={prevItem.image}
					style={{
						height: "50%",
						width: "75%",
						resizeMode: "contain",
						opacity: 0.5,
						position: "absolute",
						left: -200,
						overflow: "hidden",
					}}
					resizeMethod="resize"
					resizeMode="contain"
				/>
			)}
			{nextItem && (
				<Image
					source={nextItem.image}
					style={{
						height: "50%",
						width: "75%",
						resizeMode: "contain",
						opacity: 0.5,
						position: "absolute",
						right: -200,
						overflow: "hidden",
					}}
					resizeMethod="resize"
					resizeMode="contain"
				/>
			)}
			<Image
				source={item.image}
				style={{ height: "70%", width: "75%", resizeMode: "contain" }}
				resizeMethod="resize"
				resizeMode="contain"
			/>
			<View
				style={[
					tw`items-center px-2 mt-10`,
					{ display: "flex", flexDirection: "column", gap: 15 },
				]}
			>
				<Text
					style={[
						tw`text-2xl leading-none font-bold`,
						{ color: curentTheme(theme).primary },
					]}
				>
					{item.title}
				</Text>
				<Text
					style={[
						tw`text-lg leading-none px-8 text-center`,
						{ color: curentTheme(theme).text },
					]}
				>
					{item.subtitle}
				</Text>
			</View>
		</View>
	);
};

export default SlideComponent;
