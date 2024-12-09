"use client";

// Imports
import {Metadata} from "next";

// Components
import ErrorComponent from "@/components/Global/Error/Index";

// Not-Found Page Generated Metadata
export const metadata: Metadata = {
	title: "404 - Not Found",
	description: "...",
};

const Error = () => {
	return <ErrorComponent />;
};

export default Error;
