import React from "react";
import Svg, {
	G,
	Path,
	Rect,
	Defs,
	LinearGradient,
	Stop,
} from "react-native-svg";
import FeOffset from "react-native-svg";
import Filter from "react-native-svg";
import FeFlood from "react-native-svg";
import FeColorMatrix from "react-native-svg";
import FeGaussianBlur from "react-native-svg";
import FeBlend from "react-native-svg";
import { TouchableOpacity, View } from "react-native";
import { IconProps } from "../../../../../interfaces/icon.type";

const MenuHamburgerIcon = (props: IconProps) => {
	return (
		<TouchableOpacity onPress={props.onPress}>
			<Svg {...props} viewBox="0 -0.5 25 25">
				<Path
					d="M5.5 11.75C5.08579 11.75 4.75 12.0858 4.75 12.5C4.75 12.9142 5.08579 13.25 5.5 13.25V11.75ZM19.5 13.25C19.9142 13.25 20.25 12.9142 20.25 12.5C20.25 12.0858 19.9142 11.75 19.5 11.75V13.25ZM5.5 7.75C5.08579 7.75 4.75 8.08579 4.75 8.5C4.75 8.91421 5.08579 9.25 5.5 9.25V7.75ZM14.833 9.25C15.2472 9.25 15.583 8.91421 15.583 8.5C15.583 8.08579 15.2472 7.75 14.833 7.75V9.25ZM5.5 15.75C5.08579 15.75 4.75 16.0858 4.75 16.5C4.75 16.9142 5.08579 17.25 5.5 17.25V15.75ZM14.833 17.25C15.2472 17.25 15.583 16.9142 15.583 16.5C15.583 16.0858 15.2472 15.75 14.833 15.75V17.25ZM5.5 13.25H19.5V11.75H5.5V13.25ZM5.5 9.25H14.833V7.75H5.5V9.25ZM5.5 17.25H14.833V15.75H5.5V17.25Z"
					fill={props.color}
				></Path>
			</Svg>
		</TouchableOpacity>
	);
};

const MainLogo = (props: IconProps) => {
	return (
		<TouchableOpacity onPress={props.onPress}>
			<Svg width="109" height="100" viewBox="0 0 109 100" fill="none">
				<Path
					d="M66.0387 39.8157C66.0387 39.8157 57.4046 50.0022 60.6529 63.6045C63.9012 77.2068 76.7126 88.2995 93.0039 81.8496C109.295 75.3997 114.146 44.3821 101.369 26.5497C88.5923 8.7173 68.4159 -6.725 36.5658 3.01852C4.71578 12.762 -20.7278 64.8854 24.4193 100C24.4193 100 10.5382 85.0722 11.9093 65.8769C13.2804 46.6815 25.8489 27.0291 49.2717 22.3445C49.2717 22.3445 29.6193 35.3699 29.0481 57.0789C28.4767 78.7879 40.9309 102.668 76.465 99.4685C76.465 99.4685 58.3364 95.1074 52.6743 76.7959C47.0122 58.4843 60.3687 43.6751 66.0387 39.8157Z"
					fill="url(#paint0_linear_309_5077)"
				/>
				<Defs>
					<LinearGradient
						id="paint0_linear_309_5077"
						x1="6.41414"
						y1="79.5517"
						x2="100.721"
						y2="25.1039"
						gradientUnits="userSpaceOnUse"
					>
						<Stop offset="0.1" stopColor="#F27121" stopOpacity={1} />
						<Stop offset="0.6" stopColor="#E94057" stopOpacity={1} />
						<Stop offset="1" stopColor="#8A2387" stopOpacity={1} />
					</LinearGradient>
				</Defs>
			</Svg>
		</TouchableOpacity>
	);
};

const ModalIndicator = () => {
	return (
		<Svg width="55" height="38" viewBox="0 0 55 38" fill="none">
			<G filter="url(#filter0_d_309_5420)">
				<Path
					fillRule="evenodd"
					clipRule="evenodd"
					d="M14 9.0219C14 5.14381 17.1435 2 21.0215 2C23.2659 2 25.6126 2 27.3371 2C29.1179 2 31.6124 2 33.9835 2C37.8589 2 41 5.14166 41 9.01709C41 9.13673 40.9242 9.24322 40.8111 9.28234L39.1697 9.85037C31.3028 12.5728 22.7335 12.4718 14.933 9.56467L14.1828 9.28509C14.0729 9.24413 14 9.13919 14 9.0219Z"
					fill="white"
				/>
			</G>
			<Rect x="21" y="5" width="13" height="3" rx="1.5" fill="#E8E6EA" />
			<Defs>
				<Filter id="filter0_d_309_5420" x="0" y="0" width="55" height="37.821">
					<FeFlood />
					<FeColorMatrix />
					<FeOffset />
					<FeGaussianBlur />
					<FeColorMatrix />
					<FeBlend />
					<FeBlend />
				</Filter>
			</Defs>
		</Svg>
	);
};
const Icons = { MenuHamburgerIcon, MainLogo, ModalIndicator };

export default Icons;
