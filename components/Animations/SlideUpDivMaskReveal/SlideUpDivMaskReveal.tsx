// Imports
import React, {FC, useRef, useEffect } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';

// Assume you have some CSS modules for styling, e.g., 'Reveal.module.css'
import styles from '@/components/Animations/SlideUpDivMaskReveal/styles/SlideUpDivMaskReveal.module.scss';

type IProps = {
    style?: any;
    className?: string;
    triggerOnce?: boolean;
    backgroundColor: string;
    children: React.ReactNode;
};

const SlideUpDivMaskReveal: FC<IProps> = ({ style, children, className, triggerOnce = false, backgroundColor }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    amount: 0.15
  });
  const controls = useAnimation();

  const revealVariants = {
    hidden: {
      height: '100%',
    },
    visible: {
      height: '0%',
      transition: {
        duration: 1.5,
        ease: [0.2, 0.6, 0.4, 0.95],
      },
    },
  };

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    } else if (!triggerOnce) {
      controls.start('hidden'); // Reset for re-reveal if triggerOnce is false
    }
  }, [isInView, controls, triggerOnce]);

  return (
    <>
      {className ?
        <div style={style} className={className}>
          <div ref={ref} className={styles.revealContainer}>
            <div className={styles.revealContentWrapper}>
              {children}
            </div>  
            <motion.div
              initial="hidden"
              animate={controls}
              variants={revealVariants}
              className={styles.revealMask + ` ${backgroundColor || "bg-pureBlack"}`}
            />
          </div>
        </div>
        :
        <div
          ref={ref}
          style={style}
          className={styles.revealContainer}
        >
          <div className={styles.revealContentWrapper}>
            {children}
          </div>  
          <motion.div
            initial="hidden"
            animate={controls}
            variants={revealVariants}
            className={styles.revealMask + ` ${backgroundColor || "bg-pureBlack"}`}
          />
        </div>
      }
    </>
  );
};

export default SlideUpDivMaskReveal;