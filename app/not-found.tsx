// Imports
import {Metadata} from "next";

// Components
import ErrorPage from "@/components/Global/Error";

// Not-Found Page Generated Metadata
export const metadata: Metadata = {
	title: "404 - Not Found",
	description: "...",
};

const NotFound = async () => {
	return <ErrorPage />;
};

export default NotFound;
