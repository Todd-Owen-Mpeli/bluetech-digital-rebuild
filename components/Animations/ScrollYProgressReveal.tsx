// Imports
import { FC, useRef} from "react";
import { m, useScroll} from "framer-motion";
import {fadeIn, offsetFinish, offsetStart} from "@/animations/animations";

type IProps = {
	style?: any;
	className?: string;
	children: React.ReactNode;
};

const ScrollYProgressReveal: FC<IProps> = ({children, className}) => {
	const container = useRef(null);

	const {scrollYProgress} = useScroll({
		target: container,
		offset: [`start ${offsetStart}`, `start ${offsetFinish}`],
	});
	return (
		<m.div
			ref={container}
			style={{opacity: fadeIn ? scrollYProgress : 1}}
			className={children ? ` ${className}` : `hidden`}
		>
			{children}
		</m.div>
	);
};

export default ScrollYProgressReveal;
