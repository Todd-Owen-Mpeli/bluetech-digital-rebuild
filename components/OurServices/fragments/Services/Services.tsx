'use client';

// Imports
import {FC, useRef} from "react";
import {IOurServices} from "@/components/OurServices/types/index";

// Styling
import styles from "@/components/OurServices/styles/OurServices.module.scss";

// Components
import Card from "@/components/OurServices/fragments/Services/Card";
import { useScroll } from "framer-motion";

const Services: FC<IOurServices.IServices> = ({ service }) => {
    const container = useRef(null);
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ['start start', 'end end']
    })
  
    return (
        <div ref={container} className={styles.servicesGrid}>
            {service.map((item: any, index: number) => {
                const targetScale = 1 - ( (service.length - index) * 0.05);
                    return (
                        <Card
                            i={index}
                            {...item}
                            key={`p_${index}`}
                            title={item?.title}
                            image={item?.image}
                            range={[index * .25, 1]}
                            options={item?.options}
                            targetScale={targetScale}
                            progress={scrollYProgress}
                            paragraph={item?.paragraph}
                            buttonLink={item?.buttonLink}
                            backgroundColour={item?.backgroundColour}
                        />
                    )
                })
            }
        </div>
    );
}

export default Services;