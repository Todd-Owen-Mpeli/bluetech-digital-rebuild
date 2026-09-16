"use client";

// Imports
import {m} from "framer-motion";
import {FC, useEffect, useState} from "react";

// Styling
import styles from "@/components/Global/PreloaderAnimation/styles/Preloader.module.css";

export const opacity: {
    initial: {
        opacity: number;
    };
    enter: {
        opacity: number;
        transition: {
            duration: number;
            delay: number;
        };
    };
} | any = {
	initial: {
		opacity: 0,
	},
	enter: {
		opacity: 0.75,
		transition: {duration: 1, delay: 0.2},
	},
};

export const slideUp : {
    initial: {
        top: number;
    };
    exit: {
        top: string;
        transition: {
            duration: number;
            ease: number[];
            delay: number;
        };
    };
} | any = {
	initial: {
		top: 0,
	},
	exit: {
		top: "-100vh",
		transition: {duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.2},
	},
};

const words = [
	"Hello",
	"Bonjour",
	"Ciao",
	"Olà",
	"やあ",
	"Hallå",
	"Guten tag",
	"Hallo",
];

const Preloader: FC = () => {
	const [index, setIndex] = useState(0);
	const [dimension, setDimension] = useState({width: 0, height: 0});

	useEffect(() => {
		// Window size can't be read during SSR render; this one-time sync on
		// mount is the legitimate effect use case, not a derivable render value.
		// eslint-disable-next-line react-hooks/set-state-in-effect
		setDimension({width: window.innerWidth, height: window.innerHeight});
	}, []);

	useEffect(() => {
		if (index == words.length - 1) return;
		setTimeout(
			() => {
				setIndex(index + 1);
			},
			index == 0 ? 1000 : 150
		);
	}, [index]);

	const initialPath = `M0 0 L${dimension.width} 0 L${dimension.width} ${
		dimension.height
	} Q${dimension.width / 2} ${dimension.height + 300} 0 ${
		dimension.height
	}  L0 0`;
	const targetPath = `M0 0 L${dimension.width} 0 L${dimension.width} ${
		dimension.height
	} Q${dimension.width / 2} ${dimension.height} 0 ${dimension.height}  L0 0`;

	const curve: {
		initial: {
			d: string;
			transition: {
				duration: number;
				ease: number[];
			};
		};
		exit: {
			d: string;
			transition: {
				duration: number;
				ease: number[];
				delay: number;
			};
		};
	} | any = {
		initial: {
			d: initialPath,
			transition: {duration: 0.7, ease: [0.76, 0, 0.24, 1]},
		},
		exit: {
			d: targetPath,
			transition: {duration: 0.7, ease: [0.76, 0, 0.24, 1], delay: 0.3},
		},
	};

	return (
		<m.div
			exit="exit"
			initial="initial"
			variants={slideUp}
			className={styles.preloaderAnimation}
		>
			{dimension.width > 0 && (
				<>
					<m.p variants={opacity} initial="initial" animate="enter">
						<span className={styles.icon}>♝</span>
						{words[index]}
						<span className={styles.dot}></span>
					</m.p>
					<svg>
						<m.path
							variants={curve}
							initial="initial"
							exit="exit"
						></m.path>
					</svg>
				</>
			)}
		</m.div>
	);
};

export default Preloader;