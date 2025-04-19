'use client';

// Imports
import gsap from 'gsap';
import { FC, useEffect, useRef } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import { IRightPartner } from '@/components/RightPartner/types/index';

// Styling
import styles from '@/components/RightPartner/styles/RightPartner.module.scss';

gsap.registerPlugin(ScrollTrigger);

const RightPartner: FC<IRightPartner.IProps> = ({
  title,
  image,
  stats,
  paragraph,
}) => {

  const containerRef = useRef<HTMLDivElement | null>(null);
  const paragraphRef = useRef<HTMLParagraphElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    const paragraphEl = paragraphRef.current;

    if (!container || !paragraphEl) return;

    const wrapWordsInSpan = (element: HTMLElement) => {
      const text = element.textContent || '';
      element.innerHTML = text
        .split(' ')
        .map((word) => `<span class="${styles.word}">${word}</span>`)
        .join(' ');
    };

    wrapWordsInSpan(paragraphEl);

    const wordEls = paragraphEl.querySelectorAll(`.${styles.word}`);

    gsap.fromTo(
        wordEls,
        {
            x: '100vw', // initial state, off screen
        },
        {
            x: 0,
            stagger: 0.005,
            ease: 'power4.inOut',
            scrollTrigger: {
                trigger: container,
                start: 'top top',
                end: 'bottom bottom',
                scrub: true,
                pin: container,
            },
        }
    );

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
      gsap.killTweensOf(wordEls);
    };
  }, [paragraph]);

  return (
    <motion.div ref={containerRef} className={styles.rightPartner}>
        <div className={styles.scrollYProgressParagraph}>
            <p ref={paragraphRef} className={paragraph ? styles.paragraph : 'hidden'}>
                {paragraph}
            </p>
        </div>
    </motion.div>
  );
};

export default RightPartner;
