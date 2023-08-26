import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import {
	CompositeScreenProps,
	NavigatorScreenParams,
} from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

// declare global {
// 	namespace ReactNavigation {
// 		interface RootParamList extends RootStackParamList {}
// 	}
// }

export type RootStackParamList = {
	Root: NavigatorScreenParams<RootTabParamList> | undefined;
	Home: undefined;
	Profile: undefined;
	//
	Login: undefined;
	Signup: undefined;
	Onboarding: undefined;
	SignupEnterNumberScreen: undefined;
	OtpScreen: undefined;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> =
	NativeStackScreenProps<RootStackParamList, Screen>;

export type RootTabParamList = {
	Home: undefined;
	HomeNavigator: undefined;
	Profile: undefined;
	Dashboard: undefined;
};

export type RootTabScreenProps<Screen extends keyof RootTabParamList> =
	CompositeScreenProps<
		BottomTabScreenProps<RootTabParamList, Screen>,
		NativeStackScreenProps<RootStackParamList>
	>;
