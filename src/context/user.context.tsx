import React from "react";
import { UserType } from "../interfaces/data/user.type";

export interface UserContextType {
	user: UserType | null;
	setUser: React.Dispatch<React.SetStateAction<UserType | null>>;
}

const UserContext = React.createContext<UserContextType>({
	user: null,
	setUser: (): void => {},
});
export default UserContext;
