import React from "react";

export interface AuthContextType {
	isLoggedIn: boolean;
	setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

const AuthContext = React.createContext<AuthContextType>({
	isLoggedIn: false,
	setIsLoggedIn: (): void => {},
});
export default AuthContext;
