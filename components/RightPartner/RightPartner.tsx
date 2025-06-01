'use client';

// Imports
import { FC } from 'react';
import { motion } from 'framer-motion';
import { IRightPartner } from '@/components/RightPartner/types/index';

// Styling
import styles from '@/components/RightPartner/styles/RightPartner.module.scss';

const RightPartner: FC<IRightPartner.IProps> = ({
  title,
  image,
  stats,
  paragraph,
  backgroundImage,
}) => {
  return (
      <motion.div
            className={styles.rightPartner}
            style={{
                backgroundImage: `linear-gradient(0deg,rgba(255, 255, 255, 0.9), 
                rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.9)),url("${backgroundImage?.sourceUrl}")`,
            }}
        >
            <div className={styles.topSection}></div>
            <div className={styles.bottomSection}></div>
        </motion.div>
    );
};

export default RightPartner;
