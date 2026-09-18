export type IGraphQLResponse<T> = {
	data?: T;
	errors?: { message: string }[];
};
