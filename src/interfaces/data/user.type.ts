export enum GenderEnum {
	FEMALE = "female",
	MALE = "male",
	NON_BINARY = "non-binary",
}
export interface NewUserInteface {
	email: string;
	phone: string;
	first_name: string;
	last_name: string;
	gender?: GenderEnum | null;
	image: string;
	interests?: string[];
	DOB: number | undefined;
}
