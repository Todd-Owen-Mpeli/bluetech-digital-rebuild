"use client";

// Imports
import {
	fadeIn,
	initialTwo,
	slideInLeftInitial,
	slideInRightFinish,
	slideInRightInitial,
} from "@/animations/animations";
import {FC} from "react";
import Link from "next/link";
import Image from "next/image";
import {motion} from "framer-motion";
import {useGlobalContext} from "@/context/global";

// Styling
import styles from "@/components/Global/Error/styles/Error.module.scss";

// Components
import Paragraph from "@/components/Elements/Paragraph";

const Error: FC = () => {
	const globalContext = useGlobalContext();

	return (
		<section className={styles.error}>
		</section>
	);
};

export default Error;
