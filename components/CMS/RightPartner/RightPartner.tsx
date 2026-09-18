'use client';

// Imports
import { FC } from 'react';
import { m } from 'framer-motion';
import { IRightPartner } from '@/components/CMS/RightPartner/types/rightPartner';

// Styling
import styles from '@/components/CMS/RightPartner/styles/RightPartner.module.css';

const RightPartner: FC<IRightPartner.IProps> = ({
  title,
  image,
  stats,
  paragraph,
  hoverImage,
  backgroundImage,
}) => {
  return (
      <m.div
            className={styles.rightPartner}
            style={{
                backgroundImage: `linear-gradient(0deg,rgba(255, 255, 255, 0.9), 
                rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.9)),url("${backgroundImage?.sourceUrl}")`,
            }}
        >
            <div className={styles.topSection}></div>
            <div className={styles.bottomSection}></div>
        </m.div>
    );
};

export default RightPartner;
