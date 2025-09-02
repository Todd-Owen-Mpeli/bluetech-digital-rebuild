// Imports
import { FC } from "react"; 
import Link from "next/link";

// Styling
import styles from "@/components/Global/Elements/Button/styles/Button.module.scss";

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
			buttonStyle = styles.buttonStylingTwo;
			break;
		case 2:
			buttonStyle = styles.buttonStylingThree;
			break;
		case 3:
			buttonStyle = styles.buttonStylingFour;
			break;
		case 4:
			buttonStyle = styles.buttonStylingFive;
			break;
		case 5:
			buttonStyle = styles.buttonStylingSix;
			break;
		case 6:
			buttonStyle = styles.buttonStylingSeven;
			break;
		case 7:
			buttonStyle = styles.buttonStylingEight;
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
			<span className={buttonStyle}>
				{`${link?.title} ✦`}
			</span>
		</Link>
    );
}

export default Button;