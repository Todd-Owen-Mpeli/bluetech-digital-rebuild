// Imports
import {Metadata} from "next";

// Components
import Error from "@/components/Global/Error/Index";

// Not-Found Page Generated Metadata
export const metadata: Metadata = {
	title: "404 - Not Found",
	description: "...",
};

const NotFound = async () => {
	return <Error />;
};

export default NotFound;
