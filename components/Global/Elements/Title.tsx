// Imports
import { FC, memo, useMemo } from "react"; // Added useMemo
import DOMPurify from "isomorphic-dompurify";
import { motion, MotionValue } from "framer-motion";
import { fadeIn, initialTwo } from "@/animations/animations";

type ITitle = {
    content: string;
    className?: string;
    motionProps?: Record<string, any>;
    styleTextColor?: MotionValue<string> | string;
};

const Title: FC<ITitle> = memo(({
    content,
    motionProps,
    styleTextColor,
    className = '',
}) => {

    /* Sanitize the WYSIWYG title content */
    // Use useMemo to prevent re-sanitizing content on every render
    const cleanMarkup = useMemo(() => {
        // Only sanitize if content exists, otherwise return empty HTML
        return content ? { __html: DOMPurify.sanitize(content) } : { __html: '' };
	}, [content]);
	
    const titleClasses = (() => {
        if (!content) {
            return 'hidden';
        }
        return className.trim();
    })();

    // Memoize common motion props for the <motion.h4> elements for consistency.
    const commonMotionProps = useMemo(() => ({
        initial: initialTwo,
        whileInView: fadeIn,
        viewport: { once: true },
    }), []);

    return (
        <motion.div
            className={titleClasses}
            style={{ color: styleTextColor}}
            dangerouslySetInnerHTML={cleanMarkup}
            {...(motionProps ? motionProps : commonMotionProps)}
        />
    );
});

Title.displayName = 'Title';

export default Title;