"use client";

// Imports
import { FC } from "react";
import { motion } from "framer-motion";
import { useCookiePolicy } from "@/context/cookies";
import { fadeInUp, initial, stagger } from "@/animations/animations";
import { ICookiePolicy } from "@/components/Global/CookiePolicy/types/type";

// Styling
import styles from "@/components/Global/CookiePolicy/styles/CookiePolicy.module.css";

// Components
import Paragraph from "@/components/Global/Elements/Paragraph/Paragraph";

const CookiePolicy: FC<ICookiePolicy.IProps> = ({ dict }) => {

    const { hasConsent, acceptCookies, refuseCookies } = useCookiePolicy();

    // Only render the banner if no decision has been made.
    if (hasConsent !== null) {
        return null;
    }

    // Otherwise, render the cookie policy banner.
    return (
        <div className={styles.cookiePolicy}>
            <div
                className={styles.content}
                style={{
                    boxShadow: "0px 30px 2px -25px rgba(0,0,0,0.1)",
                }}
            >
                <div className={styles.titleSection}>
                    <motion.h3
                        initial={initial}
                        whileInView={fadeInUp}
                        viewport={{ once: true }}
                        className={styles.title}
                    >
                        {dict.title}
                    </motion.h3>
                    <motion.div
                        initial={initial}
                        whileInView={fadeInUp}
                        viewport={{ once: true }}>
                        <Paragraph
                            className={styles.paragraph}
                            content={dict.paragraph}
                        />
                    </motion.div>
                </div>
                <motion.div
                    initial={initial}
                        variants={stagger}
                        whileInView="animate"
                        viewport={{ once: true }}
                    className={styles.buttonSection}
                >
                    <motion.button
                            initial={initial}
                            whileInView={fadeInUp}
                            onClick={acceptCookies}
                            viewport={{ once: true }}
                            aria-label="Accept cookies"
                            className={styles.acceptButton}
                        >
                            {dict.accept}
                    </motion.button>
                    <motion.button
                            initial={initial}
                            whileInView={fadeInUp}
                            onClick={refuseCookies}
                            viewport={{ once: true }}
                            aria-label="Refuse cookies"
                            className={styles.refuseButton}
                        >
                            {dict.refuse}
                    </motion.button>
                </motion.div>
            </div>
        </div>
    );
};

CookiePolicy.displayName = "CookiePolicy";

export default CookiePolicy;