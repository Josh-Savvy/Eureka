import React from "react";
import { Dimensions, Text, View } from "react-native";
import InnerScreen from "../../ui/layouts/InnerScreen";
import tw from "twrnc";

const HomeScreenTemplate = ({ navigation }: { navigation: any }) => {
	const user = { username: "John Doe" };
	const [isRefreshing, setIsRefreshing] = React.useState<boolean>(false);

	return (
		<InnerScreen
			navigation={navigation}
			rightIcon={
				<View
					style={[
						tw`bg-white flex justify-center items-center rounded-xl h-10 w-10`,
						{
							alignContent: "center",
							alignItems: "center",
							shadowColor: "#0000003a",
							shadowOffset: {
								height: 5,
								width: 0,
							},
							shadowOpacity: 1,
							shadowRadius: 10,
						},
					]}
					children={
						<Text style={tw`font-semibold`} children={user.username.charAt(0)} />
					}
				/>
			}
		>
			<View
				// showsHorizontalScrollIndicator={false}
				// showsVerticalScrollIndicator={false}
				style={{ height: Dimensions.get("window").height }}
				// refreshControl={
				// 	<RefreshControl
				// 		refreshing={isRefreshing}
				// 		onRefresh={handleReload}
				// 		colors={["#ccc"]}
				// 		tintColor={"#ccc"}
				// 	/>
				// }
			>
				<Text children="Home" />
			</View>
		</InnerScreen>
	);
};

export default HomeScreenTemplate;
