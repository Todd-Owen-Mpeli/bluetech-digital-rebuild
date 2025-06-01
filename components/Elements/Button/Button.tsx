// Imports
import { FC } from "react"; 
import Link from "next/link";

// Styling
import styles from "@/components/Elements/Button/styles/Button.module.scss";

type IButton = {
    styleNumber: number;
    link: {
		url: string;
		title: string;
		target: string;
	};
};
    
const Button: FC<IButton> = ({ link, styleNumber }) => {
    
    let buttonStyle: string;

    switch (styleNumber) {
		case 0:
			buttonStyle = styles.buttonStyling;
            break;
        case 1:
			buttonStyle = styles.buttonStylingAlt;
            break;
        case 2:
			buttonStyle = styles.buttonStylingAltTwo;
            break;
        case 3:
			buttonStyle = styles.buttonStylingAltThree;
            break;
        case 4:
			buttonStyle = styles.buttonStylingAltFour;
            break;
        case 5:
			buttonStyle = styles.buttonStylingAltFive;
            break;
		default:
			buttonStyle = styles.buttonStyling;
			break;
	}
    return (
		<Link
			href={`${link?.url}`}
			aria-label={`${link?.title}`}
			target={link?.target || "_self"}
			className={link?.url ? styles.linkWrapper + " group" : `hidden`}
		>
			<span className={styleNumber === 3 ? buttonStyle : "hidden"}>
				<span className={styles.wrapper}>
					<svg
						fill="none"
						className={styles.icon}
						aria-label={`Arrow Icon`}
						viewBox="0 0 20 20" version="1.1"
						xmlns="http://www.w3.org/2000/svg"
					>
						<g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
						<g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
						<g id="SVGRepo_iconCarrier">
							<g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
								<g
									fill="none"
									className="fill-pureBlack group-hover:fill-primary-default"
									id="Dribbble-Light-Preview"
									transform="translate(-180.000000, -6639.000000)"
								>
									<g id="icons" transform="translate(56.000000, 160.000000)">
										<path d="M134,6479 L132.565,6480.393 L140.172,6488 L124,6488 L124,6490 L140.172,6490 L132.586,6497.586 L134,6499 C137.661,6495.339 140.496,6492.504 144,6489 L134,6479" id="arrow_right-[#349]">
										</path>
									</g>
								</g>
							</g>
						</g>
					</svg>
					<span className={styles.text}>{link?.title}</span>
				</span>
			</span>
			<span className={styleNumber != 3 ? buttonStyle : "hidden"}>
				{link?.title}
			</span>
		</Link>
    );
}

export default Button;